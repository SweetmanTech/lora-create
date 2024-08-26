'use client'

import { useState } from 'react'
import { useAccount, usePublicClient, useSwitchChain } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { CHAIN_ID, REFERRAL_RECIPIENT } from '@/lib/consts'
import { usePaymasterProvider } from '@/providers/PaymasterProvider'
import useCreateSuccess from '@/hooks/useCreateSuccess'
import useConnectWallet from '@/hooks/useConnectWallet'
import getSalesConfig from '@/lib/zora/getSalesConfig'
import useCreateMetadata from '@/hooks/useCreateMetadata'
import { toast } from 'react-toastify'

export default function useZoraCreate() {
  const publicClient = usePublicClient()!
  const { address } = useAccount()
  const { getCapabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()

  const { connectWallet } = useConnectWallet()
  const createMetadata = useCreateMetadata()
  const { switchChain } = useSwitchChain()
  const [creating, setCreating] = useState<boolean>(false)

  useCreateSuccess(callsStatusId, () => setCreating(false))

  const create = async (chainId = CHAIN_ID) => {
    setCreating(true)
    try {
      if (!address) await connectWallet()
      switchChain({ chainId })
      const creatorClient = createCreatorClient({ chainId, publicClient })
      const { uri: cc0MusicIpfsHash } = await createMetadata.getUri()
      const salesConfig = getSalesConfig(createMetadata.saleStrategy)
      const { parameters } = await creatorClient.create1155({
        contract: {
          name: createMetadata.name,
          uri: cc0MusicIpfsHash,
        },
        token: {
          tokenMetadataURI: cc0MusicIpfsHash,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
        },
        account: address!,
      })
      const newParameters = { ...parameters, functionName: 'createContract' }
      await writeContractsAsync({
        contracts: [{ ...(newParameters as any) }],
        capabilities: getCapabilities(chainId),
      } as any)
    } catch (err) {
      setCreating(false)
      toast.error("Couldn't create contract")
      console.log(err.message)
    }
  }

  return { create, creating, ...createMetadata }
}

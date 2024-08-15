'use client'

import { useAccount, usePublicClient } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { CHAIN_ID, REFERRAL_RECIPIENT } from '@/lib/consts'
import { usePaymasterProvider } from '@/providers/PaymasterProvider'
import useCreateSuccessRedirect from './useCreateSuccessRedirect'
import useConnectWallet from './useConnectWallet'
import getSalesConfig from '@/lib/zora/getSalesConfig'
import useCreateMetadata from './useCreateMetadata'

const useZoraCreate = () => {
  const publicClient = usePublicClient()!
  const { address } = useAccount()
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  useCreateSuccessRedirect(callsStatusId)
  const { connectWallet } = useConnectWallet()
  const createMetadata = useCreateMetadata()

  const create = async () => {
    try {
      if (!address) await connectWallet()
      const creatorClient = createCreatorClient({ chainId: CHAIN_ID, publicClient })
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
        capabilities,
      } as any)
    } catch (err) {
      console.error(err)
    }
  }

  return { create, ...createMetadata }
}

export default useZoraCreate

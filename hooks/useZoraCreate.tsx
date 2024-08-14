'use client'

import { useAccount, usePublicClient } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { CHAIN_ID, REFERRAL_RECIPIENT } from '@/lib/consts'
import { usePaymasterProvider } from '@/providers/PaymasterProvider'
import useCreateSuccessRedirect from './useCreateSuccessRedirect'
import useConnectWallet from './useConnectWallet'
import { useState } from 'react'
import getSalesConfig from '@/lib/zora/getSalesConfig'

const useZoraCreate = () => {
  const publicClient = usePublicClient()!
  const { address } = useAccount()
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  useCreateSuccessRedirect(callsStatusId)
  const { connectWallet } = useConnectWallet()
  const [saleStrategy, setSaleStrategy] = useState<string>('ZoraTimedSaleStrategy')

  const create = async () => {
    try {
      if (!address) await connectWallet()
      const creatorClient = createCreatorClient({ chainId: CHAIN_ID, publicClient })
      const cc0MusicIpfsHash = 'ipfs://bafkreiazqdg6qc3j6yjcxyhvoyaspmjjwal5wvywjs66jobb3pbzknvzxu'
      const salesConfig = getSalesConfig(saleStrategy)
      const { parameters } = await creatorClient.create1155({
        contract: {
          name: 'CC0 Music',
          uri: cc0MusicIpfsHash,
        },
        token: {
          tokenMetadataURI: cc0MusicIpfsHash,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
        },
        account: address!,
      })
      console.log('SWEETS parameters', parameters)
      const newParameters = { ...parameters, functionName: 'createContract' }
      await writeContractsAsync({
        contracts: [{ ...(newParameters as any) }],
        capabilities,
      } as any)
    } catch (err) {
      console.error(err)
    }
  }

  return { create, saleStrategy, setSaleStrategy }
}

export default useZoraCreate

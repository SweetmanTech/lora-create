'use client'

import { useAccount, usePublicClient } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import {
  createCreatorClient,
  FixedPriceParamsType,
  TimedSaleParamsType,
} from '@zoralabs/protocol-sdk'
import { CHAIN_ID, REFERRAL_RECIPIENT } from '@/lib/consts'
import { usePaymasterProvider } from '@/providers/PaymasterProvider'
import useCreateSuccessRedirect from './useCreateSuccessRedirect'
import useConnectWallet from './useConnectWallet'
import { useState } from 'react'

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
      console.log('SWEETS saleStrategy', saleStrategy)
      const timedSaleConfig = {
        type: 'timed',
        erc20Name: 'CC0 Music',
        erc20Symbol: 'CC0',
      } as TimedSaleParamsType
      const fixedPriceSaleConfig = {
        type: 'fixedPrice',
        pricePerToken: BigInt(1),
      } as FixedPriceParamsType
      const salesConfig =
        saleStrategy === 'ZoraTimedSaleStrategy' ? timedSaleConfig : fixedPriceSaleConfig
      console.log('SWEETS salesConfig', salesConfig)

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

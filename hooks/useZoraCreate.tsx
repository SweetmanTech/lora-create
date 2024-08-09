'use client'

import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { CHAIN_ID } from '@/lib/consts'

const useZoraCreate = () => {
  const publicClient = usePublicClient()!
  const { address } = useAccount()
  const { writeContractsAsync } = useWriteContracts()

  const create = async () => {
    try {
      const creatorClient = createCreatorClient({ chainId: CHAIN_ID, publicClient })
      const cc0MusicIpfsHash = 'ipfs://bafkreiazqdg6qc3j6yjcxyhvoyaspmjjwal5wvywjs66jobb3pbzknvzxu'
      const { parameters } = await creatorClient.create1155({
        contract: {
          name: 'CC0 Music',
          uri: cc0MusicIpfsHash,
        },
        token: {
          tokenMetadataURI: cc0MusicIpfsHash,
          salesConfig: {
            erc20Name: 'CC0 Music',
            erc20Symbol: 'CC0',
          },
        },
        account: address!,
      })
      const newParameters = { ...parameters, functionName: 'createContract' }
      const tx = await writeContractsAsync({
        contracts: [{ ...(newParameters as any) }],
      } as any)
      console.log('SWEETS tx', tx)
    } catch (err) {
      console.error(err)
    }
  }

  return { create }
}

export default useZoraCreate

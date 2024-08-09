'use client'

import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { CHAIN_ID } from '@/lib/consts'

const useZoraCreate = () => {
  // use wagmi hooks to get the chainId, publicClient, and account
  const publicClient = usePublicClient()!
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const create = async () => {
    try {
      const creatorClient = createCreatorClient({ chainId: CHAIN_ID, publicClient })
      const { parameters } = await creatorClient.create1155({
        contract: {
          name: 'CC0 Music',
          uri: 'ipfs://bafkreibmjqlmjxrwvjvpfhq6wvwvg3tutfwssgp7vmvg7jnfxpy65bnfxi',
        },
        token: {
          tokenMetadataURI: 'ipfs://bafkreibmjqlmjxrwvjvpfhq6wvwvg3tutfwssgp7vmvg7jnfxpy65bnfxi',
          salesConfig: {
            erc20Name: 'CC0 Music',
            erc20Symbol: 'CC0',
          },
        },
        account: address!,
      })

      console.log('SWEETS parameters', parameters)
      const newParameters = { ...parameters, functionName: 'createContract' }
      console.log('SWEETS newParameters', newParameters)

      const simulation = await publicClient.simulateContract(newParameters)
      console.log('SWEETS simulation', simulation)

      const tx = await writeContractAsync(newParameters)
      console.log('SWEETS tx', tx)
    } catch (err) {
      console.error(err)
    }
  }

  return { create }
}

export default useZoraCreate

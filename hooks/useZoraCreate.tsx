'use client'

import { useState } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { PROFILE_APP_URL } from '@/lib/consts'
import { usePaymasterProvider } from '@/providers/PaymasterProvider'
import useCreateSuccess from '@/hooks/useCreateSuccess'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Address, isAddress } from 'viem'
import useZoraCreateParameters from './useZoraCreateParameters'
import handleTxError from '@/lib/handleTxError'
import { useProfileProvider } from '@/providers/ProfileProvider'

export default function useZoraCreate() {
  const { push } = useRouter()
  const { address } = useAccount()
  const { getCapabilities } = usePaymasterProvider()
  const { profile } = useProfileProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { switchChainAsync } = useSwitchChain()
  const [creating, setCreating] = useState<boolean>(false)
  const params = useParams()
  const searchParams = useSearchParams()
  const defaultAdmin = searchParams.get('defaultAdmin')
  const connnectedProfileAddress = profile?.connectedZoraProfile?.address
  const fallbackCreatorAddress = isAddress(defaultAdmin) ? defaultAdmin : address
  const creatorAddress = connnectedProfileAddress || fallbackCreatorAddress

  const collection = params.collection as Address | undefined
  const { fetchParameters, createMetadata } = useZoraCreateParameters(collection)

  useCreateSuccess(
    callsStatusId,
    () => push(`${PROFILE_APP_URL}/${creatorAddress}`),
    !!params.collection,
  )

  const create = async (chainId) => {
    setCreating(true)
    try {
      if (!address) {
        throw new Error('No wallet connected')
      }
      await switchChainAsync({ chainId })
      const parameters = await fetchParameters(chainId)

      if (!parameters) {
        throw new Error('Parameters not ready')
      }

      await writeContractsAsync({
        contracts: [{ ...parameters }],
        capabilities: getCapabilities(chainId),
      } as any)
    } catch (err) {
      setCreating(false)
      handleTxError(err)
      console.log(err.message)
    }
  }

  return { create, creating, ...createMetadata }
}

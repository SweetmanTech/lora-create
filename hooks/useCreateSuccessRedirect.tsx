import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { parseEventLogs } from 'viem'
import { useCallsStatus } from 'wagmi/experimental'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'

const useCreateSuccessRedirect = (callsStatusId?: string) => {
  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) => (data.state.data?.status === 'CONFIRMED' ? false : 500),
    },
  })

  useEffect(() => {
    if (callsStatus?.status !== 'CONFIRMED') return
    const logs = parseEventLogs({
      abi: zoraCreator1155FactoryImplABI,
      logs: callsStatus.receipts?.[0]?.logs as any[],
    }) as any
    const { newContract } = logs?.[1]?.args as any
    toast.success('Project Created Successfully!')
    const collectionUrl = `https://testnet.zora.co/collect/bsep:${newContract}/1`
    window.open(collectionUrl, '_blank').focus()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callsStatus])
}

export default useCreateSuccessRedirect

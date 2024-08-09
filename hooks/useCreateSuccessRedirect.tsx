import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Log, parseEventLogs } from 'viem'
import { useCallsStatus } from 'wagmi/experimental'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'

const useCreateSuccessRedirect = (callsStatusId?: string) => {
  const { push } = useRouter()

  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) => (data.state.data?.status === 'CONFIRMED' ? false : 500),
    },
  })

  useEffect(() => {
    if (callsStatus?.status !== 'CONFIRMED') return
    console.log('SWEETS callsStatus', callsStatus)
    const logs = parseEventLogs({
      abi: zoraCreator1155FactoryImplABI,
      logs: callsStatus.receipts?.[0]?.logs as Log[],
    }) as any
    console.log('SWEETS logs', logs)
    const { newContract } = logs?.[1]?.args
    toast.success('Project Created Successfully!')
    window.open(`https://testnet.zora.co/collect/bsep:${newContract}/1`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callsStatus])
}

export default useCreateSuccessRedirect

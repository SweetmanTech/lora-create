import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { parseEventLogs } from 'viem'
import { useCallsStatus } from 'wagmi/experimental'
import { zoraCreator1155FactoryImplABI } from '@zoralabs/protocol-deployments'
import trackSetupNewContractPoints from '@/lib/stack/trackSetupNewContractPoints'
import { useAccount, useChainId } from 'wagmi'
import { usePointsProvider } from '@/providers/PointsProvider'

export default function useCreateSuccess(callsStatusId: string, onSuccess: () => void) {
  const { address } = useAccount()
  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) => (data.state.data?.status === 'CONFIRMED' ? false : 500),
    },
  })
  const { refetch } = usePointsProvider()
  const chainId = useChainId()

  useEffect(() => {
    const handleSuccess = async () => {
      const logs = parseEventLogs({
        abi: zoraCreator1155FactoryImplABI,
        logs: callsStatus.receipts?.[0]?.logs as any[],
      }) as any
      const { args } = logs?.[1] as any
      toast.success('Created Successfully!')
      await trackSetupNewContractPoints(address, args, chainId)
      await refetch()
      onSuccess()
    }
    if (callsStatus?.status !== 'CONFIRMED') return
    handleSuccess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callsStatus])
}

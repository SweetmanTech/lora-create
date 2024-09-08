import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { parseEventLogs } from 'viem'
import { useCallsStatus } from 'wagmi/experimental'
import {
  zoraCreator1155FactoryImplABI,
  zoraCreator1155ImplABI,
} from '@zoralabs/protocol-deployments'
import trackSetupNewContractPoints from '@/lib/stack/trackSetupNewContractPoints'
import { useAccount, useChainId } from 'wagmi'

export default function useCreateSuccess(
  callsStatusId: string,
  onSuccess: () => void,
  isExistingContract: boolean,
) {
  const { address } = useAccount()
  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) => (data.state.data?.status === 'CONFIRMED' ? false : 500),
    },
  })
  const chainId = useChainId()

  useEffect(() => {
    const handleSuccess = async () => {
      const abi = isExistingContract ? zoraCreator1155ImplABI : zoraCreator1155FactoryImplABI
      const logs = parseEventLogs({
        abi,
        logs: callsStatus.receipts?.[0]?.logs as any[],
      }) as any[]
      if (logs && logs.length > 0) {
        const relevantLog = isExistingContract ? logs[3] : logs[1]
        if (relevantLog && relevantLog.args) {
          const { args } = relevantLog
          toast.success('Created Successfully!')

          const serializedArgs = Object.fromEntries(
            Object.entries(args).map(([key, value]) => [
              key,
              typeof value === 'bigint' ? value.toString() : value,
            ]),
          )

          await trackSetupNewContractPoints(
            address,
            { newContract: relevantLog.address, ...serializedArgs },
            chainId,
          )
          onSuccess()
        } else {
          console.error('Unexpected log structure:', logs)
          toast.error('Creation successful, but there was an issue processing the result.')
          onSuccess()
        }
      } else {
        console.error('No logs found')
        toast.error('Creation successful, but there was an issue processing the result.')
        onSuccess()
      }
    }
    if (callsStatus?.status !== 'CONFIRMED') return
    handleSuccess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callsStatus, isExistingContract])
}

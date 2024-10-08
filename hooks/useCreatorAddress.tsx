import { useProfileProvider } from '@/providers/ProfileProvider'
import { useSearchParams } from 'next/navigation'
import { isAddress } from 'viem'
import { useAccount } from 'wagmi'

const useCreatorAddress = () => {
  const { address } = useAccount()
  const { profile } = useProfileProvider()
  const searchParams = useSearchParams()

  const defaultAdmin = searchParams.get('defaultAdmin')
  const connnectedProfileAddress = profile?.connectedZoraProfile?.address
  const fallbackCreatorAddress = isAddress(defaultAdmin) ? defaultAdmin : address
  const creatorAddress = connnectedProfileAddress || fallbackCreatorAddress

  return creatorAddress
}

export default useCreatorAddress

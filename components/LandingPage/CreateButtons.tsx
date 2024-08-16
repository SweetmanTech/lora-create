import { base, baseSepolia } from 'viem/chains'
import CreateButton from '../CreateButton'
import { usePointsProvider } from '@/providers/PointsProvider'
import { cn } from '@/lib/utils'

const CreateButtons = () => {
  const { leaderboardRank } = usePointsProvider()
  const { points } = leaderboardRank
  const passedOnboarding = points > 65

  return (
    <div
      className={cn(
        `mt-11 flex justify-between w-full`,
        passedOnboarding ? 'justify-between' : 'justify-center',
      )}
    >
      <CreateButton chainId={baseSepolia.id}>Preview</CreateButton>
      {passedOnboarding && <CreateButton chainId={base.id}>Publish</CreateButton>}
    </div>
  )
}

export default CreateButtons

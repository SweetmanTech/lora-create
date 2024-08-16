import { SETUP_NEW_CONTRACT_EVENT } from '@/lib/consts'
import getTimeAgo from '@/lib/stack/getTimeAgo'
import { cn } from '@/lib/utils'
import getCollectionUrl from '@/lib/zora/getCollectionUrl'
import { baseSepolia } from 'viem/chains'

const Point = ({ event }: any) => {
  const chainId = event.metadata.uniqueId.split('-')[0]
  const isTestnet = chainId == baseSepolia.id

  const handleClick = (address, eventType) => {
    if (eventType !== SETUP_NEW_CONTRACT_EVENT) return
    const url = getCollectionUrl(chainId, address)
    window.open(url, '_blank')
  }

  return (
    <div className="flex gap-3 items-center">
      <p
        className={cn('text-xl', isTestnet ? '' : 'text-blue-700')}
        onClick={() => handleClick(event.metadata.newContract, event.event)}
      >
        {event.event.replace(/_/g, ' ')}
      </p>
      <p>({getTimeAgo(event.timestamp)})</p>
      <a href="https://www.stack.so/leaderboard/leaderboard-40a3-78225-3067" target="_blank">
        <p className="text-green-700 text-xl">+{event.points} points</p>
      </a>
    </div>
  )
}

export default Point

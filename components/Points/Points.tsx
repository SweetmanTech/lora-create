import { SETUP_NEW_CONTRACT_EVENT } from '@/lib/consts'
import getTimeAgo from '@/lib/stack/getTimeAgo'
import getCollectionUrl from '@/lib/zora/getCollectionUrl'
import { usePointsProvider } from '@/providers/PointsProvider'

const Points = () => {
  const { events } = usePointsProvider()

  const handleClick = (address, eventType) => {
    if (eventType !== SETUP_NEW_CONTRACT_EVENT) return
    const url = getCollectionUrl(address)
    window.open(url, '_blank')
  }

  return (
    <div>
      {events.map((event, index) => (
        <div key={index} className="flex gap-3 items-center">
          <p
            className="text-xl"
            onClick={() => handleClick(event.metadata.newContract, event.event)}
          >
            {event.event.replace(/_/g, ' ')}
          </p>
          <p>({getTimeAgo(event.timestamp)})</p>
          <a href="https://www.stack.so/leaderboard/leaderboard-40a3-78225-3067" target="_blank">
            <p className="text-green-700 text-xl">+{event.points} points</p>
          </a>
        </div>
      ))}
    </div>
  )
}

export default Points

import getTimeAgo from '@/lib/stack/getTimeAgo'
import { usePointsProvider } from '@/providers/PointsProvider'

const Points = () => {
  const { loginEvents } = usePointsProvider()

  return (
    <div>
      {loginEvents.map((event, index) => (
        <div key={index}>
          {/* Replace underscores with spaces in event.event */}
          <p>{event.event.replace(/_/g, ' ')}</p>
          <p>{getTimeAgo(event.timestamp)}</p>
          <a href="https://www.stack.so/leaderboard/leaderboard-40a3-78225-3067" target="_blank">
            <p className="text-green-700">+{event.points} points</p>
          </a>
        </div>
      ))}
    </div>
  )
}

export default Points

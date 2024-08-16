import getEvents from '@/lib/stack/getEvents'
import getLeaderboardRank from '@/lib/stack/getLeaderboardRank'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const usePoints = () => {
  const { address } = useAccount()
  const [events, setEvents] = useState([])
  const [leaderboardRank, setLeaderboardRank] = useState([])

  const refetch = useCallback(async () => {
    let response = await getEvents(address)
    setEvents(response)
    response = await getLeaderboardRank(address)
    setLeaderboardRank(response)
  }, [address])

  useEffect(() => {
    const init = async () => {
      await trackLoginPoints(address)
      await refetch()
    }
    if (!address) return
    init()
  }, [address])

  return { events, refetch, leaderboardRank }
}

export default usePoints

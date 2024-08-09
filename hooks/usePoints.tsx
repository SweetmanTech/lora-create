import getEvents from '@/lib/stack/getEvents'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const usePoints = () => {
  const { address } = useAccount()
  const [events, setEvents] = useState([])

  const refetch = useCallback(async () => {
    const response = await getEvents(address)
    setEvents(response)
  }, [address])

  useEffect(() => {
    const init = async () => {
      await trackLoginPoints(address)
      await refetch()
    }
    if (!address) return
    init()
  }, [address])

  return { events, refetch }
}

export default usePoints

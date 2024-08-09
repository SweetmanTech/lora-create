import getLoginEvents from '@/lib/stack/getLoginPoints'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const useLoginPoints = () => {
  const { address } = useAccount()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const init = async () => {
      trackLoginPoints(address)
      const response = await getLoginEvents(address)
      console.log('SWEETS events', response)
      setEvents(response)
    }
    if (!address) return
    init()
  }, [address])

  return { events }
}

export default useLoginPoints

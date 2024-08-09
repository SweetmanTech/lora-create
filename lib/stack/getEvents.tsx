import { Address } from 'viem'
import getStackClient from './getStackClient'

const getEvents = async (address: Address) => {
  const stackClient = getStackClient()
  const events = await stackClient.getEvents({
    address,
  })

  return events
}

export default getEvents

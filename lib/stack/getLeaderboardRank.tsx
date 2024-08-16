import { Address } from 'viem'
import getStackClient from './getStackClient'

const getLeaderboardRank = async (address: Address) => {
  const stack = getStackClient()
  const response = await stack.getLeaderboardRank(address)
  return response
}

export default getLeaderboardRank

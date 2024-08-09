import { Address } from 'viem'
import getStackClient from './getStackClient'
import { FIRST_SMART_WALLET_LOGIN_EVENT, SMART_WALLET_LOGIN_POINT } from '../consts'

const trackLoginPoints = async (address: Address) => {
  const stackClient = getStackClient()
  await stackClient.track(FIRST_SMART_WALLET_LOGIN_EVENT, {
    points: SMART_WALLET_LOGIN_POINT,
    account: address,
    uniqueId: address,
  })
}

export default trackLoginPoints

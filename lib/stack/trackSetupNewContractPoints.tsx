import { Address } from 'viem'
import getStackClient from './getStackClient'
import { SETUP_NEW_CONTRACT_EVENT, SETUP_NEW_CONTRACT_POINT } from '../consts'

const trackSetupNewContractPoints = async (
  address: Address,
  setupContractEventArgs: any,
  chainId: any,
) => {
  const stackClient = getStackClient()
  await stackClient.track(SETUP_NEW_CONTRACT_EVENT, {
    points: SETUP_NEW_CONTRACT_POINT,
    account: address,
    uniqueId: `${chainId}-${setupContractEventArgs.newContract}`,
    metadata: setupContractEventArgs,
  })
}

export default trackSetupNewContractPoints

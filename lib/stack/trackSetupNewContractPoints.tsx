import { Address } from 'viem'
import getStackClient from './getStackClient'
import { SETUP_NEW_CONTRACT_EVENT, SETUP_NEW_CONTRACT_POINT } from '../consts'

const trackSetupNewContractPoints = async (
  address: Address,
  setupContractEventArgs: any,
  chainId: any,
) => {
  const newContract = setupContractEventArgs.newContract
  const stackClient = getStackClient()
  const params = {
    points: SETUP_NEW_CONTRACT_POINT,
    account: address,
    uniqueId: `${chainId}-${newContract}`,
    metadata: { ...setupContractEventArgs, newContract },
  }
  console.log('SWEETS PARAMS', params)
  await stackClient.track(SETUP_NEW_CONTRACT_EVENT, params)
}

export default trackSetupNewContractPoints

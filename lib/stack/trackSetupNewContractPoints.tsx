import { Address } from 'viem'
import getStackClient from './getStackClient'
import { CHAIN_ID, SETUP_NEW_CONTRACT_EVENT, SETUP_NEW_CONTRACT_POINT } from '../consts'

const trackSetupNewContractPoints = async (address: Address, setupContractEventArgs: any) => {
  const stackClient = getStackClient()
  await stackClient.track(SETUP_NEW_CONTRACT_EVENT, {
    points: SETUP_NEW_CONTRACT_POINT,
    account: address,
    uniqueId: `${CHAIN_ID}-${setupContractEventArgs.newContract}`,
    metadata: setupContractEventArgs,
  })
}

export default trackSetupNewContractPoints

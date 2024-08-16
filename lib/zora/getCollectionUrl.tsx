import { Address } from 'viem'
import { baseSepolia } from 'viem/chains'

const getCollectionUrl = (chainId: any, collectionAddress: Address) => {
  const isTestnet = chainId == baseSepolia.id
  return `https://${isTestnet ? 'testnet.' : ''}zora.co/collect/${isTestnet ? 'bsep' : 'base'}:${collectionAddress}/1`
}

export default getCollectionUrl

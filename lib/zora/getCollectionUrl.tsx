import { Address } from 'viem'

const getCollectionUrl = (collectionAddress: Address) =>
  `https://testnet.zora.co/collect/bsep:${collectionAddress}/1`

export default getCollectionUrl

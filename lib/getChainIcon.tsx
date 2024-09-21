import {
  optimism,
  optimismSepolia,
  baseSepolia,
  base,
  sepolia,
  mainnet,
  polygon,
  polygonMumbai,
  zora,
  zoraSepolia,
} from 'viem/chains'
import ethereumIcon from '../public/icons/Ethereum.svg'
import optimismIcon from '../public/icons/Optimism.svg'
import baseIcon from '../public/icons/Base.svg'
import polygonIcon from '../public/icons/Polygon.svg'
import zoraIcon from '../public/icons/zora.png'

const getChainIcon = (chainId: number) => {
  switch (chainId) {
    case base.id:
    case baseSepolia.id:
      return baseIcon
    case optimism.id:
    case optimismSepolia.id:
      return optimismIcon
    case mainnet.id:
    case sepolia.id:
      return ethereumIcon
    case polygon.id:
    case polygonMumbai.id:
      return polygonIcon
    case zora.id:
    case zoraSepolia.id:
      return zoraIcon
    default:
      return ethereumIcon
  }
}

export default getChainIcon

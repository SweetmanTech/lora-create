import { ethers } from 'ethers'
import { base, baseSepolia } from 'viem/chains'

const getDefaultProvider = (chainId: number) => {
  if (chainId === baseSepolia.id) {
    return ethers.getDefaultProvider(baseSepolia.rpcUrls.default.http[0])
  }

  return ethers.getDefaultProvider(base.rpcUrls.default.http[0])
}

export default getDefaultProvider

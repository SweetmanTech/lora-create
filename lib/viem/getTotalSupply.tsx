import { erc721Abi } from 'viem'
import { getPublicClient } from '../clients'
import { CHAIN_ID } from '../consts'

const getTotalSupply = async (dropAddress) => {
  const response = await getPublicClient(CHAIN_ID).readContract({
    address: dropAddress as `0x${string}`,
    abi: erc721Abi,
    functionName: 'totalSupply',
  })
  return response
}

export default getTotalSupply

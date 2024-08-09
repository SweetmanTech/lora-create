import getTotalSupply from './viem/getTotalSupply'

const getZoraNextTokenId = async (dropAddress) => {
  const lastMinted = await getTotalSupply(dropAddress)
  const nextTokenId = (lastMinted + BigInt(1)).toString()
  return nextTokenId
}

export default getZoraNextTokenId

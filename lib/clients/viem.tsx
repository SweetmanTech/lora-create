import { Chain, PublicClient, createPublicClient, http } from 'viem'
import getViemNetwork from '../viem/getViemNetwork'
import { zora, zoraSepolia } from 'viem/chains'

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId)
  let RPC_URL = ''
  if (chainId === zoraSepolia.id) RPC_URL = 'https://sepolia.rpc.zora.energy'
  if (chainId === zora.id) RPC_URL = 'https://rpc.zora.energy'

  const publicClient = createPublicClient({
    chain: chain as Chain,
    transport: RPC_URL ? http(RPC_URL) : http(),
  }) as any
  return publicClient as PublicClient
}

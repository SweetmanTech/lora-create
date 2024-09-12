import { createConfig, http } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { base, baseSepolia, zora, zoraSepolia } from 'viem/chains'

const wagmiConfig = createConfig({
  chains: [base, baseSepolia, zora, zoraSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'myco.wtf',
      preference: 'smartWalletOnly',
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [zora.id]: http('https://rpc.zora.energy'),
    [zoraSepolia.id]: http('https://sepolia.rpc.zora.energy'),
  } as any,
})

export default wagmiConfig

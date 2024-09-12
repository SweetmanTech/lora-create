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
    [zora.id]: http(),
    [zoraSepolia.id]: http(),
  } as any,
})

export default wagmiConfig

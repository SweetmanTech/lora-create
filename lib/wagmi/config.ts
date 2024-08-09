import { createConfig, http } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { CHAIN, CHAIN_ID } from '../consts'

const wagmiConfig = createConfig({
  chains: [CHAIN],
  connectors: [
    coinbaseWallet({
      appName: 'xcelencia',
      preference: 'smartWalletOnly',
    }),
  ],
  transports: {
    [CHAIN_ID]: http(),
  } as any,
})

export default wagmiConfig

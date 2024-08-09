'use client'

import WagmiProvider from './WagmiProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>{children}</WagmiProvider>
)

export default Providers

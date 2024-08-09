'use client'

import { PaymasterProvider } from './PaymasterProvider'
import { PointsProvider } from './PointsProvider'
import WagmiProvider from './WagmiProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <PaymasterProvider>
      <PointsProvider>{children}</PointsProvider>
    </PaymasterProvider>
  </WagmiProvider>
)

export default Providers

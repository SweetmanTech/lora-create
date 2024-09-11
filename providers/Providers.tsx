'use client'

import { ZoraCreateProvider } from './ZoraCreateProvider'
import { PaymasterProvider } from './PaymasterProvider'
import WagmiProvider from './WagmiProvider'
import { ProfileProvider } from './ProfileProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <PaymasterProvider>
      <ProfileProvider>
        <ZoraCreateProvider>{children}</ZoraCreateProvider>
      </ProfileProvider>
    </PaymasterProvider>
  </WagmiProvider>
)

export default Providers

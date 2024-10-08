'use client'

import { ZoraCreateProvider } from './ZoraCreateProvider'
import { PaymasterProvider } from './PaymasterProvider'
import WagmiProvider from './WagmiProvider'
import CollectionProvider from './CollectionProvider'
import ProfileProvider from './ProfileProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <ProfileProvider>
      <CollectionProvider>
        <PaymasterProvider>
          <ZoraCreateProvider>{children}</ZoraCreateProvider>
        </PaymasterProvider>
      </CollectionProvider>
    </ProfileProvider>
  </WagmiProvider>
)

export default Providers

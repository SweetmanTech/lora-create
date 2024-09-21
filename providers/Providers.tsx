'use client'

import { ZoraCreateProvider } from './ZoraCreateProvider'
import { PaymasterProvider } from './PaymasterProvider'
import WagmiProvider from './WagmiProvider'
import CollectionProvider from './CollectionProvider'

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <CollectionProvider>
      <PaymasterProvider>
        <ZoraCreateProvider>{children}</ZoraCreateProvider>
      </PaymasterProvider>
    </CollectionProvider>
  </WagmiProvider>
)

export default Providers

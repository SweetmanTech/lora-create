import WagmiProvider from './WagmiProvider'

export default async function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiProvider>{children}</WagmiProvider>
}

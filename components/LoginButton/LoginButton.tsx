'use client'

import { useAccount, useDisconnect } from 'wagmi'
import Button from '@/components/Button'
import { useCoinbaseSmartWalletProvider } from '@/providers/CoinbaseSmartWalletProvider'

export default function LoginButton() {
  const { status } = useAccount()
  const { disconnect } = useDisconnect()
  const { isAuthorized, connect } = useCoinbaseSmartWalletProvider()

  if (['connecting', 'reconnecting'].includes(status)) return <Button disabled>Loading...</Button>

  if (status === 'connected' && isAuthorized)
    return <Button onClick={disconnect}>Disconnect</Button>

  return <Button onClick={connect}>Connect</Button>
}

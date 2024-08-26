'use client'

import { useAccount, useDisconnect } from 'wagmi'
import useConnectWallet from '@/hooks/useConnectWallet'
import Button from '@/components/Button'

export default function LoginButton() {
  const { status } = useAccount()
  const { connectWallet } = useConnectWallet()
  const { disconnect } = useDisconnect()

  if (['connecting', 'reconnecting'].includes(status)) return <Button disabled>Loading...</Button>

  if (status === 'connected') return <Button onClick={disconnect}>Disconnect</Button>

  return <Button onClick={connectWallet}>Connect</Button>
}

'use client'

import { useAccount } from 'wagmi'
import DisconnectButton from './DisconnectButton'
import useConnectWallet from '@/hooks/useConnectWallet'
import Button from '../Button'

const LoginButton = () => {
  const { address } = useAccount()
  const { connectWallet } = useConnectWallet()

  return (
    <div>{address ? <DisconnectButton /> : <Button onClick={connectWallet}>Connect </Button>}</div>
  )
}

export default LoginButton

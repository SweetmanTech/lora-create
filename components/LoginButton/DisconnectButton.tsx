'use client'

import { useDisconnect } from 'wagmi'
import Button from '../Button'

const DisconnectButton = () => {
  const { disconnect } = useDisconnect()

  return <Button onClick={() => disconnect()}>Disconnect</Button>
}

export default DisconnectButton

'use client'

import { useAccount } from 'wagmi'
import DisconnectButton from './DisconnectButton'
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet'

const LoginButton = () => {
  const { address } = useAccount()

  return (
    <div>
      {address ? (
        <DisconnectButton />
      ) : (
        <Wallet>
          <ConnectWallet />
        </Wallet>
      )}
    </div>
  )
}

export default LoginButton

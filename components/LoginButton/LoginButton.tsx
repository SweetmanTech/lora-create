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
          <ConnectWallet className="bg-black hover:bg-white hover:text-black" />
        </Wallet>
      )}
    </div>
  )
}

export default LoginButton

import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'

const useConnectWallet = () => {
  const { connectors, connectAsync } = useConnect()
  const { address } = useAccount()
  const connector = connectors[0]

  useEffect(() => {
    if (!address) return
    trackLoginPoints(address)
  }, [address])

  const connectWallet = () => connectAsync({ connector })

  return {
    connectWallet,
  }
}

export default useConnectWallet

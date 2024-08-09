import { useConnect } from 'wagmi'

const useConnectWallet = () => {
  const { connectors, connect } = useConnect()
  const connector = connectors[0]

  const connectWallet = () => connect({ connector })

  return {
    connectWallet,
  }
}

export default useConnectWallet

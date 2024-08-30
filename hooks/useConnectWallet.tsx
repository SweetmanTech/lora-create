import { useConnect } from 'wagmi'

const useConnectWallet = () => {
  const { connectors, connectAsync } = useConnect()
  const connector = connectors[0]

  const connectWallet = () => connectAsync({ connector })

  return {
    connectWallet,
  }
}

export default useConnectWallet

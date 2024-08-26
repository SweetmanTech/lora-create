import { useConnect } from 'wagmi'

const useConnectWallet = () => {
  const { connectors, connect } = useConnect()
  const connector = connectors[0]

  const connectWallet = async () =>
    new Promise((res, rej) => connect({ connector }, { onSuccess: res, onError: rej }))

  return {
    connectWallet,
  }
}

export default useConnectWallet

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useConnect } from 'wagmi'

const useCoinbaseSmartWallet = () => {
  const [isAuthorized, setIsAuthorized] = useState<any>(null)
  const { connect: wagmiConnect, connectors, data } = useConnect()

  const coinbaseWalletConnector = connectors?.find(
    (connector) => connector.id === 'coinbaseWalletSDK',
  )

  useEffect(() => {
    const init = async () => {
      const authorized = await coinbaseWalletConnector?.isAuthorized()
      setIsAuthorized(authorized)
    }

    if (!coinbaseWalletConnector) return
    init()
  }, [coinbaseWalletConnector])

  const connect = () => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK',
    )
    if (coinbaseWalletConnector && !data) {
      wagmiConnect({ connector: coinbaseWalletConnector })
      return
    }

    toast.error('We can not find coinbase wallet SDK.')
  }

  return {
    isAuthorized,
    connect,
  }
}

export default useCoinbaseSmartWallet

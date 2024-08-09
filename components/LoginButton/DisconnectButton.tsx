'use client'

import { useDisconnect } from 'wagmi'

const DisconnectButton = () => {
  const { disconnect } = useDisconnect()

  return (
    <button
      onClick={() => disconnect()}
      type="button"
      className="cursor-pointer bg-black hover:bg-white hover:text-black font-bold leading-normal text-ock-inverse inline-flex min-w-[153px] items-center justify-center rounded-xl px-4 py-3 text-xl"
    >
      Disconnect
    </button>
  )
}

export default DisconnectButton

'use client'

import { useDisconnect } from 'wagmi'

const DisconnectButton = () => {
  const { disconnect } = useDisconnect()

  return (
    <button
      onClick={() => disconnect()}
      type="button"
      className="cursor-pointer bg-ock-primary active:bg-ock-primary-active hover:bg-ock-primary-hover font-bold font-sans text-base leading-normal text-ock-inverse inline-flex min-w-[153px] items-center justify-center rounded-xl px-4 py-3"
    >
      Disconnect
    </button>
  )
}

export default DisconnectButton

'use client'

import Button from '../Button'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import { CHAIN_ID } from '@/lib/consts'

const CreateButton = ({ children, chainId = CHAIN_ID }: any) => {
  const { create } = useZoraCreateProvider()

  return (
    <Button
      onClick={() => create(chainId)}
      className="bg-white text-black p-3 transform hover:scale-105 transition-transform duration-150 hover:shadow-lg"
    >
      {children}
    </Button>
  )
}

export default CreateButton

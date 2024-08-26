'use client'

import Button from '../Button'
import { useZoraCreate } from '@/providers/ZoraCreateProvider'

const CreateButton = ({ chainId, children }: any) => {
  const { create } = useZoraCreate()

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

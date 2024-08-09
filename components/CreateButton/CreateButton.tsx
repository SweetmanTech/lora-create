'use client'

import useZoraCreate from '@/hooks/useZoraCreate'
import Button from '../Button'

const CreateButton = () => {
  const { create } = useZoraCreate()

  return (
    <Button onClick={create} className="bg-white hover:bg-black hover:text-white text-black p-3">
      create
    </Button>
  )
}

export default CreateButton

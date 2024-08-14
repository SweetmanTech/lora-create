'use client'

import useZoraCreate from '@/hooks/useZoraCreate'
import Button from '../Button'

const CreateButton = () => {
  const { create } = useZoraCreate()

  return (
    <Button
      onClick={create}
      className="bg-white text-black p-3 transform hover:scale-105 transition-transform duration-150 hover:shadow-lg"
    >
      create
    </Button>
  )
}

export default CreateButton

import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useState } from 'react'

const useCreateMetadata = () => {
  const [name, setName] = useState<string>('CC0 Music')
  const [saleStrategy, setSaleStrategy] = useState<string>('ZoraTimedSaleStrategy')
  const [imageUri, setImageUri] = useState<string>('')
  const [mimeType, setMimeType] = useState<string>('')
  const [animationUri, setAnimationUri] = useState<string>('')

  const getUri = async () =>
    await uploadJson({
      name,
      description: '',
      image: imageUri,
      animation_url: animationUri,
      content: {
        mime: mimeType,
        uri: animationUri,
      },
    })

  return {
    animationUri,
    setAnimationUri,
    getUri,
    imageUri,
    setImageUri,
    mimeType,
    setMimeType,
    name,
    saleStrategy,
    setName,
    setSaleStrategy,
  }
}

export default useCreateMetadata

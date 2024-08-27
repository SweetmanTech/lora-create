import { DEFAULT_IMAGE_URI } from '@/lib/consts'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useState } from 'react'

const useCreateMetadata = () => {
  const [name, setName] = useState<string>('CC0 Music')
  const [saleStrategy, setSaleStrategy] = useState<string>('ZoraTimedSaleStrategy')
  const [imageUri, setImageUri] = useState<string>(DEFAULT_IMAGE_URI)
  const [mimeType, setMimeType] = useState<string>('')
  const [animationUri, setAnimationUri] = useState<string>('')
  const imageUploaded = DEFAULT_IMAGE_URI !== imageUri

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
    imageUploaded,
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

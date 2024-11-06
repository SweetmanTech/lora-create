import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useState } from 'react'

const useCreateMetadata = () => {
  const [name, setName] = useState<string>()
  const [isTimedSale, setIsTimedSale] = useState<boolean>(true)
  const [imageUri, setImageUri] = useState<string>('')
  const [mimeType, setMimeType] = useState<string>('')
  const [animationUri, setAnimationUri] = useState<string>('')

  const getUri = async () => {
    if (!name) {
      throw new Error('Name is required')
    }
    
    if (!imageUri) {
      throw new Error('Cover Image is required')
    }

    const metadata: any = {
      name,
      description: '',
      image: imageUri,
    }

    if (animationUri) {
      metadata.animation_url = animationUri
      metadata.content = {
        mime: mimeType,
        uri: animationUri,
      }
    }

    const uri = await uploadJson(metadata)
    return uri
  }

  return {
    animationUri,
    setAnimationUri,
    getUri,
    imageUri,
    setImageUri,
    mimeType,
    setMimeType,
    name,
    isTimedSale,
    setName,
    setIsTimedSale,
  }
}

export default useCreateMetadata

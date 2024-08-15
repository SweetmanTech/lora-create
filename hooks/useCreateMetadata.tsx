import { DEFAULT_IMAGE_URI } from '@/lib/consts'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useState } from 'react'

const useCreateMetadata = () => {
  const [name, setName] = useState<string>('CC0 Music')
  const [saleStrategy, setSaleStrategy] = useState<string>('ZoraTimedSaleStrategy')
  const [imageUri, setImageUri] = useState<string>(DEFAULT_IMAGE_URI)
  const animationUri = 'ipfs://bafybeicpnghwsq5xyaej4hi6vuxoi4oxplll3wfhurf2v6y6kfctrtintq'
  const imageUploaded = DEFAULT_IMAGE_URI !== imageUri

  const getUri = async () =>
    await uploadJson({
      name,
      description: '',
      image: imageUri,
      animation_url: animationUri,
      content: {
        mime: 'audio/mpeg',
        uri: animationUri,
      },
    })

  return {
    getUri,
    imageUploaded,
    imageUri,
    setImageUri,
    name,
    saleStrategy,
    setName,
    setSaleStrategy,
  }
}

export default useCreateMetadata

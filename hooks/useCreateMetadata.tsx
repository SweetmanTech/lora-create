import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useState } from 'react'

const useCreateMetadata = () => {
  const [name, setName] = useState<string>('CC0 Music')
  const [saleStrategy, setSaleStrategy] = useState<string>('ZoraTimedSaleStrategy')
  const imageUri = 'ipfs://bafkreic3cefqzzqhoc34e2dqqfgtctmfc7mdgcfbapizpjrlroutfzilci'
  const animationUri = 'ipfs://bafybeicpnghwsq5xyaej4hi6vuxoi4oxplll3wfhurf2v6y6kfctrtintq'

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

  return { getUri, name, saleStrategy, setName, setSaleStrategy }
}

export default useCreateMetadata

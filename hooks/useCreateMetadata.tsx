import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useState } from 'react'

const useCreateMetadata = () => {
  const [name, setName] = useState<string>('CC0 Music')
  const [saleStrategy, setSaleStrategy] = useState<string>('ZoraTimedSaleStrategy')

  const getUri = async () =>
    await uploadJson({
      name,
      description: '',
      image: 'ipfs://bafkreic3cefqzzqhoc34e2dqqfgtctmfc7mdgcfbapizpjrlroutfzilci',
      animation_url: 'ipfs://bafybeicpnghwsq5xyaej4hi6vuxoi4oxplll3wfhurf2v6y6kfctrtintq',
      content: {
        mime: 'audio/mpeg',
        uri: 'ipfs://bafybeicpnghwsq5xyaej4hi6vuxoi4oxplll3wfhurf2v6y6kfctrtintq',
      },
    })

  return { getUri, name, saleStrategy, setName, setSaleStrategy }
}

export default useCreateMetadata

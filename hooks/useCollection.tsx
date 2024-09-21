import { getPublicClient } from '@/lib/clients'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { COLLECTION_TYPE } from '@/types/collection'
import { METADATA_TYPE } from '@/types/metadata'
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments'
import { useEffect, useState } from 'react'

const useCollection = (collection: COLLECTION_TYPE) => {
  const [metadata, setMetadata] = useState<METADATA_TYPE | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const chainId = collection.chainId
        const publicClient = getPublicClient(chainId)
        const uri = await publicClient.readContract({
          address: collection.address,
          abi: zoraCreator1155ImplABI,
          functionName: 'contractURI',
        })

        const response = await fetch(getIpfsLink(uri))
        const metadata = await response.json()
        if (metadata.name) setMetadata(metadata)
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [collection])

  return metadata
}

export default useCollection

import { getPublicClient } from '@/lib/clients'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { COLLECTION_TYPE } from '@/types/collection'
import { METADATA_TYPE } from '@/types/metadata'
import { useQuery } from '@tanstack/react-query'
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

const useCollections = () => {
  const { address } = useAccount()
  const [selectedCollection, setSelectedCollection] = useState<COLLECTION_TYPE | null>(null)
  const { push } = useRouter()
  const [metadatas, setMetadatas] = useState<METADATA_TYPE | null>(null)

  const getCollections = async (): Promise<COLLECTION_TYPE[]> => {
    const response = await fetch(`/api/collections?address=${address}`)
    const data = await response.json()
    return data.collections
  }

  const { data: collections } = useQuery({
    queryKey: ['getCollections'],
    queryFn: getCollections,
  })

  useEffect(() => {
    if (selectedCollection) {
      push(`/${selectedCollection.chainId}/${selectedCollection.address}`)
      return
    }

    push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollection])

  useEffect(() => {
    const init = async () => {
      try {
        let collectionUris = []
        const groupByChainId = (collection: COLLECTION_TYPE[]) => {
          return collection.reduce(
            (acc, item) => {
              const { chainId } = item
              if (!acc[chainId]) {
                acc[chainId] = []
              }
              acc[chainId].push(item)
              return acc
            },
            {} as { [key: number]: COLLECTION_TYPE[] },
          )
        }

        const grouped = groupByChainId(collections)
        const collectionsGroup = Object.values(grouped)

        for (const group of collectionsGroup) {
          const calls = []
          for (const collection of group) {
            calls.push({
              address: collection.address as Address,
              abi: zoraCreator1155ImplABI,
              functionName: 'contractURI',
            })
          }
          const publicClient: any = getPublicClient(group[0].chainId)

          const results = await publicClient.multicall({
            contracts: calls,
          })

          const uris = results
            .filter((result: any) => !result.error)
            .map((result: any) => result.result)
          collectionUris = collectionUris.concat(uris)
        }

        const metadataPromise = collectionUris.map(async (uri: string) => {
          const response = await fetch(getIpfsLink(uri))
          const metadata = await response.json()
          return metadata
        })

        const metadata: any = await Promise.all(metadataPromise)
        setMetadatas(metadata)
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [collections])

  return {
    metadatas,
    setSelectedCollection,
    selectedCollection,
    collections,
  }
}

export default useCollections

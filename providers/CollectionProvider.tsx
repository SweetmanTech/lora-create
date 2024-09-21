import { COLLECTION_TYPE } from '@/types/collection'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

const CollectionContext = createContext(null)

const CollectionProvider = ({ children }) => {
  const { address } = useAccount()
  const [selectedCollection, setSelectedCollection] = useState<COLLECTION_TYPE | null>(null)
  const { push } = useRouter()
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
  }, [selectedCollection])

  const value = useMemo(
    () => ({
      collections,
      setSelectedCollection,
      selectedCollection,
    }),
    [collections, setSelectedCollection, selectedCollection],
  )

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>
}

export const useCollectionProvider = () => {
  const context = useContext(CollectionContext)
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider')
  }
  return context
}

export default CollectionProvider

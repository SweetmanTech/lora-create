import { useCollectionProvider } from '@/providers/CollectionProvider'
import { useState } from 'react'
import Collection from './Collection'
import Image from 'next/image'

const CollectionSelect = () => {
  const { collections, selectedCollection, setSelectedCollection, metadatas } =
    useCollectionProvider()
  const [isOpenDropList, setIsOpenDropList] = useState(false)

  return (
    <div className="mt-4 md:mt-0 w-full flex flex-col items-center gap-1">
      <p className="text-left w-full">Collection</p>
      <div className="w-full flex flex-col items-start gap-4">
        <button
          type="button"
          className="w-full relative border-black border rounded-md p-2"
          onClick={() => setIsOpenDropList(!isOpenDropList)}
        >
          {selectedCollection ? (
            <Collection collection={selectedCollection} metadata={selectedCollection.metadata} />
          ) : (
            <p className="text-left">Create Collection</p>
          )}
          <div
            className={`absolute w-full left-0 top-[100%] bg-background
          ${collections?.length > 0 ? 'py-2' : 'pt-2'} border border-black rounded-md max-h-[160px] overflow-y-auto
          flex flex-col items-start gap-y-2 ${isOpenDropList ? '' : 'hidden pointer-events-none'}`}
          >
            <button
              className={`px-2 flex gap-2 py-2 border-b border-dashed border-b-black w-full ${collections?.length > 0 ? 'border-b border-dashed border-b-black' : ''}`}
              type="button"
              onClick={() => setSelectedCollection(null)}
            >
              <Image src={'/icons/New.svg'} width={20} height={20} alt="" />
              <p>Create Collection</p>
            </button>
            {collections &&
              metadatas &&
              collections?.map((collection, index) => (
                <Collection
                  key={collection.address}
                  collection={collection}
                  metadata={metadatas[index]}
                />
              ))}
          </div>
        </button>
      </div>
    </div>
  )
}

export default CollectionSelect

import useCollection from '@/hooks/useCollection'
import getChainIcon from '@/lib/getChainIcon'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useCollectionProvider } from '@/providers/CollectionProvider'
import { COLLECTION_TYPE } from '@/types/collection'
import Image from 'next/image'

const Collection = ({ collection }: { collection: COLLECTION_TYPE }) => {
  const metadata = useCollection(collection)
  const { setSelectedCollection } = useCollectionProvider()

  return (
    <button
      className={`flex gap-2 items-center px-2 ${!metadata && 'hidden'}`}
      type="button"
      onClick={() => setSelectedCollection(collection)}
    >
      {metadata && (
        <>
          <div className="relative">
            <Image
              src={getIpfsLink(metadata.image)}
              alt=""
              width={40}
              height={40}
              className="rounded-md overflow-hidden"
            />
            <Image
              src={getChainIcon(collection.chainId)}
              alt=""
              width={15}
              height={15}
              className="rounded-full overflow-hidden absolute right-[-3px] bottom-[-3px]"
            />
          </div>
          <p>{metadata?.name}</p>
        </>
      )}
    </button>
  )
}

export default Collection

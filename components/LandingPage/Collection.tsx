import getChainIcon from '@/lib/getChainIcon'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useCollectionProvider } from '@/providers/CollectionProvider'
import { COLLECTION_TYPE } from '@/types/collection'
import { METADATA_TYPE } from '@/types/metadata'
import Image from 'next/image'

const Collection = ({
  metadata,
  collection,
}: {
  metadata: METADATA_TYPE
  collection: COLLECTION_TYPE
}) => {
  const { setSelectedCollection } = useCollectionProvider()

  return (
    <button
      className={`flex gap-2 items-center px-2 ${!metadata && 'hidden'}`}
      type="button"
      onClick={() =>
        setSelectedCollection({
          ...collection,
          metadata,
        })
      }
    >
      {metadata && (
        <>
          <div className="relative">
            <div className="w-10 aspect-[1/1] relative overflow-hidden">
              <Image
                src={getIpfsLink(metadata.image)}
                alt=""
                layout="fill"
                className="rounded-md overflow-hidden absolute object-cover object-center"
              />
            </div>
            <Image
              src={getChainIcon(collection.chainId)}
              alt="chain icon"
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

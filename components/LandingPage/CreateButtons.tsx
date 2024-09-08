import { base, baseSepolia } from 'viem/chains'
import CreateButton from '../CreateButton'
import { useParams } from 'next/navigation'

const CreateButtons = () => {
  const params = useParams()
  const chainId = Number(params.chainId)
  const collection = params.collection as string

  return (
    <div className="flex justify-between w-full gap-2">
      <CreateButton chainId={chainId || baseSepolia.id} collectionAddress={collection}>
        {collection ? 'Create on Existing' : 'Preview'}
      </CreateButton>
      {!collection && <CreateButton chainId={chainId || base.id}>Publish</CreateButton>}
    </div>
  )
}

export default CreateButtons

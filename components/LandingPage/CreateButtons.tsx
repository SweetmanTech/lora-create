import { baseSepolia } from 'viem/chains'
import CreateButton from '../CreateButton'
import { useParams } from 'next/navigation'

const CreateButtons = () => {
  const params = useParams()
  const collection = params.collection as string
  const chainId = params.chainId

  return (
    <div className="flex justify-between w-full gap-2">
      <CreateButton chainId={collection ? Number(chainId) : baseSepolia.id}>
        {collection ? 'Create on Existing' : 'Preview'}
      </CreateButton>
      {!collection && <CreateButton>Publish</CreateButton>}
    </div>
  )
}

export default CreateButtons

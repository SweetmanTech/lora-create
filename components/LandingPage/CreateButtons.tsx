import { base, baseSepolia, zora, zoraSepolia } from 'viem/chains'
import CreateButton from '../CreateButton'
import { useParams } from 'next/navigation'

const CreateButtons = () => {
  const params = useParams()
  const collection = params.collection as string
  const chainId = Number(params.chainId)

  const isBase = chainId === baseSepolia.id || chainId === base.id
  const isZora = chainId === zoraSepolia.id || chainId === zora.id

  const previewChainId = () => {
    if (isBase) return baseSepolia.id
    if (isZora) return zoraSepolia.id
    return baseSepolia.id
  }

  return (
    <div className="flex justify-between w-full gap-2">
      <CreateButton chainId={collection ? chainId : previewChainId()}>
        {collection ? 'Create on Existing' : 'Preview'}
      </CreateButton>
      {!collection && <CreateButton>Publish</CreateButton>}
    </div>
  )
}

export default CreateButtons

import { base, baseSepolia } from 'viem/chains'
import CreateButton from '../CreateButton'

const CreateButtons = () => {
  return (
    <div className="flex justify-between w-full gap-2">
      <CreateButton chainId={baseSepolia.id}>Preview</CreateButton>
      <CreateButton chainId={base.id}>Publish</CreateButton>
    </div>
  )
}

export default CreateButtons

import UploadIcon from '../Icons/UploadIcon'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import useFileUpload from '@/hooks/useFileUpload'
import Image from 'next/image'

const MainMediaUpload = () => {
  const { imageUploaded, imageUri } = useZoraCreateProvider()
  const { error, fileUpload } = useFileUpload()

  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-black rounded-md cursor-pointer">
        <input
          id="image"
          type="file"
          className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          onChange={fileUpload}
        />
        <div className="z-0 flex flex-col items-center justify-center space-y-2 text-muted-foreground">
          <UploadIcon className="w-8 h-8" />
          <p className="text-sm font-medium">click to upload</p>
        </div>
        {imageUploaded && (
          <Image src={getIpfsLink(imageUri)} fill className="object-contain" alt="Image Preview" />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MainMediaUpload

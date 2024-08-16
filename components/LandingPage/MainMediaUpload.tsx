import UploadIcon from '../Icons/UploadIcon'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import useFileUpload from '@/hooks/useFileUpload'

const MainMediaUpload = () => {
  const { imageUploaded, imageUri, mimeType } = useZoraCreateProvider()
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
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getIpfsLink(imageUri)}
            alt="Image Preview"
            width="192"
            height="192"
            className="absolute inset-0 z-0 w-full h-full object-cover rounded-md"
            style={{ aspectRatio: '192/192', objectFit: 'cover' }}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MainMediaUpload

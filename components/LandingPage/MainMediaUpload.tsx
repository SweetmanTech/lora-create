import UploadIcon from '../Icons/UploadIcon'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import useFileUpload from '@/hooks/useFileUpload'

const MainMediaUpload = () => {
  const { imageUploaded, imageUri } = useZoraCreateProvider()
  const { error, fileUpload } = useFileUpload()

  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div className="w-full h-48 relative">
        {!imageUploaded && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground border-dashed border-2 border-black rounded-md">
              <UploadIcon className="w-8 h-8" />
              <p className="text-sm font-medium">click to upload</p>
            </div>
            <input
              id="image"
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={fileUpload}
            />
          </>
        )}

        {imageUploaded && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getIpfsLink(imageUri)}
            className="border-dashed border-2 border-black rounded-md h-full mx-auto"
            alt="Image Preview"
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MainMediaUpload

import UploadIcon from '../Icons/UploadIcon'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import useFileUpload from '@/hooks/useFileUpload'
import { cn } from '@/lib/utils'

const MainMediaUpload = () => {
  const { imageUploaded, imageUri } = useZoraCreateProvider()
  const { fileUpload, loading, error } = useFileUpload()

  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div
        className={cn(
          'w-full h-48 relative flex flex-col items-center justify-center space-y-2 text-muted-foreground rounded-md',
          (loading || !imageUploaded) && 'border-dashed border-2 border-black',
        )}
      >
        <input
          id="image"
          type="file"
          className="absolute inset-0 z-10 opacity-0 cursor-pointer"
          onChange={fileUpload}
        />

        {loading ? (
          <div className="w-8 h-8 border-2 border-dashed border-black rounded-full animate-spin" />
        ) : imageUploaded ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getIpfsLink(imageUri)}
            className="border-dashed border-2 border-black rounded-md h-full mx-auto"
            alt="Image Preview"
          />
        ) : (
          <>
            <UploadIcon className="w-8 h-8" />
            <p className="text-sm font-medium">click to upload</p>
          </>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MainMediaUpload

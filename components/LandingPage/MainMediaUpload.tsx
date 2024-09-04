import UploadIcon from '../Icons/UploadIcon'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import useFileUpload from '@/hooks/useFileUpload'
import { cn } from '@/lib/utils'
import Spinner from '@/components/ui/Spinner'

const MainMediaUpload = () => {
  const { imageUri } = useZoraCreateProvider()
  const { fileUpload, loading, error } = useFileUpload()

  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <div
        className={cn(
          'w-full relative rounded-md',
          (!imageUri || loading) && 'aspect-square',
          (loading || !imageUri) && 'border-dashed border-2 border-black',
        )}
      >
        <input
          id="image"
          type="file"
          className="absolute inset-0 z-10 opacity-0 cursor-pointer"
          onChange={fileUpload}
        />

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        ) : imageUri ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getIpfsLink(imageUri)}
            className="w-full h-auto rounded-md"
            alt="Image Preview"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-muted-foreground">
            <UploadIcon className="w-8 h-8" />
            <p className="text-sm font-medium">click to upload</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MainMediaUpload

import { useState } from 'react'
import UploadIcon from '../Icons/UploadIcon'
import { Label } from '../ui/Label'
import { uploadFile } from '@/lib/ipfs/uploadFile'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const MainMediaUpload = () => {
  const [error, setError] = useState('')
  const { imageUploaded, imageUri, setImageUri } = useZoraCreateProvider()

  const onFileSelected = async (event) => {
    const file = event.target.files[0]
    setError('') // Reset error state

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB.`)
        return
      }

      try {
        console.log('SWEETS FILE', file)
        const { uri } = await uploadFile(file)
        setImageUri(uri)
      } catch (err) {
        console.error(err)
        setError('Failed to upload the file. Please try again.')
      }
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <Label htmlFor="image">Upload Image</Label>
      <div className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-muted rounded-md cursor-pointer">
        <input
          id="image"
          type="file"
          className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          onChange={onFileSelected}
        />
        <div className="z-0 flex flex-col items-center justify-center space-y-2 text-muted-foreground">
          <UploadIcon className="w-8 h-8" />
          <p className="text-sm font-medium">Drag and drop or click to upload</p>
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

import { MAX_FILE_SIZE, ONE_MB } from '@/lib/consts'
import { uploadFile } from '@/lib/ipfs/uploadFile'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import { useState } from 'react'

const useFileUpload = () => {
  const { setName, setImageUri, setAnimationUri, setMimeType } = useZoraCreateProvider()
  const [error, setError] = useState<string>('')

  const fileUpload = async (event) => {
    const file = event.target.files[0]
    setError('')
    if (file) {
      const mimeType = file.type
      const isImage = mimeType.includes('image')
      if (file.size > MAX_FILE_SIZE) {
        setError(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / ONE_MB}MB.`)
        return
      }
      try {
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '')
        const { uri } = await uploadFile(file)
        setName(fileNameWithoutExtension)
        setMimeType(mimeType)
        if (isImage) {
          setImageUri(uri)
          return
        }
        setAnimationUri(uri)
      } catch (err) {
        console.error(err)
        setError('Failed to upload the file. Please try again.')
      }
    }
  }

  return { error, fileUpload }
}

export default useFileUpload

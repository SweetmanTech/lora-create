import { MAX_FILE_SIZE, ONE_MB } from '@/lib/consts'
import { uploadFile } from '@/lib/ipfs/uploadFile'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import { useState } from 'react'

const useFileUpload = () => {
  const { setImageUri } = useZoraCreateProvider()
  const [error, setError] = useState<string>('')

  const fileUpload = async (event) => {
    const file = event.target.files[0]
    setError('') // Reset error state

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / ONE_MB}MB.`)
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

  return { error, fileUpload }
}

export default useFileUpload

import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import useFileUpload from '@/hooks/useFileUpload'
import { cn } from '@/lib/utils'
import Spinner from '@/components/ui/Spinner'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useRef } from 'react'
import NoFileSelected from './NoFileSelected'
import AudioPlayer from './AudioPlayer'
import Image from 'next/image'

const MediaUpload = () => {
  const { imageUri, animationUri, mimeType } = useZoraCreateProvider()
  const { fileUpload, loading, error, blurImageUrl } = useFileUpload()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const renderMedia = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center left-0 top-0">
          <Spinner />
        </div>
      )
    }

    if (mimeType.includes('audio')) {
      return <AudioPlayer onClick={handleImageClick} />
    }

    if (mimeType.includes('video')) {
      return (
        <video controls className="w-full rounded-md">
          <source src={getIpfsLink(animationUri)} type={mimeType} />
          Your browser does not support the video element.
        </video>
      )
    }

    if (imageUri) {
      return (
        <div className="relative w-[296px] h-[296px]">
          <Image
            src={blurImageUrl || getIpfsLink(imageUri)}
            className="w-full h-auto rounded-md cursor-pointer object-contain absolute"
            alt="Image Preview"
            onClick={handleImageClick}
            blurDataURL={blurImageUrl}
            layout="fill"
          />
        </div>
      )
    }

    return <NoFileSelected onClick={handleImageClick} />
  }

  return (
    <div className="grid w-full max-w-3xl items-center gap-4">
      <div
        className={cn(
          'w-full relative rounded-md min-h-[300px] min-w-[300px]',
          !imageUri && !animationUri && 'aspect-square',
          (loading || (!imageUri && !animationUri)) && 'border-dashed border-2 border-black',
        )}
      >
        <input
          ref={fileInputRef}
          id="media"
          type="file"
          className="hidden"
          onChange={fileUpload}
          accept="image/*, audio/*, video/*"
        />
        {renderMedia()}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MediaUpload

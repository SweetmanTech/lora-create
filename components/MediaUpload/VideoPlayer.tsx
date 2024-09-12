import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useFileUploadProvider } from '@/providers/FileUploadProvider'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'

const VideoPlayer = ({ onClick }) => {
  const { imageUri, animationUri, mimeType } = useZoraCreateProvider()
  const { blurImageUrl } = useFileUploadProvider()

  return (
    <section>
      <div className="relative" onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blurImageUrl || getIpfsLink(imageUri)}
          alt="Video thumbnail"
          className="w-full h-auto cursor-pointer"
        />
      </div>
      <video controls className="w-full rounded-md">
        <source src={getIpfsLink(animationUri)} type={mimeType} />
        Your browser does not support the video element.
      </video>
    </section>
  )
}

export default VideoPlayer

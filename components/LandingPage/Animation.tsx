import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'

const Animation = () => {
  const { animationUri, mimeType } = useZoraCreateProvider()

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {mimeType.includes('audio') && (
        <audio controls className="w-full rounded-md">
          <source src={getIpfsLink(animationUri)} type={mimeType} />
          Your browser does not support the audio element.
        </audio>
      )}
      {mimeType.includes('video') && (
        <video controls className="w-full rounded-md">
          <source src={getIpfsLink(animationUri)} type={mimeType} />
          Your browser does not support the video element.
        </video>
      )}
    </div>
  )
}

export default Animation

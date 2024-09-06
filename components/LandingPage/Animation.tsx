import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'

const Animation = () => {
  const { animationUri, mimeType } = useZoraCreateProvider()

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {mimeType.includes('audio') && (
        <div className="bg-gray-100 rounded-full p-2 shadow-md">
          <audio controls className="w-full h-10 focus:outline-none">
            <source src={getIpfsLink(animationUri)} type={mimeType} />
            Your browser does not support the audio element.
          </audio>
        </div>
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

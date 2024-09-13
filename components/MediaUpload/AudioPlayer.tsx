import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import { useRef, useState } from 'react'
import Button from '../Button'
import { Pause, Play } from 'lucide-react'
import { Slider } from '../ui/Slider'
import { useFileUploadProvider } from '@/providers/FileUploadProvider'

const AudioPlayer = ({ onClick }) => {
  const { imageUri, animationUri } = useZoraCreateProvider()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { blurImageUrl } = useFileUploadProvider()

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration
      audioRef.current.currentTime = time
      setProgress(value[0])
    }
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative" onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blurImageUrl || getIpfsLink(imageUri)}
          alt="Audio cover"
          className="w-full h-auto cursor-pointer"
        />
      </div>
      <div className="p-4">
        <audio ref={audioRef} src={getIpfsLink(animationUri)} onTimeUpdate={handleTimeUpdate} />
        <div className="flex justify-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="text-primary hover:text-primary-dark"
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
        </div>
        <Slider
          value={[progress]}
          onValueChange={handleSliderChange}
          max={100}
          step={1}
          className="w-full bg-black"
        />
      </div>
    </div>
  )
}

export default AudioPlayer

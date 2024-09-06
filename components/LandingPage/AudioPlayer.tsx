import { useState, useRef } from 'react'
import { Play, Pause, X } from 'lucide-react'
import Button from '../Button'
import { Slider } from '../ui/Slider'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { animationUri, imageUri } = useZoraCreateProvider()

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
      <div className="relative">
        <img
          src={imageUri ? getIpfsLink(imageUri) : '/placeholder.svg?height=200&width=200'}
          alt="Audio cover"
          className="w-full h-auto"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white hover:text-gray-200"
          onClick={() => console.log('Close player')}
        >
          <X className="h-6 w-6" />
        </Button>
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
          className="w-full"
        />
      </div>
    </div>
  )
}

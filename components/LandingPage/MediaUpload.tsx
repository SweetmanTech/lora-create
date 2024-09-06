import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import useFileUpload from '@/hooks/useFileUpload'
import { cn } from '@/lib/utils'
import Spinner from '@/components/ui/Spinner'
import UploadIcon from '../Icons/UploadIcon'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useState, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import Button from '../Button'
import { Slider } from '../ui/Slider'

const MediaUpload = () => {
  const { imageUri, animationUri, mimeType } = useZoraCreateProvider()
  const { fileUpload, loading, error } = useFileUpload()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const renderMedia = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )
    }

    if (mimeType.includes('audio')) {
      return (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative" onClick={handleImageClick}>
            <img
              src={imageUri ? getIpfsLink(imageUri) : '/placeholder.svg?height=200&width=200'}
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
              className="w-full"
            />
          </div>
        </div>
      )
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
        <img
          src={getIpfsLink(imageUri)}
          className="w-full h-auto rounded-md cursor-pointer"
          alt="Image Preview"
          onClick={handleImageClick}
        />
      )
    }

    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center space-y-2 text-muted-foreground cursor-pointer"
        onClick={handleImageClick}
      >
        <UploadIcon className="w-8 h-8" />
        <p className="text-sm font-medium">click to upload</p>
      </div>
    )
  }

  return (
    <div className="grid w-full max-w-3xl items-center gap-4">
      <div
        className={cn(
          'w-full relative rounded-md',
          !imageUri && !animationUri && 'aspect-square min-h-[300px] min-w-[300px]',
          (loading || (!imageUri && !animationUri)) && 'border-dashed border-2 border-black',
        )}
      >
        <input ref={fileInputRef} id="media" type="file" className="hidden" onChange={fileUpload} />
        {renderMedia()}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default MediaUpload

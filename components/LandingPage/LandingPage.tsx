'use client'

import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import CreateButton from '../CreateButton'
import Points from '../Points'
import MainMediaUpload from './MainMediaUpload'
import SaleStrategySelect from './SaleStrategySelect'
import Title from './Title'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'

const LandingPage = () => {
  const { animationUri, mimeType } = useZoraCreateProvider()

  console.log('SWEETS animationUri', animationUri)
  console.log('SWEETS mimeType', mimeType)
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="gap-5 mx-auto max-w-md text-center items-center flex flex-col gap-5">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Zora Create
        </h1>
        <MainMediaUpload />

        <Title />
        <SaleStrategySelect />
        <div>
          {mimeType.includes('audio') && (
            <audio
              controls
              className="absolute inset-0 z-0 w-full h-full object-cover rounded-md"
              style={{ aspectRatio: '192/192', objectFit: 'cover' }}
            >
              <source src={getIpfsLink(animationUri)} type={mimeType} />
              Your browser does not support the audio element.
            </audio>
          )}
          {mimeType.includes('video') && (
            <video
              controls
              className="absolute inset-0 z-0 w-full h-full object-cover rounded-md"
              style={{ aspectRatio: '192/192', objectFit: 'cover' }}
            >
              <source src={getIpfsLink(animationUri)} type={mimeType} />
              Your browser does not support the video element.
            </video>
          )}
        </div>

        <div className="mt-11">
          <CreateButton />
        </div>
        <Points />
      </div>
    </div>
  )
}

export default LandingPage

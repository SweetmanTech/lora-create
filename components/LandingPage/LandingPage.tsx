'use client'

import SaleStrategySelect from './SaleStrategySelect'
import Title from './Title'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import Spinner from '@/components/ui/Spinner'
import { useAccount } from 'wagmi'
import LoginButton from '@/components/LoginButton'
import MediaUpload from '../MediaUpload'
import CreateButtons from './CreateButtons'
import { FileUploadProvider } from '@/providers/FileUploadProvider'
import CollectionSelect from './CollectionSelect'

export default function LandingPage() {
  const { creating, name } = useZoraCreateProvider()
  const { address } = useAccount()

  if (creating) {
    return (
      <>
        <Spinner />
        <span>Creating Post!</span>
      </>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:w-1/2 flex flex-col items-center gap-5">
          <FileUploadProvider>
            <MediaUpload />
          </FileUploadProvider>
        </div>
        {name !== undefined && (
          <div className="mt-4 md:mt-0 w-full flex flex-col items-center gap-3">
            <div className="w-full flex flex-col items-start gap-4">
              <Title />
              <SaleStrategySelect />
            </div>
            {address ? <CreateButtons /> : <LoginButton />}
          </div>
        )}
        {!name && <CollectionSelect />}
      </div>
    </div>
  )
}

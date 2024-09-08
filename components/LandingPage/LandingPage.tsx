'use client'

import SaleStrategySelect from './SaleStrategySelect'
import Title from './Title'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import Spinner from '@/components/ui/Spinner'
import { useAccount } from 'wagmi'
import LoginButton from '@/components/LoginButton'
import MediaUpload from '../MediaUpload'
import CreateButton from '../CreateButton'
import { base, baseSepolia } from 'viem/chains'

export default function LandingPage({
  chainId,
  collectionAddress,
}: {
  chainId?: number
  collectionAddress?: string
}) {
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-8 md:flex md:space-x-8">
        <div className="md:w-1/2 flex flex-col items-center gap-5">
          <MediaUpload />
        </div>
        {name && (
          <div className="mt-4 md:mt-0 md:w-1/2 flex flex-col items-center gap-3">
            <div className="w-full flex flex-col items-start gap-4">
              <Title />
              <SaleStrategySelect />
            </div>
            {address ? (
              <div className="flex justify-between w-full gap-2">
                <CreateButton
                  chainId={chainId || baseSepolia.id}
                  collectionAddress={collectionAddress}
                >
                  {collectionAddress ? 'Create on Existing' : 'Preview'}
                </CreateButton>
                {!collectionAddress && (
                  <CreateButton chainId={chainId || base.id}>Publish</CreateButton>
                )}
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

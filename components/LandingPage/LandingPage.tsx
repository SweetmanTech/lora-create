'use client'

import Points from '../Points'
import MainMediaUpload from './MainMediaUpload'
import SaleStrategySelect from './SaleStrategySelect'
import Title from './Title'
import Animation from './Animation'
import CreateButtons from './CreateButtons'
import { useZoraCreate } from '@/providers/ZoraCreateProvider'
import Spinner from '@/components/ui/Spinner'

export default function LandingPage() {
  const { creating } = useZoraCreate()
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      {creating ? (
        <>
          <Spinner />
          <span>Creating Post!</span>
        </>
      ) : (
        <div className="mx-auto max-w-md text-center items-center flex flex-col gap-5">
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Zora Create
          </h1>
          <MainMediaUpload />
          <Title />
          <SaleStrategySelect />
          <Animation />
          <CreateButtons />
          <Points />
        </div>
      )}
    </div>
  )
}

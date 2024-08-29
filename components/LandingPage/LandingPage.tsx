'use client'

import Points from '../Points'
import MainMediaUpload from './MainMediaUpload'
import SaleStrategySelect from './SaleStrategySelect'
import Title from './Title'
import Animation from './Animation'
import CreateButtons from './CreateButtons'
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider'
import Spinner from '@/components/ui/Spinner'
import { useAccount } from 'wagmi'
import LoginButton from '@/components/LoginButton'

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
    <div className="mx-auto max-w-md text-center items-center flex flex-col gap-5">
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Zora Create
      </h1>
      <MainMediaUpload />
      <Animation />
      {name && (
        <>
          <Title />
          <SaleStrategySelect />
          {address ? <CreateButtons /> : <LoginButton />}
        </>
      )}
      <Points />
    </div>
  )
}

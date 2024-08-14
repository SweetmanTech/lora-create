'use client'

import CreateButton from '../CreateButton'
import Points from '../Points'
import SaleStrategySelect from './SaleStrategySelect'

const LandingPage = () => (
  <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div className="gap-5 mx-auto max-w-md text-center items-center flex flex-col gap-5">
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Zora Create
      </h1>
      <SaleStrategySelect />
      <div className="mt-11">
        <CreateButton />
      </div>
      <Points />
    </div>
  </div>
)

export default LandingPage

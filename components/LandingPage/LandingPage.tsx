import CreateButton from '../CreateButton'

const LandingPage = () => (
  <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-md text-center">
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Zora Create
      </h1>
      <p className="mt-4 text-muted-foreground">✧111 + Uniswap V3 Pool✧</p>
      <div className="mt-6">
        <CreateButton />
      </div>
    </div>
  </div>
)

export default LandingPage

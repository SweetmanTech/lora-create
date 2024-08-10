import { getFrameMetadata } from 'frog/next'
import LandingPage from '@/components/LandingPage'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.FRAME_URL || 'http://localhost:3000'
  const frameMetadata = await getFrameMetadata(`${url}/api`)
  return {
    other: frameMetadata,
  }
}

const Page = () => <LandingPage />

export default Page

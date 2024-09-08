'use client'

import { useParams } from 'next/navigation'
import LandingPage from '@/components/LandingPage'

export default function ExistingContractPage() {
  const params = useParams()
  const chainId = Number(params.chainId)
  const collectionAddress = params.collection as string

  return <LandingPage chainId={chainId} collectionAddress={collectionAddress} />
}

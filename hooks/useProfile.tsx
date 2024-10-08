import { PROFILE } from '@/types/profile'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const useProfile = () => {
  const [profile, setProfile] = useState<PROFILE | null>(null)
  const { address } = useAccount()

  useEffect(() => {
    const init = async () => {
      const response = await fetch(`https://api.myco.wtf/api/profile?address=${address}`)
      const data = await response.json()

      setProfile(data)
    }
    if (!address) return
    init()
  }, [address])

  return {
    profile,
  }
}

export default useProfile

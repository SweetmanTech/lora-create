import getProfile from '@/lib/getProfile';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const DEFAULT: {
  isPro: boolean;
  profile: Record<string, any> | null;
} = { isPro: false, profile: null }

const ProfileContext = createContext(DEFAULT)

const ProfileProvider = ({ children }: any) => {
  const { address } = useAccount()
  const [profile, setProfile] = useState(DEFAULT)

  useEffect(() => {
    if (address) getProfile(address).then(setProfile)
  }, [address])

  return (
    <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>
  )
}

const useProfileProvider = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

export { ProfileProvider, useProfileProvider }

import useProfile from '@/hooks/useProfile'
import { createContext, useContext, useMemo } from 'react'

const ProfileContext = createContext<ReturnType<typeof useProfile>>(
  {} as ReturnType<typeof useProfile>,
)

const ProfileProvider = ({ children }) => {
  const profile = useProfile()

  const value = useMemo(
    () => ({
      ...profile,
    }),
    [profile],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfileProvider = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfileProvider must be used within a ProfileProvider')
  }
  return context
}

export default ProfileProvider

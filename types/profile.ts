import { Address } from 'viem'

type ZoraProfileData = {
  address: Address
  wallets: Address[]
  addressShort: string
  avatar: string
  username: string
  displayName: string
  ensName: string | null
  handle: string | null
  profileId: string
  profileName: string
  ensRecords: null
  description: string | null
  totalFollowers: number
  totalFollowing: number
}

export type PROFILE = {
  isPro: boolean
  zoraProfile: ZoraProfileData
  connectedZoraProfile: ZoraProfileData | null
}

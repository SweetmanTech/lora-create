import { Address } from 'viem'

export type PROFILE = {
  zoraProfile: {
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
  isPro: boolean
  connectedZoraProfile: {
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
  } | null
}

import { base } from 'wagmi/chains'

export const CHAIN_ID = base.id

export const COMMENT = 'myco.wtf'
export const REFERRAL_RECIPIENT = '0x749B7b7A6944d72266Be9500FC8C221B6A7554Ce'

// STACK EVENTS
export const FIRST_SMART_WALLET_LOGIN_EVENT = 'first_smart_wallet_login'
export const SETUP_NEW_CONTRACT_EVENT = 'setup_new_contract'
export const SMART_WALLET_LOGIN_POINT = 11
export const SETUP_NEW_CONTRACT_POINT = 55

// IPFS
export const ONE_MB = 1024 * 1024
export const MAX_FILE_SIZE = 5 * ONE_MB

export const PROFILE_APP_URL = process.env.NEXT_PUBLIC_PROFILE_APP_URL || 'https://profile.myco.wtf'

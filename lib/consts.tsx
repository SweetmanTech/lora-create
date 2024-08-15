import { base, baseSepolia } from 'wagmi/chains'

export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === 'true'
export const CHAIN = IS_TESTNET ? baseSepolia : base
export const CHAIN_ID = CHAIN.id

// Zora
export const DROP_ADDRESS = IS_TESTNET
  ? '0x0b93a56db47797142076e24c520c846c9bd0d6fa' // base sepolia
  : '0x16F1FC98282AFDA367999012027b5A3fA656a713' // base mainnet
export const ZORA_PRICE = '777000000000000'
export const COMMENT = 'myco.wtf'
export const REFERRAL_RECIPIENT = '0x749B7b7A6944d72266Be9500FC8C221B6A7554Ce'

// STACK EVENTS
export const FIRST_SMART_WALLET_LOGIN_EVENT = 'first_smart_wallet_login'
export const SETUP_NEW_CONTRACT_EVENT = 'setup_new_contract'
export const SMART_WALLET_LOGIN_POINT = 11
export const SETUP_NEW_CONTRACT_POINT = 55

// IPFS
export const DEFAULT_IMAGE_URI =
  'ipfs://bafkreic3cefqzzqhoc34e2dqqfgtctmfc7mdgcfbapizpjrlroutfzilci'
export const DEFAULT_ANIMATION_URI =
  'ipfs://bafybeicpnghwsq5xyaej4hi6vuxoi4oxplll3wfhurf2v6y6kfctrtintq'
export const ONE_MB = 1024 * 1024
export const MAX_FILE_SIZE = 5 * ONE_MB

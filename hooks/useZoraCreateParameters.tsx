import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { Address, isAddress } from 'viem'
import { REFERRAL_RECIPIENT } from '@/lib/consts'
import { useAccount, usePublicClient } from 'wagmi'
import { useSearchParams } from 'next/navigation'
import getSalesConfig from '@/lib/zora/getSalesConfig'
import useCreateMetadata from '@/hooks/useCreateMetadata'
import useCreatorAddress from './useCreatorAddress'
import { useProfileProvider } from '@/providers/ProfileProvider'

const useZoraCreateParameters = (collection: Address) => {
  const publicClient = usePublicClient()
  const searchParams = useSearchParams()
  const { address } = useAccount()
  const { profile } = useProfileProvider()
  const createMetadata = useCreateMetadata()
  const creatorAddress = useCreatorAddress()
  const payoutParam = searchParams.get('payoutRecipient')

  const fetchParameters = async (chainId: number) => {
    if (!publicClient) return
    const creatorClient = createCreatorClient({ chainId, publicClient })
    const { uri: cc0MusicIpfsHash } = await createMetadata.getUri()
    if (!cc0MusicIpfsHash) return
    const connnectedProfileAddress =
      profile?.connectedZoraProfile?.address || profile?.zoraProfile?.address
    const fallbackPayoutAddress = isAddress(payoutParam) ? payoutParam : address
    const payoutRecipient = connnectedProfileAddress || fallbackPayoutAddress

    const salesConfig = getSalesConfig(
      createMetadata.isTimedSale ? 'ZoraTimedSaleStrategy' : 'ZoraFixedPriceSaleStrategy',
    )

    let newParameters
    if (collection) {
      const { parameters: existingParameters } = await creatorClient.create1155OnExistingContract({
        contractAddress: collection,
        token: {
          tokenMetadataURI: cc0MusicIpfsHash,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
          payoutRecipient,
        },
        account: creatorAddress,
      })
      newParameters = existingParameters
    } else {
      const { parameters: newContractParameters } = await creatorClient.create1155({
        contract: {
          name: createMetadata.name,
          uri: cc0MusicIpfsHash,
        },
        token: {
          tokenMetadataURI: cc0MusicIpfsHash,
          createReferral: REFERRAL_RECIPIENT,
          salesConfig,
          payoutRecipient,
        },
        account: creatorAddress,
      })
      newParameters = { ...newContractParameters, functionName: 'createContract' }
    }

    return newParameters
  }

  return { createMetadata, fetchParameters }
}

export default useZoraCreateParameters

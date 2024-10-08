import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { Address, isAddress } from 'viem'
import { REFERRAL_RECIPIENT } from '@/lib/consts'
import { useAccount, usePublicClient } from 'wagmi'
import { useSearchParams } from 'next/navigation'
import getSalesConfig from '@/lib/zora/getSalesConfig'
import useCreateMetadata from '@/hooks/useCreateMetadata'
import { useProfileProvider } from '@/providers/ProfileProvider'

const useZoraCreateParameters = (collection: Address) => {
  const publicClient = usePublicClient()
  const searchParams = useSearchParams()
  const { address } = useAccount()
  const createMetadata = useCreateMetadata()
  const payoutParam = searchParams.get('payoutRecipient')
  const defaultAdmin = searchParams.get('defaultAdmin')
  const { profile } = useProfileProvider()

  const fetchParameters = async (chainId: number) => {
    if (!publicClient) return
    const creatorClient = createCreatorClient({ chainId, publicClient })
    const { uri: cc0MusicIpfsHash } = await createMetadata.getUri()
    if (!cc0MusicIpfsHash) return
    const connnectedProfileAddress = profile?.connectedZoraProfile?.address
    const fallbackPayoutAddress = isAddress(payoutParam) ? payoutParam : address
    const fallbackAccountAddress = isAddress(defaultAdmin) ? defaultAdmin : address
    const payoutRecipient = connnectedProfileAddress || fallbackPayoutAddress
    const account = connnectedProfileAddress || fallbackAccountAddress

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
        account,
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
        account,
      })
      newParameters = { ...newContractParameters, functionName: 'createContract' }
    }

    return newParameters
  }

  return { createMetadata, fetchParameters }
}

export default useZoraCreateParameters

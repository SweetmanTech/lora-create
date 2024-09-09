import { createCreatorClient } from '@zoralabs/protocol-sdk'
import { Address } from 'viem'
import { CHAIN_ID, REFERRAL_RECIPIENT } from '@/lib/consts'
import { useEffect, useMemo, useState } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import getSalesConfig from '@/lib/zora/getSalesConfig'
import useCreateMetadata from '@/hooks/useCreateMetadata'

const useZoraCreateParameters = (chainId: number = CHAIN_ID, collection: Address) => {
  const [parameters, setParameters] = useState({})
  const publicClient = usePublicClient()
  const { address } = useAccount()
  const createMetadata = useCreateMetadata()
  const { imageUri, animationUri, mimeType, name, isTimedSale } = createMetadata
  const metadata = useMemo(
    () => ({ imageUri, animationUri, mimeType, name, isTimedSale }),
    [imageUri, animationUri, mimeType, name, isTimedSale],
  )

  useEffect(() => {
    const fetchParameters = async () => {
      if (!address) return

      const creatorClient = createCreatorClient({ chainId, publicClient })
      const { uri: cc0MusicIpfsHash } = await createMetadata.getUri()
      const salesConfig = getSalesConfig(
        createMetadata.isTimedSale ? 'ZoraTimedSaleStrategy' : 'ZoraFixedPriceSaleStrategy',
      )

      let newParameters
      if (collection) {
        const { parameters: existingParameters } = await creatorClient.create1155OnExistingContract(
          {
            contractAddress: collection,
            token: {
              tokenMetadataURI: cc0MusicIpfsHash,
              createReferral: REFERRAL_RECIPIENT,
              salesConfig,
            },
            account: address,
          },
        )
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
          },
          account: address,
        })
        newParameters = { ...newContractParameters, functionName: 'createContract' }
      }

      setParameters(newParameters)
    }

    fetchParameters()
  }, [address, chainId, collection, metadata])

  return { parameters }
}

export default useZoraCreateParameters

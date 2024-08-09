import { CHAIN, COMMENT, DROP_ADDRESS, ZORA_PRICE } from '@/lib/consts'
import { BigNumber } from '@ethersproject/bignumber'
import useConnectWallet from './useConnectWallet'
import { useAccount, useWriteContract } from 'wagmi'
import { Address } from 'viem'
import zora721Abi from '@/lib/abi/zora-erc721-drop.json'
import { toast } from 'react-toastify'
import handleTxError from '@/lib/handleTxError'

const useZoraCollect = () => {
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const { connectWallet } = useConnectWallet()

  const purchase = async () => {
    try {
      if (!address) connectWallet()
      const zoraPrice = BigNumber.from(ZORA_PRICE)
      const zoraQuantity = 1

      await writeContractAsync({
        abi: zora721Abi,
        account: address as Address,
        chain: CHAIN,
        address: DROP_ADDRESS as Address,
        functionName: 'purchaseWithComment',
        args: [BigInt(zoraQuantity), COMMENT],
        value: zoraPrice,
      })

      toast.success('Purchased!')
      return true
    } catch (error) {
      handleTxError(error)
      return { error }
    }
  }

  return {
    purchase,
  }
}

export default useZoraCollect

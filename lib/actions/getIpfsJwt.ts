import { Address } from "viem"

async function getIpfsJwt(address: Address): Promise<string | null> {
  try {
    if(!address) throw Error('address is missing')
    const res = await fetch(`/api/ipfs/generate-jwt?address=${address}`)
    const data = await res.json()
    if (!res.ok) throw Error(data?.message ?? res.statusText);

    return data.JWT as string
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getIpfsJwt
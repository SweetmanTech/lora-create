import { Address } from "viem";

async function getIsPro(address: Address) {
  try {
    const res = await fetch(`/api/profile/is-pro?address=${address}`);
    const data = await res.json();
  
    if (!res.ok) throw (data ?? { message: res.statusText });
  
    return data
  } catch (error) {
    console.log(error)
    return { isPro: false }
  }
}

export default getIsPro;

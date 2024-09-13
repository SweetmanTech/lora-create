import { Address } from "viem";
import { API_APP_URL } from "./consts";

async function getIsPro(address: Address, maxRetries = 1) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`${API_APP_URL}/api/profile?address=${address}`);
      const data = await res.json();

      if (!res.ok) throw (data ?? { message: res.statusText });

      if (data?.isPro) return data as { isPro: boolean };
    } catch (e) {
      console.error(e);
    }
  }
  return { isPro: false };
}

export default getIsPro;
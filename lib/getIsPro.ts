import { Address } from "viem";
import { API_APP_URL } from "./consts";

async function getIsPro(address: Address, retryCount = 0) {
  try {
    const res = await fetch(`${API_APP_URL}/api/profile?address=${address}`);
    const data = await res.json();

    if (!res.ok) throw (data ?? { message: res.statusText });

    const result = data as { isPro: boolean };

    if (!result.isPro && retryCount < 1) {
      return getIsPro(address, retryCount + 1);
    }

    return result;
  } catch (e) {
    console.error(e);
    return { isPro: false };
  }
}

export default getIsPro;
import { Address } from "viem";
import { API_APP_URL } from "./consts";

async function getProfile(address: Address) {
  const res = await fetch(`${API_APP_URL}/api/profile?address=${address}`);
  const data = await res.json();

  if (!res.ok) throw (data ?? { message: res.statusText });

  return {
    profile: data?.zoraProfile,
    isPro: data?.isPro,
  }
}

export default getProfile;

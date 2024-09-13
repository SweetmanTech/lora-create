import getIsPro from "@/lib/getIsPro";
import generatePinataJWT from "@/lib/ipfs/generatePinataJWT";
import { NextRequest } from "next/server"
import { isAddress } from "viem"

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address')
  if (!isAddress(address)) {
    return Response.json({ message: "address required" }, { status: 422 });
  }

  try {
    const { isPro } = await getIsPro(address)
    if (!isPro) {
      return Response.json({ message: "not on pro plan" }, { status: 403 });
    }

    const data = await generatePinataJWT();
    return Response.json(data)
  } catch (e) {
    console.log(e)
    const message = e?.message ?? 'failed to generate JWT'
    return Response.json({ message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
import { API_APP_URL } from '@/lib/consts';
import { NextRequest } from 'next/server'
import { isAddress } from 'viem';

export async function GET(req: NextRequest) {
  const addr = req.nextUrl.searchParams.get("address")

  if (!isAddress(addr)) {
    return Response.json({ message: "address required" }, { status: 422 });
  }

  const res = await fetch(`${API_APP_URL}/api/profile?address=${addr}`);
  const data = await res.json();
  if (!res.ok) return Response.json(data, { status: 500 });

  return Response.json({ isPro: data?.isPro })
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
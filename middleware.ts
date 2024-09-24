import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const referer = req.headers.get('referer')
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if ((referer && referer.includes(host)) || (origin && origin.includes(host))) {
    return NextResponse.next()
  }

  return NextResponse.json({ message: 'Unauthorized origin' }, { status: 403 })
}

export const config = {
  matcher: '/api/ipfs/generate-jwt',
}

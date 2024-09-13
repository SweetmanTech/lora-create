import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')

  if (origin !== process.env.NEXT_PUBLIC_APP_URL) {
    return NextResponse.json({ message: "Unauthorized origin" }, { status: 403 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/api/ipfs/generate-jwt',
}

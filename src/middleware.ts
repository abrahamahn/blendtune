import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  try { 
    const { supabase, response } = createClient(request);
    await supabase.auth.getSession();
    return response;
  } catch (error) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/assets|image|favicon.ico|sw.js).*)'],
}
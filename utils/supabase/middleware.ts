import { createServerClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
type responseType={
  response:NextResponse,
  supabase:SupabaseClient
}

export async function updateSession (request:NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // refreshing the auth token
  const {data:{user}}=await supabase.auth.getUser()
  if (!user) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }
   // Fetch user profile to get the role
   const role = user?.role
  //  if (role === 'authenticated' && !request.nextUrl.pathname.startsWith("/")) {
  //   return NextResponse.redirect(new URL("/", request.url))
  // }
 
  //  if (role === 'authenticated' && !request.nextUrl.pathname.startsWith("/dashboard")) {
  //    return NextResponse.redirect(new URL("/dashboard", request.url))
  //  }
  //  if (role === 'author' && !request.nextUrl.pathname.startsWith("/author")) {
  //    return NextResponse.redirect(new URL("/author", request.url))
  //  }
 

  return response
}
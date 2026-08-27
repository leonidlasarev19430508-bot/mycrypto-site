import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supportedLocales = ['uk', 'en', 'pl', 'de'] as const
type SupportedLocale = typeof supportedLocales[number]
const defaultLocale: SupportedLocale = 'uk'

// Helper to get preferred locale from Accept-Language header
function getLocaleFromAcceptLanguage(acceptLanguage: string | null): SupportedLocale | null {
  if (!acceptLanguage) return null
  
  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';')
    return code.toLowerCase()
  })
  
  // Check for exact matches first
  for (const lang of languages) {
    if (lang.startsWith('uk') || lang.startsWith('ua')) return 'uk'
    if (lang.startsWith('en')) return 'en'
    if (lang.startsWith('pl')) return 'pl'
    if (lang.startsWith('de')) return 'de'
  }
  
  return null
}

export function middleware(request: NextRequest) {
  // 1. HTTP -> HTTPS redirect (keep existing functionality)
  if (request.headers.get('x-forwarded-proto') === 'http') {
    const httpsUrl = `https://${request.headers.get('host')}${request.nextUrl.pathname}${request.nextUrl.search}`
    return NextResponse.redirect(httpsUrl, { status: 301 })
  }

  const { pathname } = request.nextUrl

  // 2. Skip API routes and static files (handled by matcher, but double-check)
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // 3. Parse locale from URL
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0] || ''
  const isLocaleSegment = supportedLocales.includes(firstSegment as SupportedLocale)
  
  let locale: SupportedLocale = defaultLocale
  let newPathname = pathname
  let shouldRedirect = false
  let redirectStatus = 301 // Permanent redirect for locale normalization

  if (isLocaleSegment) {
    // URL has a locale prefix
    locale = firstSegment as SupportedLocale
    
    if (locale === 'uk') {
      // Ukrainian locale with '/uk/' prefix - redirect to remove prefix
      shouldRedirect = true
      newPathname = '/' + pathSegments.slice(1).join('/')
    } else {
      // Other locales - keep prefix, locale is already set
      // Do nothing, pathname stays the same
    }
  } else {
    // No locale prefix - check if it's an unsupported locale (e.g., '/fr/about')
    // If first segment exists but is not a supported locale, redirect to default locale without prefix
    if (firstSegment && !supportedLocales.includes(firstSegment as SupportedLocale)) {
      shouldRedirect = true
      newPathname = '/' + pathSegments.slice(1).join('/') // Remove the unsupported prefix
      locale = defaultLocale
    } else {
      // No prefix and valid or empty - determine locale from Accept-Language for root path
      locale = defaultLocale
      
      // Only apply Accept-Language redirect for root path '/' to avoid breaking deep links
      if (pathname === '/') {
        const preferredLocale = getLocaleFromAcceptLanguage(request.headers.get('accept-language'))
        if (preferredLocale && preferredLocale !== defaultLocale) {
          shouldRedirect = true
          newPathname = `/${preferredLocale}`
          locale = preferredLocale
          redirectStatus = 302 // Temporary redirect for language detection
        }
      }
    }
  }

  // 4. Redirect if needed
  if (shouldRedirect) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = newPathname || '/'
    // Preserve query parameters
    return NextResponse.redirect(newUrl, { status: redirectStatus })
  }

  // 5. Set locale header for Server Components
  const response = NextResponse.next()
  response.headers.set('x-middleware-request-locale', locale)
  
  return response
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\..*).*)'],
}

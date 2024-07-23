import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { type NextRequest } from 'next/server'
import { connectDB } from '../lib/mongodb'

const locales = ['en', 'ru']
const privatePages = ['/profile']

const intlMiddleware = createIntlMiddleware({
	locales,
	localePrefix: 'always',
	defaultLocale: 'en'
})

const authMiddleware = withAuth(
	function onSuccess(req) {
		return intlMiddleware(req)
	},
	{
		callbacks: {
			authorized: ({ token }) => token != null
		},
		pages: {
			signIn: '/sign-in'
		}
	}
)

export default async function middleware(req: NextRequest) {
	await connectDB()
	const privatePathnameRegex = RegExp(`^(/(${locales.join('|')}))?(${privatePages.join('|')})/?$`, 'i')
	const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname)

	if (isPrivatePage) {
		return (authMiddleware as any)(req)
	} else {
		return intlMiddleware(req)
	}
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)']
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { StateProvider } from '@/app/context/StateProvider'
import { AuthProvider } from '../providers/AuthProvider'
import { EdgeStoreProvider } from '../providers/EdgeStoreProvider'
import { type ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = { title: 'Online Restaurant' }

const RootLayout = async ({ children, params }: { children: ReactNode; params: { locale: string } }) => {
	const messages = await getMessages()

	return (
		<html lang={params.locale}>
			<AuthProvider>
				<StateProvider>
					<EdgeStoreProvider>
						<NextIntlClientProvider messages={messages}>
							<body className={inter.className}>{children}</body>
						</NextIntlClientProvider>
					</EdgeStoreProvider>
				</StateProvider>
			</AuthProvider>
		</html>
	)
}

export default RootLayout

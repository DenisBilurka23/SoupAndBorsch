import Title from '@/app/components/Title'
import Layout from '@/app/[locale]/(main)/layout'
import { StateProvider } from '@/app/context/StateProvider'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { EdgeStoreProvider } from '@/app/providers/EdgeStoreProvider'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import './globals.css'
import { getMessages } from 'next-intl/server'

const Content = () => {
	const localeText = useTranslations('notFound')

	return (
		<Layout cardHidden>
			<div className="flex flex-col justify-center items-center h-[350px]">
				<Title className="flex-grow">{localeText('text')}</Title>
			</div>
		</Layout>
	)
}

const NotFound = async () => {
	const messages = await getMessages()

	return (
		<html>
			<body>
				<AuthProvider>
					<StateProvider>
						<EdgeStoreProvider>
							<NextIntlClientProvider messages={messages}>
								<Content />
							</NextIntlClientProvider>
						</EdgeStoreProvider>
					</StateProvider>
				</AuthProvider>
			</body>
		</html>
	)
}

export const dynamic = 'force-dynamic'

export default NotFound

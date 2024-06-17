'use client'

import { BsFacebook, BsInstagram } from 'react-icons/bs'
import Image from 'next/image'
import LogoImg from '../../../../public/img/torontoSizzle_transparent.png'
import MotionLink from '@/app/components/MotionLink'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

const Footer = () => {
	const localeTextFooter = useTranslations('footer')
	const localeTextNav = useTranslations('header')
	const { locale } = useParams()
	const currentLocale = Array.isArray(locale) ? locale[0] : locale || 'en'

	return (
		<div className="relative isolate overflow-hidden bg-white/75 opacity pt-14 sm:pt-14 lg:pt-8">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 lg:max-w-none lg:grid-cols-2">
					<div className="max-w-xl lg:max-w-lg">
						<Image src={LogoImg} alt="Logo" width={150} height={150} />
						<p className="mt-0 text-sm leading-8 text-gray-800">
							Toronto-based restaurant established in 2001, which seamlessly blends traditional flavors with modern
							flair to your doorsteps.
						</p>
					</div>
					<dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 pt-8">
						<div className="flex flex-col items-start">
							<dt className="my-4 font-semibold text-mild">{localeTextFooter('quickLinks')}</dt>
							<dd className="mt-0 leading-7 text-gray-400">
								<MotionLink
									whileTap={{ scale: 1.1 }}
									href={`/${currentLocale}`}
									className="text-orange-800 h-10 w-10 rounded-full flex items-center"
								>
									{localeTextNav('home')}
								</MotionLink>
							</dd>
							<dd className="mt-0 leading-7 text-gray-400">
								<MotionLink
									whileTap={{ scale: 1.1 }}
									href={`/${currentLocale}/menu`}
									className="text-orange-800 h-10 w-10 rounded-full flex items-center"
								>
									{localeTextNav('menu')}
								</MotionLink>
							</dd>
							<dd className="mt-0 leading-7 text-gray-400">
								<MotionLink
									whileTap={{ scale: 1.1 }}
									href={`/${currentLocale}/contact`}
									className="text-orange-800 h-10 w-10 rounded-full flex items-center"
								>
									{localeTextNav('contact')}
								</MotionLink>
							</dd>
							<dd className="mt-0 leading-7 text-gray-400">
								<MotionLink
									whileTap={{ scale: 1.1 }}
									href={`/${currentLocale}/delivery`}
									className="text-orange-800 h-10 w-10 rounded-full flex items-center"
								>
									{localeTextNav('delivery')}
								</MotionLink>
							</dd>
						</div>
						<div className="flex flex-col items-start">
							<dt className="my-4 font-semibold text-mild">{localeTextFooter('socialMedia')}</dt>

							<div className="flex items-center">
								<div className="rounded-md orange-700 p-1 ring-1 ring-orange-900/50 mr-4">
									<MotionLink
										whileTap={{ scale: 1.1 }}
										href="https://facebook.com"
										className="text-orange-700 h-10 w-10 rounded-full flex items-center justify-center"
									>
										<BsFacebook size={24} />
									</MotionLink>
								</div>

								<div className="rounded-md orange-700 p-1 ring-1 ring-orange-900/50">
									<MotionLink
										whileTap={{ scale: 1.1 }}
										href="https://instagram.com"
										className="text-orange-700 h-10 w-10 rounded-full flex items-center justify-center"
									>
										<BsInstagram size={24} />
									</MotionLink>
								</div>
							</div>
						</div>
					</dl>
				</div>
			</div>

			<hr className="my-4 mx-10 border-gray-100 dark:border-gray-700 lg:my-8" />

			<div className="flex flex-col items-center justify-center md:flex-row md:justify-between mx-10">
				<span className="text-sm text-orange-700 text-center dark:text-gray-400">
					© {new Date().getFullYear()} TorontoSizzle. All Rights Reserved.
				</span>
			</div>

			<div className="flex left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
				<div className="flex flex-col items-center justify-center md:flex-row md:justify-between mx-10">
					<span className="text-sm text-gray-400 text-center dark:text-gray-400">(647)123-4567</span>
				</div>

				<div className="flex flex-col items-center justify-center md:flex-row md:justify-between mx-10">
					<span className="text-sm text-gray-400 text-center dark:text-gray-400">info@torontosizzle.ca</span>
				</div>
			</div>
		</div>
	)
}

export default Footer

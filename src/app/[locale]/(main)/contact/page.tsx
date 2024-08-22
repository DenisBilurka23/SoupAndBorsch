import BannerImg from '../../../../../public/img/contact_banner.jpeg'
import Banner from '@/app/components/Banner'
import { features } from '@/app/utils/contacts'
import Map from '@/app/components/Map/IframeMap'
import { useLocale, useTranslations } from 'next-intl'

const Contact = () => {
	const text = useTranslations('contact')
	const locale = useLocale()

	return (
		<div>
			<Banner img={BannerImg} alt="banner" gradient title={text('contacts')} />
			<div className="bg-white py-10 sm:py-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:max-w-6xl lg:text-center">
						<h2 className="text-base font-semibold leading-7 text-orange-600">{text('where')}</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{text('whySelectUs')}</p>
						<div className="mt-6 text-lg leading-8 text-gray-600">
							<div className="mb-3">{text('description.healthyAndNaturalFood')}</div>
							<div className="mb-3">{text('description.likeForOurOwnFamily')}</div>
							<div className="mb-3">{text('description.wideVariety')}</div>
							<div>{text('description.convenientDelivery')}</div>
						</div>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
							{features(locale).map(feature => (
								<div key={feature.name} className="relative pl-16">
									<dt className="text-base font-semibold leading-7 text-gray-900">
										<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
											<feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
										</div>
										{feature.name}
									</dt>
									<dd className="mt-2 text-base leading-7 text-gray-600">
										{feature.linkFirst ? (
											<a href={feature.linkFirst} target="_blank">
												{feature.descriptionFirst.split(':').map((text, inx) => (
													<span key={text} {...(inx === 1 && { className: 'text-orange-600' })}>
														{text}
														{inx === 0 ? ':' : ''}
													</span>
												))}
											</a>
										) : (
											feature.descriptionFirst
										)}
									</dd>
									{feature.descriptionSecond && (
										<dd className="mt-2 text-base leading-7 text-gray-600">
											{feature.linkSecond ? (
												<a href={feature.linkSecond} target="_blank">
													{feature.descriptionSecond.split(':').map((text, inx) => (
														<span key={text} {...(inx === 1 && { className: 'text-orange-600' })}>
															{text}
															{inx === 0 ? ':' : ''}
														</span>
													))}
												</a>
											) : (
												feature.descriptionSecond
											)}
										</dd>
									)}
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
			<div className="relative w-full h-96">
				<Map />
			</div>
		</div>
	)
}

export default Contact

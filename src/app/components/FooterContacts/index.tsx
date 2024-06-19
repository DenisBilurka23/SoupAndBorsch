import Map from '@/app/components/Map'
import { features } from '@/app/utils/contacts'
import { getLocale } from 'next-intl/server'

const FooterContacts = async () => {
	const locale = await getLocale()

	return (
		<div className="w-full bg-white/75 flex justify-center px-4 md:px-6">
			<div className="w-full pt-20 max-w-2xl flex-col md:flex-row lg:max-w-7xl lg:px-8 flex -mx-4">
				<div className="md:basis-1/2 relative mx-4 h-80 md:h-auto ">
					<Map />
				</div>
				<div className="md:basis-1/2 mx-4 mt-10 md:mt-0">
					{features(locale)?.map(feature => {
						return feature.name !== 'Social Media' ? (
							<div key={feature.name} className="relative">
								<dt className="text-base font-semibold leading-7 text-gray-900">{feature.name}</dt>
								<dd className="mt-2 text-base leading-7 text-gray-600">
									{feature.linkFirst ? (
										<a href={feature.linkFirst} target="_blank">
											{feature.descriptionFirst}
										</a>
									) : (
										feature.descriptionFirst
									)}
								</dd>
								{feature.descriptionSecond && (
									<dd className="mt-2 text-base leading-7 text-gray-600">
										{feature.linkSecond ? (
											<a href={feature.linkSecond} target="_blank">
												{feature.descriptionSecond}
											</a>
										) : (
											feature.descriptionSecond
										)}
									</dd>
								)}
							</div>
						) : null
					})}
				</div>
			</div>
		</div>
	)
}

export default FooterContacts

import BannerImg from '../../../../../public/img/contact_banner.jpg'
import Banner from '@/app/components/Banner'
import { features } from '@/app/utils/contacts'
import Map from '@/app/components/Map'

const Contact = () => (
	<div>
		<Banner img={BannerImg} alt="banner" gradient title="Contacts" />
		<div className="bg-white py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:text-center">
					<h2 className="text-base font-semibold leading-7 text-orange-600">Toronto-Based</h2>
					<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Amazing Sizzles you can&apos;t miss in TO
					</p>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Established in 2001, this Toronto-based gem has been tantalizing taste buds with its exquisite Okonomi and
						Bulgogi bibimbap. Renowned for its culinary artistry, the restaurant seamlessly blends traditional flavors
						with modern flair. Embracing the digital age, it offers a seamless online ordering service, ensuring a
						delectable experience reaches your doorstep.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
						{features.map(feature => (
							<div key={feature.name} className="relative pl-16">
								<dt className="text-base font-semibold leading-7 text-gray-900">
									<div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
										<feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
									</div>
									{feature.name}
								</dt>
								<dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
								<dd className="mt-2 text-base leading-7 text-gray-600">{feature.description2}</dd>
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

export default Contact

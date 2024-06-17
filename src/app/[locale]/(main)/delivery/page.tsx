import Banner from '@/app/components/Banner'
import BannerImg from '../../../../../public/img/delivery.jpg'
import Title from '@/app/components/Title'
import { deliveryOptions } from '@/app/utils/delivery'
import Image from 'next/image'

const Delivery = () => {
	return (
		<div>
			<Banner img={BannerImg} alt="banner" title="PICKUP / ONLINE DELIVERY" />
			<Title styles="text-black text-3xl sm:text-4xl my-10">CHOOSE YOUR DELIVERY OPTION</Title>
			<div className="flex mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 py-10 sm:py-16 lg:mx-0 md:max-w-none md:grid-cols-3">
					{deliveryOptions.map(({ title, description, Img, href }) => (
						<article key={title} className="flex max-w-xl flex-col md:items-start items-center justify-between">
							<div className="relative flex items-center gap-x-4">
								<Image className="w-16 bg-gray-50" src={Img} alt="uber eats" />
							</div>
							<div className="group relative flex flex-col items-center md:items-start">
								<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
									<a href={href}>{title}</a>
								</h3>
								<p className="mt-5 line-clamp-3 leading-6 text-gray-600">{description}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	)
}

export default Delivery

import Banner from '@/app/components/Banner'
import BannerImg from '../../../../../public/img/delivery.jpg'
import Title from '@/app/components/Title'
import { deliveryOptions } from '@/app/utils/delivery'
import Image from 'next/image'
import DistanceCalculator from '@/app/components/DistanceCalculator'

const Delivery = () => {
	return (
		<div>
			<Banner img={BannerImg} alt="banner" title="PICKUP / ONLINE DELIVERY" />
			<Title styles="text-black text-3xl sm:text-4xl my-10">CHOOSE YOUR DELIVERY OPTION</Title>
			<div className="flex mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 py-10 sm:py-16 lg:mx-0 md:max-w-none md:grid-cols-3">
					<DistanceCalculator />
				</div>
			</div>
		</div>
	)
}

export default Delivery

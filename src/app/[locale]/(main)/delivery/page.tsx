import Banner from '@/app/components/Banner'
import BannerImg from '../../../../../public/img/delivery.png'
import Title from '@/app/components/Title'
import DistanceCalculator from '@/app/components/DistanceCalculator'
import { useTranslations } from 'next-intl'

const Delivery = () => {
	const localeText = useTranslations('delivery')
	return (
		<div className="w-full">
			<Banner img={BannerImg} alt="banner" title={localeText('title')} />
			<Title styles="text-black text-3xl sm:text-4xl my-10">{localeText('deliveryOptions')}</Title>
			<div className="flex mx-auto max-w-7xl px-6 lg:px-8">
				<DistanceCalculator />
			</div>
		</div>
	)
}

export default Delivery

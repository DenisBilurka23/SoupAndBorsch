import MenuSection from '@/app/components/Sections/Menu'
import { type FC } from 'react'
import Banner from '@/app/components/Banner'
import MainBanner from '../../../../public/img/banner-main.png'
import AboutUs from '@/app/components/AboutUs'
import FooterContacts from '@/app/components/FooterContacts'
import { useTranslations } from 'next-intl'

interface Props {
	searchParams: { categoryId: string; productId: string }
}

const Home: FC<Props> = ({ searchParams }) => {
	const text = useTranslations('home')

	return (
		<div className="flex w-full h-auto flex-col items-center justify-center">
			<Banner img={MainBanner} alt="banner" title={text('discoverCulinaryDelights')} />
			<AboutUs text={text} />
			<MenuSection text={text} categoryId={searchParams.categoryId} productId={searchParams.productId} baseUrl="/" />
			<FooterContacts />
		</div>
	)
}

export default Home

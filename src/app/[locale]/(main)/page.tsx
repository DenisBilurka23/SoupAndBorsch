import MenuSection from '@/app/components/Sections/Menu'
import { type FC } from 'react'
import Banner from '@/app/components/Banner'
import MainBanner from '../../../../public/img/banner-main.jpg'
import AboutUs from '@/app/components/AboutUs'
import FooterContacts from '@/app/components/FooterContacts'

interface Props {
	searchParams: { categoryId: string; productId: string }
}

const Home: FC<Props> = ({ searchParams }) => (
	<div className="flex w-full h-auto flex-col items-center justify-center">
		<Banner img={MainBanner} alt="banner" title="Discover Culinary Delights" />
		<AboutUs />
		<MenuSection categoryId={searchParams.categoryId} productId={searchParams.productId} baseUrl="/" />
		<FooterContacts />
	</div>
)

export default Home

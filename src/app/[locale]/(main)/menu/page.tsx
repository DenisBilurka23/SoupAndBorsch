import { type FC } from 'react'
import MenuSection from '@/app/components/Sections/Menu'
import Banner from '@/app/components/Banner'
import MenuBanner from '../../../../../public/img/menu-banner.png'
import { useTranslations } from 'next-intl'

interface Props {
	searchParams: { categoryId: string; productId: string }
}

const Category: FC<Props> = ({ searchParams }) => {
	const text = useTranslations('home')

	return (
		<div className="flex w-full h-auto flex-col items-center justify-center">
			<Banner img={MenuBanner} alt="banner" title={text('exploreOurDeliciousMenu')} center />
			<MenuSection
				text={text}
				categoryId={searchParams.categoryId}
				productId={searchParams.productId}
				baseUrl="/menu"
			/>
		</div>
	)
}

export default Category

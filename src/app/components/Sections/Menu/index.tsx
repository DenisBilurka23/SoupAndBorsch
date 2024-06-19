import { type FC } from 'react'
import Filters from '../../Filters'
import { Title } from '@/app/components/Sections'
import { type FoodCategory } from '../../../../../types'
import Container from '@/app/components/Container'
import { getCategory } from '@/app/api/fetch/categories'

const MenuSection: FC<{
	categoryId: string
	productId: string
	baseUrl: string
	text: (property: string) => string
}> = async ({ categoryId, productId, baseUrl, text }) => {
	const res: FoodCategory = await getCategory(categoryId)

	return (
		<section className="w-full my-5" id="menu">
			<div className="w-full flex items-center justify-center">
				<Title title={res?.category?.name ?? text('menu')} center />
			</div>
			<Filters text={text} categoryId={categoryId} baseUrl={baseUrl} />
			<Container productId={productId} categoryId={res?.category.id} />
		</section>
	)
}

export default MenuSection

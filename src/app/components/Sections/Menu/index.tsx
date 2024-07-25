import { type FC } from 'react'
import { Title } from '@/app/components/Sections'
import { type FoodCategory } from '../../../../../types'
import Container from '@/app/components/Container'
import { getCategory } from '@/app/api/fetch/categories'
import Categories from '@/app/components/Categories'
import { getLocale } from 'next-intl/server'

const MenuSection: FC<{
	categoryId: string
	productId: string
	baseUrl: string
	text: (property: string) => string
}> = async ({ categoryId, productId, baseUrl, text }) => {
	const data: FoodCategory = await getCategory(categoryId)
	const locale = await getLocale()

	return (
		<section className="w-full my-5" id="menu">
			<div className="w-full flex items-center justify-center">
				<Title title={data?.category?.name[locale] ?? text('menu')} center />
			</div>
			<Categories text={text} categoryId={categoryId} baseUrl={baseUrl} />
			<Container productId={productId} categoryId={categoryId} />
		</section>
	)
}

export default MenuSection

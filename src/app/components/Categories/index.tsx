import { type FC } from 'react'
import { getCategories } from '@/app/api/fetch/categories'
import { getLocale } from 'next-intl/server'
import CategoriesSlider from '@/app/components/Categories/CategoriesSlider'

interface Props {
	categoryId: string
	baseUrl: string
	text: (key: string) => string
}

const Categories: FC<Props> = async ({ categoryId, baseUrl, text }) => {
	const { categories } = await getCategories()
	const locale = await getLocale()
	return (
		<CategoriesSlider
			allProductsLabel={text('menu')}
			locale={locale as 'ru' | 'en'}
			categoryId={categoryId}
			baseUrl={baseUrl}
			categories={categories}
		/>
	)
}

export default Categories

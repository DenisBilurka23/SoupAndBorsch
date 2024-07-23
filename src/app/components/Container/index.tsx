import NotFound from '../NotFound'
import { type FC } from 'react'
import { getProducts } from '@/app/api/fetch/products'
import ProductItem from '@/app/components/ProductItem'
import ProductDetail from '@/app/components/ProductItem/ProductDetail'
import ProductContent from '@/app/components/ProductItem/ProductContect'
import { getLocale } from 'next-intl/server'

interface PropTypes {
	categoryId: string
	productId: string
}

const Container: FC<PropTypes> = async ({ categoryId, productId }) => {
	const { products } = await getProducts(categoryId)
	const locale = await getLocale()

	return (
		<div>
			{products && (
				<div className="mx-auto my-10 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{products.map(product => (
							<ProductItem locale={locale as 'ru' | 'en'} key={product._id} product={product} />
						))}
					</div>
				</div>
			)}
			{products.length === 0 && <NotFound text="No Food Items Available " />}
			<ProductDetail productId={productId}>
				<ProductContent locale={locale as 'ru' | 'en'} productId={productId} />
			</ProductDetail>
		</div>
	)
}

export default Container

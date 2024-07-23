import { type FC } from 'react'
import { getProduct } from '@/app/api/fetch/products'
import Image from 'next/image'
import ProductAction from '@/app/components/ProductItem/ProductAction'
import { type Product } from '../../../../types'
import { getTranslations } from 'next-intl/server'

const ProductContent: FC<{ productId: string; locale: 'ru' | 'en' }> = async ({ productId, locale }) => {
	const { product }: Product = productId ? await getProduct(productId) : {}
	const localeText = await getTranslations('product')

	const translations = {
		addToCart: localeText('addToCart'),
		priceLabel: localeText('price'),
		quantityLabel: localeText('quantity')
	}

	return (
		<div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
			<div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
				{product?.img_path && (
					<Image
						width={500}
						height={500}
						src={product.img_path}
						alt={product.name[locale]}
						className="object-cover object-center"
					/>
				)}
			</div>
			<div className="sm:col-span-8 lg:col-span-7">
				<h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.name[locale]}</h2>
				<div className="mt-6 mb-3">
					<h4 className="text-sm font-semibold leading-6 text-gray-900">{localeText('description')}</h4>
					<span>{product?.description[locale]}</span>
				</div>
				<div className="mt-6 mb-3">
					<h4 className="text-sm font-semibold leading-6 text-gray-900">{localeText('ingredients')}</h4>
					<span>{product?.ingredients[locale]}</span>
				</div>
				{product && <ProductAction localeText={translations} product={product} />}
			</div>
		</div>
	)
}

export default ProductContent

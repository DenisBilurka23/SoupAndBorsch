import Image from 'next/image'
import { type FC } from 'react'
import { type Product as ProductType } from '../../../../types'

const Product: FC<{ product: ProductType; locale: 'ru' | 'en' }> = ({ product, locale }) => {
	return (
		<>
			<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-btnOverlay xl:aspect-h-8 xl:aspect-w-7">
				{product.img_path && (
					<Image
						width={500}
						height={500}
						src={product.img_path}
						alt={product.name[locale]}
						className="h-full w-full object-cover object-center group-hover:opacity-75"
					/>
				)}
			</div>
			<h3 className="mt-4 text-sm text-gray-700">{product.name[locale]}</h3>
			<div className="flex justify-between">
				{typeof product.price === 'object' ? (
					Object.entries(product.price).map(([key, value]) => (
						<p key={value} className="mt-1 text-lg font-medium text-gray-900">
							{key.slice(0, 1).toUpperCase()}
							{key.slice(1)}: ${value}
						</p>
					))
				) : (
					<p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
				)}
			</div>
		</>
	)
}

export default Product

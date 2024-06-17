import { type FC } from 'react'
import { getProduct } from '@/app/api/fetch/products'
import Image from 'next/image'
import ProductAction from '@/app/components/ProductItem/ProductAction'

const ProductContent: FC<{ productId: string }> = async ({ productId }) => {
	const { product } = await getProduct(productId)

	return (
		<div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
			<div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
				{product?.img_path && (
					<Image
						width={500}
						height={500}
						src={product.img_path}
						alt={product.name}
						className="object-cover object-center"
					/>
				)}
			</div>
			<div className="sm:col-span-8 lg:col-span-7">
				<h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.name}</h2>
				<section aria-labelledby="information-heading" className="mt-2">
					{product?.price && <p className="text-2xl text-gray-900">${product.price}</p>}
				</section>
				<div className="mt-6 mb-3">
					<h4 className="text-sm font-semibold leading-6 text-gray-900">Description</h4>
					<span>{product?.abstract}</span>
				</div>
				<ProductAction product={product} />
			</div>
		</div>
	)
}

export default ProductContent

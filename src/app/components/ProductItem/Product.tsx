import Image from 'next/image'
import { type FC } from 'react'
import { type Product as ProductType } from '../../../../types'

const Product: FC<{ product: ProductType }> = ({ product }) => (
	<>
		<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-btnOverlay xl:aspect-h-8 xl:aspect-w-7">
			{product.img_path && (
				<Image
					width={500}
					height={500}
					src={product.img_path}
					alt={product.name}
					className="h-full w-full object-cover object-center group-hover:opacity-75"
				/>
			)}
		</div>
		<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
		<p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
	</>
)

export default Product

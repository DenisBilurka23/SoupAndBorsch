import { type FC } from 'react'

const ProductPrice: FC<{ price: number | { whole: number; slice: number } }> = ({ price }) => {
	return (
		<div className="flex justify-between">
			{typeof price === 'object' ? (
				Object.entries(price).map(([key, value]) => (
					<p key={value} className="mt-1 text-lg font-medium text-gray-900">
						{key.slice(0, 1).toUpperCase()}
						{key.slice(1)}: ${value}
					</p>
				))
			) : (
				<p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
			)}
		</div>
	)
}

export default ProductPrice

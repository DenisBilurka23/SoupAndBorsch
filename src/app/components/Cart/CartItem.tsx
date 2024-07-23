import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import { type CartProductItem } from '../../../../types'

interface PropTypes {
	product: CartProductItem
	onRemove: (id: string) => () => void
	localeText: (property: string) => string
	locale: 'ru' | 'en'
}

const CartItem: FC<PropTypes> = ({ product, onRemove, localeText, locale }) => {
	return (
		<li key={product.cartItemId} className="flex py-6">
			<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
				<Image
					width={250}
					height={250}
					src={product.img_path}
					alt={product.name[locale]}
					className="h-full w-full object-cover object-center"
				/>
			</div>

			<div className="ml-4 flex flex-1 flex-col">
				<div>
					<div className="flex justify-between text-base font-medium text-gray-900">
						<h3>
							<Link href={`?${product._id}`}>{product.name[locale]}</Link>
						</h3>
						<p className="ml-4">${product.price}</p>
					</div>
				</div>
				{product.type && (
					<div className="flex flex-1 items-end justify-between text-sm">
						<p className="text-gray-500">{localeText('type')}</p>
						{product.type && <span className="font-medium">{localeText(product.type)}</span>}
					</div>
				)}
				<div className="flex flex-1 items-end justify-between text-sm">
					<p className="text-gray-500">
						{localeText('qty')} {product.quantity}
					</p>

					<div className="flex">
						<button
							onClick={onRemove(product.cartItemId)}
							type="button"
							className="font-medium text-orange-600 hover:text-orange-500"
						>
							{localeText('remove')}
						</button>
					</div>
				</div>
			</div>
		</li>
	)
}

export default CartItem

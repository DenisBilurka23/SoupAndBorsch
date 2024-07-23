'use client'

import { type FC } from 'react'
import { type Product as ProductType } from '../../../../types'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Product from '@/app/components/ProductItem/Product'

export const ProductItem: FC<{ product: ProductType; locale: 'ru' | 'en' }> = ({ product, locale }) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const current = new URLSearchParams(Array.from(searchParams.entries()))
	current.delete('productId')
	current.set('productId', product._id.toString())

	return (
		<Link
			scroll={false}
			href={`${pathname}/?${current.toString()}`}
			key={product._id}
			className="group relative cursor-pointer"
		>
			<Product locale={locale} product={product} />
		</Link>
	)
}

export default ProductItem

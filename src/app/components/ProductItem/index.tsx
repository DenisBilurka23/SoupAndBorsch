'use client'

import { type FC } from 'react'
import { type Product as ProductType } from '../../../../types'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import Product from '@/app/components/ProductItem/Product'

export const ProductItem: FC<{ product: ProductType }> = ({ product }) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const current = new URLSearchParams(Array.from(searchParams.entries()))
	current.delete('productId')
	current.set('productId', product.id.toString())

	return (
		<Link
			scroll={false}
			href={`${pathname}/?${current.toString()}`}
			key={product.id}
			className="group relative cursor-pointer"
		>
			<Product product={product} />
		</Link>
	)
}

export default ProductItem

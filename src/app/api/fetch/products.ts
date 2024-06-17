import { type Product, type Products } from '../../../../types'
import { REQUEST } from '@/app/api/fetch/index'

export const getProducts: (categoryId: number | undefined) => Promise<Products> = async categoryId => {
	const res = await REQUEST(`api/products/${categoryId ? `?categoryId=${categoryId}` : ''}`)
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

export const getProduct: (productId: string) => Promise<Product> = async productId => {
	const res = await REQUEST(`api/products/${productId}`)
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

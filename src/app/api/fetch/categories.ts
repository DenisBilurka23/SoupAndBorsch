import { type FoodCategories, type FoodCategory } from '../../../../types'
import { REQUEST } from '@/app/api/fetch/index'

export const getCategory: (categoryId: string | undefined) => Promise<FoodCategory> = async categoryId => {
	if (!categoryId) {
		return null
	}
	const res = await REQUEST(`api/categories/${categoryId}`)
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

export const getCategories: () => Promise<FoodCategories> = async () => {
	const res = await REQUEST('api/categories')
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

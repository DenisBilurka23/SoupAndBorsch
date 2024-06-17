import { NextResponse } from 'next/server'
import { type FoodCategories } from '../../../../types'

export const categories = [
	{
		id: 1,
		name: 'Appetizers',
		img_path: '/img/categories/gyoza.jpg'
	},
	{
		id: 2,
		name: 'Soups & Noodles',
		img_path: '/img/categories/kimchi_Jjigae.png'
	},
	{
		id: 3,
		name: 'Main Courses',
		img_path: '/img/categories/bibimbap.jpg'
	},
	{
		id: 4,
		name: 'Drinks',
		img_path: '/img/categories/sake.jpg'
	}
]

export const GET: () => Promise<NextResponse<FoodCategories>> = async () => {
	const json = {
		success: true,
		msgCode: 1,
		msg: '',
		categories
	}

	return NextResponse.json(json)
}

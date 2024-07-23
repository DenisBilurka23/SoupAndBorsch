import { NextResponse } from 'next/server'
import { type FoodCategories } from '../../../../types'
import CategoryModel from '../../../../models/categoryModel'

export const GET: () => Promise<NextResponse<FoodCategories>> = async () => {
	try {
		const categories = await CategoryModel.find()

		if (!categories) {
			return NextResponse.json(
				{
					success: false,
					msgCode: 404,
					msg: 'Categories not found',
					categories: []
				},
				{ status: 404 }
			)
		}

		const json = {
			success: true,
			msgCode: 1,
			msg: '',
			categories
		}

		return NextResponse.json(json)
	} catch (error) {
		console.error('Error fetching categories:', error)
		return NextResponse.json(
			{
				success: false,
				msgCode: 500,
				msg: 'Internal Server Error',
				categories: []
			},
			{ status: 500 }
		)
	}
}

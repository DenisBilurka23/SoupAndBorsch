import { type NextRequest, NextResponse } from 'next/server'
import { type FoodCategory } from '../../../../../types'
import CategoryModel from '../../../../../models/categoryModel'
import { connectDB } from '../../../../../lib/mongodb'

type RequestType = (
	request: NextRequest,
	{
		params: { categoryId: string }
	}
) => Promise<NextResponse<FoodCategory>>

export const GET: RequestType = async (request, { params }) => {
	await connectDB()
	const categoryId = params.categoryId
	const category = await CategoryModel.findById(categoryId)

	const json = {
		success: true,
		msgCode: 1,
		msg: '',
		category
	}

	return NextResponse.json(json)
}

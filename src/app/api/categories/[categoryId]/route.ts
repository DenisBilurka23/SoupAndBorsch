import { type NextRequest, NextResponse } from 'next/server'
import { type FoodCategory } from '../../../../../types'
import { categories } from '@/app/api/categories/route'

type RequestType = (
	request: NextRequest,
	{
		params: { categoryId: string }
	}
) => Promise<NextResponse<FoodCategory>>

export const GET: RequestType = async (request, { params }) => {
	const categoryId = params.categoryId
	const category = categories.find(({ id }) => +id === +categoryId)

	const json = {
		success: true,
		msgCode: 1,
		msg: '',
		category
	}

	return NextResponse.json(json)
}

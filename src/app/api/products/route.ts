import { type NextRequest, NextResponse } from 'next/server'
import { type Products } from '../../../../types'
import ProductModel from '../../../../models/productModel'

export const GET: (request: NextRequest) => Promise<NextResponse<Products>> = async request => {
	const categoryId = request.nextUrl.searchParams.get('categoryId')
	const products = categoryId ? await ProductModel.find({ category_id: categoryId }) : await ProductModel.find()

	const json = {
		success: true,
		msgCode: 1,
		msg: '',
		products
	}

	return NextResponse.json(json)
}

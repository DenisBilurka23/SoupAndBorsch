import { type NextRequest, NextResponse } from 'next/server'
import { type ProductResponse } from '../../../../../types'
import { products } from '@/app/api/products/route'

type RequestType = (
	request: NextRequest,
	{
		params: { categoryId: string }
	}
) => Promise<NextResponse<ProductResponse>>

export const GET: RequestType = async (request, { params }) => {
	const productId = params.productId
	const product = products.find(({ id }) => id === +productId)
	const json = {
		success: true,
		msgCode: 1,
		msg: '',
		product
	}

	return NextResponse.json(json)
}

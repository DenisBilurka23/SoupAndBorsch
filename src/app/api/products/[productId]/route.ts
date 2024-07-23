import { type NextRequest, NextResponse } from 'next/server'
import { type ProductResponse } from '../../../../../types'
import ProductModel from '../../../../../models/productModel'
import { connectDB } from '../../../../../lib/mongodb'

interface Params {
	categoryId: string
	productId: string
}

type RequestType = (request: NextRequest, { params }: { params: Params }) => Promise<NextResponse<ProductResponse>>

export const GET: RequestType = async (request, { params }) => {
	const { productId } = params

	try {
		await connectDB()
		const product = await ProductModel.findById(productId)

		if (!product) {
			return NextResponse.json(
				{
					success: false,
					msgCode: 404,
					msg: 'Product not found',
					product: null
				},
				{ status: 404 }
			)
		}

		const json: ProductResponse = {
			success: true,
			msgCode: 1,
			msg: '',
			product
		}

		return NextResponse.json(json)
	} catch (error) {
		console.error('Error fetching product:', error)
		return NextResponse.json(
			{
				success: false,
				msgCode: 500,
				msg: 'Internal Server Error',
				product: null
			},
			{ status: 500 }
		)
	}
}

import { NextResponse } from 'next/server'
import { connectDB } from '../../../../lib/mongodb'
import UserModel from '../../../../models/userModel'
import { hash } from 'bcryptjs'
import { type User } from '../../../../types'

export const POST: (req) => Promise<NextResponse<User>> = async req => {
	try {
		const body = await req.json()
		await connectDB()
		const hashPassword = await hash(body.password, 10)
		const foundUser = await UserModel.findOne({ email: body.email })
		if (foundUser) {
			return NextResponse.json({ error: 'User already exists' }, { status: 400 })
		}
		const user = new UserModel({ ...body, password: hashPassword })
		await user.save()

		return NextResponse.json(user)
	} catch (error) {
		console.error('Error parsing JSON response:', error)
		return NextResponse.error()
	}
}

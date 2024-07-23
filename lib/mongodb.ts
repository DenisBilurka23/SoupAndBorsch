import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
	if (isConnected) {
		return null
	}
	try {
		await mongoose.connect(process.env.MONGODB_URL!)
		isConnected = true
		console.log('DB is connected')
	} catch (e) {
		console.log('DB connect error: ', e)
	}
}

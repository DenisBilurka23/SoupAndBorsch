// pages/api/directions.js

import { REQUEST } from '@/app/api/fetch/index'

export const getDistance: (origin: string, destination: string) => Promise<any> = async (origin, destination) => {
	try {
		const response = await REQUEST(`/api/distance/?origin=${origin}&destination=${destination}`)
		const data = await response.json()
		return data
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

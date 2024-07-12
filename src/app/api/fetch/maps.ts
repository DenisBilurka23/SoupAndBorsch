// pages/api/directions.js

import { REQUEST } from '@/app/api/fetch/index'

export interface DistanceResult {
	distance?: string
	price: number
}

export interface DistanceError {
	error: string
}

export const getDistance: (destination: string) => Promise<DistanceResult | DistanceError> = async destination => {
	try {
		const response = await REQUEST(`/api/distance/?origin=43.7745396, -79.3329574&destination=${destination}`)
		const data = await response.json()
		return data
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

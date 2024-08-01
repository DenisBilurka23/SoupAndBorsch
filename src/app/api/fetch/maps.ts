export interface DistanceResult {
	distance?: string
	price: number
}

export interface DistanceError {
	error: string
}

export const getDistance: (destination: string) => Promise<DistanceResult | DistanceError> = async destination => {
	try {
		const response = await fetch(
			`${process.env.BASE_URL}/api/distance/?origin=43.7745396, -79.3329574&destination=${destination}`
		)
		const data = await response.json()
		return data
	} catch (error) {
		throw new Error('Failed to fetch data')
	}
}

export const getCoordinates: (address: string) => Promise<{ lat: number; lng: number }> = async address => {
	try {
		const encodedAddress = encodeURIComponent(address)
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`
		)
		const data = await response.json()

		const { lat, lng } = data.results[0].geometry.location
		return { lat, lng }
	} catch (e) {
		console.error('Error fetching coordinates:')
	}
}

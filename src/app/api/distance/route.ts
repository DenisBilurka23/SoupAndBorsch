import { type NextRequest, NextResponse } from 'next/server'

const getDistance = async (origin: string, destination: string) => {
	const encodedOrigin = encodeURIComponent(origin)
	const encodedDestination = encodeURIComponent(destination)
	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${process.env.GOOGLE_MAPS_API_KEY}`

	const response = await fetch(url)
	const data = await response.json()

	if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
		const distanceText = data.rows[0].elements[0].distance.text
		const durationText = data.rows[0].elements[0].duration.text
		const distanceInMeters = data.rows[0].elements[0].distance.value
		const distanceInKm = distanceInMeters / 1000

		return { distanceText, distanceInKm, durationText }
	} else {
		throw new Error('Failed to fetch distance data')
	}
}

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url)
	const origin = searchParams.get('origin')
	const destination = searchParams.get('destination')

	if (!origin || !destination) {
		return NextResponse.json({ error: 'Origin and destination are required' }, { status: 400 })
	}

	try {
		const { distanceText, distanceInKm } = await getDistance(origin, destination)

		if (distanceInKm > 75) {
			return NextResponse.json({ error: 'Distance exceeds the maximum limit of 75 km' }, { status: 400 })
		}

		let price
		if (distanceInKm <= 10) {
			price = distanceInKm
		} else {
			price = 10 + (distanceInKm - 10) * 0.5
		}

		return NextResponse.json({ distance: distanceText, price: price.toFixed(2) }, { status: 200 })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

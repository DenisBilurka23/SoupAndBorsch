import { type NextRequest, NextResponse } from 'next/server'

const getDistance = async (origin: string, destination: string) => {
	const encodedOrigin = encodeURIComponent(origin)
	const encodedDestination = encodeURIComponent(destination)
	const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${process.env.GOOGLE_MAPS_API_KEY}`

	const response = await fetch(url)
	const data = await response.json()

	if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
		console.log('here')
		const distance = data.rows[0].elements[0].distance.text
		const duration = data.rows[0].elements[0].duration.text
		return { distance, duration }
	} else {
		console.log('there')
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
		const data = await getDistance(origin, destination)
		console.log('checkData: ', data)
		// const { distance, duration } = await getDistance(origin, destination)
		// return NextResponse.json({ distance, duration }, { status: 200 })
		return NextResponse.json(data, { status: 200 })
	} catch (error: any) {
		console.log('there checkData: ', error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

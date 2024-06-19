'use client'

import { useState } from 'react'
import { REQUEST } from '@/app/api/fetch'
import { getDistance } from '@/app/api/fetch/maps'

const DistanceCalculator = () => {
	const [origin, setOrigin] = useState('')
	const [destination, setDestination] = useState('')
	const [result, setResult] = useState<{ distance: string; duration: string } | null>(null)
	const [error, setError] = useState<string | null>(null)

	const calculateDistance = async () => {
		try {
			const response = await getDistance(origin, destination)
			console.log('response: ', response)
			setResult(response)
		} catch (error) {
			setError('An error occurred while fetching the distance data')
			setResult(null)
		}
	}

	return (
		<div>
			<h1>Distance Calculator</h1>
			<input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Enter origin address" />
			<input
				type="text"
				value={destination}
				onChange={e => setDestination(e.target.value)}
				placeholder="Enter destination address"
			/>
			<button onClick={calculateDistance}>Calculate Distance</button>
			{result && (
				<div>
					<p>Distance: {result.distance}</p>
					<p>Duration: {result.duration}</p>
				</div>
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	)
}

export default DistanceCalculator

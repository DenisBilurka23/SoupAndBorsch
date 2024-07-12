'use client'

import React, { useState } from 'react'
import { type DistanceError, type DistanceResult, getDistance } from '@/app/api/fetch/maps'
import MapComponent from '@/app/components/Map/Map'
import { useTranslations } from 'use-intl'

const DistanceCalculator = () => {
	const [destination, setDestination] = useState<{ lat: number; lng: number }>({ lat: 43.7745396, lng: -79.3329574 })
	const [result, setResult] = useState<DistanceResult | null>(null)
	const [error, setError] = useState<DistanceError | null | string>(null)
	const localeText = useTranslations('delivery')

	const calculateDistance = async () => {
		try {
			const response = await getDistance(`${destination.lat},${destination.lng}`)
			if ('error' in response && response.error) {
				return setError(response.error)
			}
			setResult(response as DistanceResult)
			setError(null)
		} catch (error) {
			setError('An error occurred while fetching the distance data')
			setResult(null)
		}
	}

	const handleMapClick = (lat: number, lng: number) => setDestination({ lat, lng })

	return (
		<div className="w-full max-w-4xl mx-auto p-4">
			<div className="bg-white p-4 rounded-lg shadow mb-4">
				<p className="mb-2">{localeText('selfPickup')}</p>
				<p className="font-semibold">55 Smooth Rose Court, Toronto, ON</p>
				<p className="mt-2">{localeText('toBeDelivered')}</p>
			</div>
			<h2 className="text-xl text-center font-semibold mb-2">{localeText('deliveryCalculator')}</h2>
			<button
				onClick={calculateDistance}
				className="mb-4 w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
			>
				{localeText('calculatePrice')}
			</button>
			{result && (
				<div className="bg-white p-4 rounded-lg shadow mb-4">
					<p>
						{localeText('distance')}: {result.distance}
					</p>
					<p className="mt-2 font-semibold">
						{localeText('price')}: ${result.price}
					</p>
				</div>
			)}
			{error && <p className="text-red-500">{error}</p>}
			<div className="mt-4">
				<MapComponent destination={destination} setDestination={handleMapClick} />
			</div>
		</div>
	)
}

export default DistanceCalculator

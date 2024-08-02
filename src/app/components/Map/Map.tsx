'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface MapComponentProps {
	destination: any
	setDestination: (lat: number, lng: number) => void
	setAddress?: (address: string) => void
}

const MapComponent: React.FC<MapComponentProps> = ({ destination, setDestination, setAddress }) => {
	const mapRef = useRef<HTMLElement | null>(null)
	const autocompleteRef = useRef<HTMLInputElement | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const loadMap = async () => {
			try {
				const loader = new Loader({
					apiKey: process.env.GOOGLE_MAPS_API_KEY!,
					version: 'weekly',
					libraries: ['places', 'geocoding']
				})

				const { Map } = await loader.importLibrary('maps')
				const { AdvancedMarkerElement, PinElement } = await loader.importLibrary('marker')
				const { Autocomplete } = await loader.importLibrary('places')
				const { Geocoder } = await loader.importLibrary('geocoding')

				const pinBackground = new PinElement({
					background: '#ea8133'
				})
				const position = destination
				const mapOptions: google.maps.MapOptions = {
					center: position,
					mapId: 'map',
					zoom: 13
				}

				const autocomplete = new Autocomplete(autocompleteRef.current!)
				const map = new Map(mapRef.current!, mapOptions)
				const marker = new AdvancedMarkerElement({
					map,
					position,
					gmpDraggable: true,
					content: pinBackground.element
				})
				const geocoder = new Geocoder()
				const updateAddress = async (lat: number, lng: number) => {
					const { results } = await geocoder.geocode({ location: { lat, lng } })
					if (results[0]) {
						const formattedAddress = results[0].formatted_address
						autocompleteRef.current!.value = formattedAddress
						if (setAddress) {
							setAddress(formattedAddress)
						}
					}
				}

				map.addListener('click', async (event: google.maps.MapMouseEvent) => {
					if (event.latLng) {
						const lat: number = event.latLng.lat()
						const lng: number = event.latLng.lng()
						setDestination(lat, lng)
						map.setCenter(event.latLng)
						marker.position = event.latLng
						await updateAddress(lat, lng)
					}
				})

				marker.addListener('dragend', async (event: google.maps.MapMouseEvent) => {
					if (event.latLng) {
						const lat: number = event.latLng.lat()
						const lng: number = event.latLng.lng()
						setDestination(lat, lng)
						map.setCenter(event.latLng)
						await updateAddress(lat, lng)
					}
				})

				autocomplete.addListener('place_changed', async () => {
					const place = autocomplete.getPlace()
					if (place.geometry?.location) {
						const lat: number = place.geometry.location.lat()
						const lng: number = place.geometry.location.lng()
						setDestination(lat, lng)
						map.setCenter(place.geometry.location)
						marker.position = place.geometry.location
						await updateAddress(lat, lng)
					}
				})

				setIsLoaded(true)
			} catch (error) {
				console.error('Error loading Google Maps: ', error)
			}
		}

		loadMap()
	}, [])

	return (
		<div>
			<input
				ref={autocompleteRef}
				type="text"
				placeholder="Search an address inside"
				className="w-full box-border border border-transparent h-8 px-3 rounded-md shadow-md outline-none text-ellipsis"
				disabled={!isLoaded}
			/>
			<div ref={mapRef as any} style={{ width: '100%', height: '400px' }} />
		</div>
	)
}

export default MapComponent

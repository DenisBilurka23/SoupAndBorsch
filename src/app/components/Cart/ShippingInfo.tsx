'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import MapComponent from '@/app/components/Map/Map'
import { useStateValue } from '@/app/context/StateProvider'
import { type FieldPath, type SubmitHandler, useForm } from 'react-hook-form'
import { type User } from '../../../../types'
import { getCoordinates, getDistance } from '@/app/api/fetch/maps'
import Tooltip from '@/app/components/Cart/Tooltip'

interface ShippingDetails {
	name: string
	phoneNumber: string
	email: string
}

interface ShippingInfoProps {
	setShipping: (shippingCost: string) => void
	localeText: (property: string) => string
	selfPickup: boolean
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({ setShipping, localeText, selfPickup }) => {
	const saveRef = useRef<HTMLDivElement | null>(null)
	const [{ user }] = useStateValue()
	const [isEdited, setIsEdited] = useState(false)
	const [destination, setDestination] = useState({ lat: 43.7745396, lng: -79.3329574 })
	const [address, setAddress] = useState('')
	const [newAddress, setNewAddress] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors }
	} = useForm<ShippingDetails>({
		defaultValues: {
			name: user?.name || '',
			phoneNumber: user?.phoneNumber || '',
			email: user?.email || ''
		}
	})
	const { email, name, phoneNumber } = getValues()

	const resetData = useCallback(() => {
		Object.entries((user || { email, name, phoneNumber }) as User).forEach(([key, value]) => {
			if (key !== 'id') {
				setValue(key as FieldPath<ShippingDetails>, value as string)
			}
		})
		if (user?.streetAddress) {
			setAddress(`${user.streetAddress}, ${user.apt || ''}, ${user.city || ''}, ${user.postalCode || ''}`)
			setNewAddress(address)
		}
	}, [setValue, user, email, name, phoneNumber])

	const handleAddressChange = (lat: number, lng: number) => setDestination({ lat, lng })

	const handleEditAddress = () => {
		if (isEdited) {
			resetData()
		}
		setIsEdited(!isEdited)
	}

	const countPrice = async (lat, lng) => {
		const { price } = await getDistance(`${lat},${lng}`)
		setShipping(price as string)
	}

	const onSubmit: SubmitHandler<ShippingDetails> = async data => {
		if (newAddress) {
			await countPrice(destination.lat, destination.lng)
			setAddress(newAddress)
		}
		setIsEdited(false)
	}

	useEffect(() => {
		if (user) {
			resetData()
		}
	}, [user, resetData])

	useEffect(() => {
		const getInitialDistance = async () => {
			if (address) {
				const coordinates = await getCoordinates(address)
				setDestination(coordinates)
				await countPrice(coordinates.lat, coordinates.lng)
			}
		}
		getInitialDistance()
	}, [address])

	return (
		<div className="w-full max-w-4xl mx-auto p-4 pb-0">
			<div className="bg-white p-4 rounded-lg shadow mb-4">
				<h2 className="text-xl text-center font-semibold mb-2">{localeText('shippingInformation')}</h2>
				{(address || name || email || phoneNumber) && (
					<>
						{!selfPickup && (
							<>
								<p className="mb-2">{localeText('shippingTo')}</p>
								<p className="font-semibold">{address}</p>
							</>
						)}
						<p className="mt-2">
							{localeText('name')}: {name}
						</p>
						<p>
							{localeText('email')}: {email}
						</p>
						<p>
							{localeText('phone')}: {phoneNumber}
						</p>
					</>
				)}
				{((!selfPickup && !address) || !name || !email || !phoneNumber || isEdited) && (
					<>
						{!selfPickup && (
							<MapComponent setAddress={setNewAddress} destination={destination} setDestination={handleAddressChange} />
						)}
						<form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
							<input
								type="text"
								name="name"
								placeholder={localeText('fullName')}
								{...register<keyof ShippingDetails>('name', { required: 'Name is required' })}
								className={`border border-gray-300 px-3 py-2 rounded-md w-full ${errors.name ? 'border-red-500' : ''}`}
							/>
							{errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
							<input
								type="text"
								name="phoneNumber"
								placeholder={localeText('phoneNumber')}
								{...register<keyof ShippingDetails>('phoneNumber', { required: 'Phone number is required' })}
								className={`border border-gray-300 px-3 py-2 rounded-md w-full ${
									errors.phoneNumber ? 'border-red-500' : ''
								}`}
							/>
							{errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
							<input
								type="email"
								name="email"
								placeholder={localeText('emailAddress')}
								{...register<keyof ShippingDetails>('email', { required: 'Email is required' })}
								className={`border border-gray-300 px-3 py-2 rounded-md w-full ${errors.email ? 'border-red-500' : ''}`}
							/>
							{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
							<button
								ref={saveRef as any}
								disabled={!newAddress && !selfPickup}
								type="submit"
								className={`${
									!newAddress && !selfPickup ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
								} w-full px-4 py-2 text-white rounded transition relative`}
							>
								{localeText('saveChanges')}
								{!newAddress && !selfPickup && <Tooltip text={localeText('selectDeliveryAddress')} ref={saveRef} />}
							</button>
						</form>
					</>
				)}
				{(address || email || phoneNumber || name) && (
					<button
						className="mt-4 px-4 w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
						onClick={handleEditAddress}
					>
						{isEdited ? localeText('usePreviousInformation') : localeText('editInformation')}
					</button>
				)}
			</div>
		</div>
	)
}

export default ShippingInfo

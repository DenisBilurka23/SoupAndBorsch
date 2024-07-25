'use client'

import { type ChangeEvent, type FC, useEffect, useState } from 'react'
import { type Product } from '../../../../types'
import { useRouter } from 'next/navigation'
import { v4 } from 'uuid'

interface PropTypes {
	product: Product
	localeText: { addToCart: string; priceLabel: string; quantityLabel: string }
}

const ProductAction: FC<PropTypes> = ({ product, localeText }) => {
	const [quantity, setQuantity] = useState<string>('1')
	const [selectedPriceOption, setSelectedPriceOption] = useState<string | null>(null)
	const [error, setError] = useState('')
	const router = useRouter()

	const quantityHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		setQuantity(e.target.value)
	}

	const handlePriceOptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSelectedPriceOption(e.target.value)
	}

	const handleCartAdd = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault()
		const quantityValue = parseInt(quantity, 10)

		if (quantityValue < 1 || quantityValue > 100) {
			setError('Please enter a valid quantity.')
			return
		}

		const existingCartItems = JSON.parse(localStorage.getItem('cart') ?? '[]')
		const existingProductIndex = existingCartItems.findIndex(
			(item: Product) => item._id === product._id && item.type === selectedPriceOption
		)
		const newProduct = {
			...product,
			quantity: quantityValue,
			cartItemId: v4(),
			price: typeof product.price === 'number' ? product.price : product.price[selectedPriceOption],
			type: selectedPriceOption
		}
		existingProductIndex !== -1
			? (existingCartItems[existingProductIndex].quantity += quantityValue)
			: existingCartItems.push(newProduct)
		localStorage.setItem('cart', JSON.stringify(existingCartItems))
		setError('')
		router.back()
		window.dispatchEvent(new Event('storage'))
	}

	useEffect(() => {
		if (typeof product.price === 'object' && selectedPriceOption === null) {
			setSelectedPriceOption(Object.keys(product.price)[0])
		}
	}, [product, selectedPriceOption])

	return (
		<form>
			{typeof product.price === 'object' ? (
				<div className="my-3">
					<label className="block text-sm font-semibold leading-6 text-gray-900">{localeText.priceLabel}</label>
					<div className="my-1 flex flex-col">
						{Object.entries(product.price).map(([type, price]) => (
							<label key={type} className="flex items-center space-x-3 cursor-pointer">
								<input
									type="radio"
									id={type}
									name="price-option"
									value={type}
									checked={selectedPriceOption === type}
									onChange={handlePriceOptionChange}
									className="h-4 w-4 text-orange-600 accent-orange-600 border-gray-300 focus:ring-orange-600"
								/>
								<span className="text-gray-900">
									{type.slice(0, 1).toUpperCase() + type.slice(1)}: ${price}
								</span>
							</label>
						))}
					</div>
				</div>
			) : (
				<p className="my-3 text-lg font-medium text-gray-900">
					{localeText.priceLabel}: ${product.price}
				</p>
			)}
			<div>
				<label htmlFor="quantity" className="block text-sm font-semibold leading-6 text-gray-900">
					{localeText.quantityLabel}
				</label>
				<div className="mt-2.5">
					<input
						onChange={quantityHandler}
						value={quantity}
						type="number"
						id="quantity"
						className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 outline-0 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
			<button
				onClick={handleCartAdd}
				className="mt-6 outline-0 flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-tr from-orange-400 to-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-gradient-to-tr hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				{localeText.addToCart}
			</button>
		</form>
	)
}

export default ProductAction

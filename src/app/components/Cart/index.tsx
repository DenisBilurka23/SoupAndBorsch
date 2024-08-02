'use client'

import Drawer from '@/app/components/Drawer'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CartItem from '@/app/components/Cart/CartItem'
import CartActions from '@/app/components/Cart/CartActions'
import { setCart, toggleCart } from '@/app/context/actionCreators'
import { useEffect, useState } from 'react'
import { type cartItems } from '../../../../types'
import { useStateValue } from '@/app/context/StateProvider'
import ShippingInfo from './ShippingInfo'
import { useLocale, useTranslations } from 'use-intl'
import OrderOptions from '@/app/components/Cart/OrderOptions'

const Cart = () => {
	const locale = useLocale() as 'ru' | 'en'
	const [{ showCart, cart }, dispatch] = useStateValue()
	const [shippingPage, setShippingPage] = useState(false)
	const [shipping, setShipping] = useState<string | number>(0)
	const paymentOptions = ['cash', 'card']
	const deliveryOptions = ['byAddress', 'selfPickup']
	const [selectedPaymentOption, setSelectedPaymentOption] = useState<string>(paymentOptions[0])
	const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string>(deliveryOptions[0])
	const localeText = useTranslations('cart')

	const handleRemoveProduct: (id: string) => () => void = id => () => {
		const inx = cart.findIndex(product => product.cartItemId === id)
		const updatedCart = cart.toSpliced(inx, 1)
		localStorage.setItem('cart', JSON.stringify(updatedCart))
		window.dispatchEvent(new Event('storage'))
	}

	const handleCloseCart = (): void => dispatch(toggleCart(false))

	useEffect(() => {
		const updateStorage = (): void => {
			const updatedCart: cartItems[] = JSON.parse(localStorage.getItem('cart'))
			dispatch(setCart(updatedCart))
		}
		window.addEventListener('storage', updateStorage)
		return () => {
			window.removeEventListener('storage', updateStorage)
		}
	}, [dispatch])

	return (
		<Drawer show={showCart} onClose={handleCloseCart}>
			<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
				{shippingPage ? (
					<>
						<ShippingInfo
							selfPickup={selectedDeliveryOption === deliveryOptions[1]}
							localeText={localeText}
							setShipping={setShipping}
						/>
						<OrderOptions
							title="paymentOptions"
							options={deliveryOptions}
							option={selectedDeliveryOption}
							setOption={setSelectedDeliveryOption}
						/>
						<OrderOptions
							title="selectPaymentOption"
							options={paymentOptions}
							option={selectedPaymentOption}
							setOption={setSelectedPaymentOption}
						/>
					</>
				) : (
					<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 relative">
						<div className="flex items-start justify-between">
							<Dialog.Title className="text-lg font-medium text-gray-900">{localeText('shoppingCart')}</Dialog.Title>
							<div className="ml-3 flex h-7 items-center">
								<button
									type="button"
									className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
									onClick={handleCloseCart}
								>
									<span className="absolute -inset-0.5" />
									<XMarkIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
						</div>
						<div className="mt-8">
							<div className="flow-root">
								<ul role="list" className="-my-6 divide-y divide-gray-200">
									{cart?.length ? (
										cart.map(product => (
											<CartItem
												locale={locale}
												localeText={localeText}
												key={product.id}
												product={product}
												onRemove={handleRemoveProduct}
											/>
										))
									) : (
										<p className="-translate-x-1/2 text-gray-500 absolute top-1/2 left-1/2">{localeText('empty')}</p>
									)}
								</ul>
							</div>
						</div>
					</div>
				)}
				<CartActions
					localeText={localeText}
					shipping={shipping}
					cart={cart}
					shippingPage={shippingPage}
					paymentOption={selectedPaymentOption}
					deliveryOption={selectedDeliveryOption}
					setShippingPage={setShippingPage}
					onClose={handleCloseCart}
				/>
			</div>
		</Drawer>
	)
}

export default Cart

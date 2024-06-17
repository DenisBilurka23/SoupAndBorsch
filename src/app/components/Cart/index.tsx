'use client'

import Drawer from '@/app/components/Drawer'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CartItem from '@/app/components/Cart/CartItem'
import CartActions from '@/app/components/Cart/CartActions'
import { setCart, toggleCart } from '@/app/context/actionCreators'
import { useEffect } from 'react'
import { type cartItems } from '../../../../types'
import { useStateValue } from '@/app/context/StateProvider'

const Cart = () => {
	const [{ showCart, cart }, dispatch] = useStateValue()

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
			window.addEventListener('storage', updateStorage)
		}
	}, [dispatch])

	return (
		<Drawer show={showCart} onClose={handleCloseCart}>
			<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 relative">
					<div className="flex items-start justify-between">
						<Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
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
									cart.map(product => <CartItem key={product.id} product={product} onRemove={handleRemoveProduct} />)
								) : (
									<p className="-translate-x-1/2 text-gray-500 absolute top-1/2 left-1/2 ">Your cart is empty</p>
								)}
							</ul>
						</div>
					</div>
				</div>
				<CartActions cart={cart} onClose={handleCloseCart} />
			</div>
		</Drawer>
	)
}

export default Cart

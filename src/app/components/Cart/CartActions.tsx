import React, { type FC, useMemo, useRef } from 'react'
import { type User } from '../../../../types'
import Tooltip from '@/app/components/Cart/Tooltip'
import { confirmCheckout } from '../../api/fetch/checkout'
import useSwitchLocale from '../../hooks/language'
import { useTranslations } from 'use-intl'
import { setCart } from '../../context/actionCreators'
import { useStateValue } from '@/app/context/StateProvider'

const CartActions: FC<{
	onClose: () => void
	shipping: string | number
	shippingPage: boolean
	setShippingPage: (val: boolean) => void
	localeText: (property: string) => string
	paymentOption: string
	deliveryOption: string
	customerInfo: User
	setLoading: (loading: boolean) => void
	setSuccessAlert: (loading: boolean) => void
	loading: boolean
}> = ({
	onClose,
	shipping,
	shippingPage,
	setShippingPage,
	localeText,
	paymentOption,
	deliveryOption,
	customerInfo,
	loading,
	setLoading,
	setSuccessAlert
}) => {
	const [{ cart }, dispatch] = useStateValue()
	const itemTotal = useMemo(() => cart.reduce((acc, product) => acc + product.price * product.quantity, 0), [cart])
	const subtotal = useMemo(
		() => (deliveryOption === 'selfPickup' ? itemTotal : itemTotal + parseFloat(shipping as string)),
		[itemTotal, shipping, deliveryOption]
	)
	const checkoutRef = useRef<HTMLDivElement | null>(null)
	const { currentLocale: lang } = useSwitchLocale()
	const text = useTranslations('cart')

	const handleCheckout = async () => {
		setLoading(true)
		const res = await confirmCheckout({
			paymentOption,
			cart,
			customerInfo,
			deliveryOption,
			shipping,
			lang,
			text: { deliveryOption: text(deliveryOption), paymentOption: text(paymentOption) }
		})
		if (res.message) {
			setSuccessAlert(true)
			setShippingPage(false)
			dispatch(setCart([]))
			localStorage.removeItem('cart')
		}
		setLoading(false)
	}

	const handleShippingPage = (toShipping: boolean) => () => setShippingPage(toShipping)

	return (
		<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
			<div className={`${shippingPage ? '' : 'font-medium'} flex justify-between text-base text-gray-900`}>
				<p>{localeText('orderTotal')}</p>
				<p>${itemTotal.toFixed(2)}</p>
			</div>
			{shippingPage && deliveryOption !== 'selfPickup' && (
				<>
					<div className="flex justify-between text-base text-gray-900 mt-2">
						<p>{localeText('shipping')}</p>
						<p>${parseFloat(shipping as string).toFixed(2)}</p>
					</div>
					<div className="font-medium flex justify-between text-base font-medium text-gray-900 mt-2">
						<p>{localeText('subtotal')}</p>
						<p>${subtotal.toFixed(2)}</p>
					</div>
				</>
			)}
			<div className="mt-6">
				<div className="mt-6">
					<button
						ref={checkoutRef as any}
						disabled={cart?.length === 0 || (shippingPage && !shipping) || loading}
						className={`relative flex items-center w-full justify-center rounded-md border border-transparent hover:from-orange-500 hover:to-orange-700 px-6 py-3 text-base font-medium text-white shadow-sm ${
							cart?.length === 0 || (shippingPage && !shipping) || loading
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-gradient-to-tr from-orange-400 to-orange-600'
						}`}
						onClick={shippingPage ? handleCheckout : handleShippingPage(true)}
					>
						{shippingPage ? localeText('placeOrder') : localeText('proceedToShipping')}
						{(cart?.length === 0 || (shippingPage && !shipping)) && (
							<Tooltip ref={checkoutRef} text={localeText(cart?.length === 0 ? 'tooltipItems' : 'tooltipAddress')} />
						)}
					</button>
				</div>
			</div>
			<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
				<p>
					{shippingPage && (
						<>
							<button
								type="button"
								className="font-medium text-orange-600 hover:text-orange-500"
								onClick={handleShippingPage(false)}
							>
								<span aria-hidden="true"> &larr;</span>
								{localeText('backToItems')}
							</button>{' '}
						</>
					)}
					or{' '}
					<button type="button" className="font-medium text-orange-600 hover:text-orange-500" onClick={onClose}>
						{localeText('continueOrdering')}
						<span aria-hidden="true"> &rarr;</span>
					</button>
				</p>
			</div>
		</div>
	)
}

export default CartActions

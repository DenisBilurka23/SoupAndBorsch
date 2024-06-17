import { type cartItem } from '../../../types'

export const fetchSessionCart = (): cartItem[] => {
	if (typeof window !== 'undefined') {
		const cartInfo = JSON.parse(localStorage.getItem('cart'))
		if (Array.isArray(cartInfo)) {
			return cartInfo
		}
	}
	return []
}

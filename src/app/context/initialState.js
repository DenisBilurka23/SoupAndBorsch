import { fetchSessionCart } from '../utils/fetchSessionData.ts'

const sessionCart = fetchSessionCart()

export const initialState = {
	user: null,
	showCart: false,
	showContactForm: false,
	cart: sessionCart,
	users: [],
	paymentMethod: 'mobile_money',
	checkoutData: {}
}

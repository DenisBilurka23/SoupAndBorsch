import { fetchSessionCart } from '../utils/fetchSessionData.ts'
import { type State } from '../../../types'

const sessionCart = fetchSessionCart()

export const initialState: State = {
	user: null,
	showCart: false,
	showContactForm: false,
	cart: sessionCart
}

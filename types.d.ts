interface Response {
	success: boolean
	msgCode: number
	msg: string
}

export interface Category {
	name: string | { en: string; ru: string }
	_id: string | number
	img_path: string
}

export interface FoodCategories extends Response {
	categories: Category[]
}

export interface FoodCategory extends Response {
	category: Category
}

export interface Product {
	_id: string
	type?: string
	name: {
		en: string
		ru: string
		_id: string
	}
	price: number | { whole: number; slice: number }
	ingredients: {
		en: string
		ru: string
		_id: string
	}
	description: {
		en: string
		ru: string
		_id: string
	}
	img_path: string
	category_id: string
}

export interface CartProductItem extends Product {
	quantity: number
	cartItemId: string
}

export interface ProductResponse extends Response {
	product: Product
}

export interface Products extends Response {
	products: Product[]
}

export interface cartItem {
	id: number
	fid: number
	uid: string
	qty: number
}

export interface cartItems {
	items: cartItem[]
}

export interface User {
	id: string
	phoneNumber: string
	email: string
	password: string
	name?: string
	fullName?: string
	streetAddress?: string
	apt?: string
	city?: string
	postalCode?: string
	createdAt: Date
	updatedAt: Date
}

export interface State {
	user: User | null
	showCart: boolean
	showContactForm: boolean
	cart: cartItem[]
}

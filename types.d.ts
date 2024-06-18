interface Response {
	success: boolean
	msgCode: number
	msg: string
}

export interface Category {
	id: number
	name: string
	img_path: string
}

export interface FoodCategories extends Response {
	categories: Category[]
}

export interface FoodCategory extends Response {
	category: Category
}

export interface Product {
	id: number
	name: string
	price: number
	abstract: string
	description: string
	product_image_path: string
	category_id: number
	category_name: string
	product_status: string
	img_path: string
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

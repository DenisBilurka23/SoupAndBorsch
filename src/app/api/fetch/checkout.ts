export const confirmCheckout = async ({ customerInfo, paymentOption, deliveryOption, cart, shipping, lang, text }) => {
	try {
		const response = await fetch(`${process.env.BASE_URL}/api/checkout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				customerInfo,
				paymentOption,
				deliveryOption,
				cart,
				shipping,
				lang,
				text
			})
		})

		if (response.ok) {
			const data = await response.json()
			return data
		} else {
			console.error('Checkout failed')
		}
	} catch (error) {
		console.error('Error during checkout:', error)
	}
}

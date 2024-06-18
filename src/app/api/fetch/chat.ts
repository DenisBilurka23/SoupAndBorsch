export const sendMessage: (text) => Promise<any> = async text => {
	try {
		const response = await fetch(`https://${process.env.CHAT_BASE_URL}/sendMessage`, {
			method: 'POST',
			body: JSON.stringify({
				chat_id: process.env.CHAT_ID,
				text
			}),
			headers: { 'Content-Type': 'application/json' }
		})
		return await response.json()
	} catch (e) {
		throw new Error('Failed to send message.')
	}
}

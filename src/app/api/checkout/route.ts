import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { sendMessage } from '../fetch/chat'

export async function POST(req: Request) {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.SMTP_EMAIL,
			pass: process.env.SMTP_PASSWORD
		}
	})
	const { customerInfo, deliveryOption, cart, shipping, lang, text } = await req.json()
	const en = lang === 'en'
	const byAddress = deliveryOption === 'byAddress'
	const price = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)

	const emailContent = `
        <html>
		  <body style="font-family: Arial, sans-serif; color: #333;">
			<h1 style="color: #ff6600;">Order Confirmation</h1>
			<p><strong>${en ? 'Payment Option' : 'Способ Оплаты'}:</strong> ${text.paymentOption}</p>
			<p><strong>${en ? 'Delivery Option' : 'Способ Доставки'}:</strong> ${text.deliveryOption}</p>
			${byAddress ? `<p><strong>${en ? 'Shipping' : 'Доставка'}:</strong> $${parseFloat(shipping).toFixed(2)}</p>` : ''}
		
			<h2 style="color: #ff6600;">${en ? 'Order Details' : 'Информация о заказе'}:</h2>
			<ul>
			  ${cart
		.map(
			(item: any) => `
				<li style="margin-bottom: 10px;">
				  <strong>${item.name[lang]}</strong>: $${item.price} x ${item.quantity}
				</li>`
		)
		.join('')}
			</ul>
		
			<p style="font-weight: bold;">
			  Total: $${byAddress ? price + parseFloat(shipping as string) : price}
			</p>
		
			<footer style="margin-top: 20px; font-size: 12px; color: #888;">
			  <p>${en ? 'Thank you for order!' : 'Спасибо за заказ!'}</p>
			</footer>
		  </body>
		</html>
    `

	const telegramMessage = `
		Order Received
		
		Name: ${customerInfo.name}
		Email: ${customerInfo.email}
		Phone: ${customerInfo.phoneNumber}
		Address: ${customerInfo.streetAddress}${customerInfo.apt ? ', Apt ' + customerInfo.apt : ''}, ${
	customerInfo.city ? customerInfo.city + ', ' : ''
}${customerInfo.postalCode ? customerInfo.postalCode : ''}
		Payment Option: ${text.paymentOption}
		Delivery Option: ${text.deliveryOption}
		
		Order Details:
		${cart.map((item: any) => `- ${item.name[lang]}: $${item.price} x ${item.quantity}`).join('\n')}
		
		${byAddress ? `Shipping: $${parseFloat(shipping).toFixed(2)}` : ''}
		Total: $${byAddress ? price + parseFloat(shipping as string) : price}
		
		${customerInfo.profilePhoto ? customerInfo.profilePhoto : ''}
	`

	const mailOptions = {
		from: process.env.SMTP_EMAIL,
		to: customerInfo.email,
		subject: 'Order Confirmation',
		html: emailContent
	}

	try {
		await transporter.sendMail(mailOptions)
		await sendMessage(telegramMessage)
		return NextResponse.json({ message: 'The order has been successfully submitted' })
	} catch (error) {
		console.error('Error sending email:', error)
		return NextResponse.json({ error: 'Error submitting order' }, { status: 500 })
	}
}

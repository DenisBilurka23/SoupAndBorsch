import EmptyCartImg from '../../../../public/img/emptyCart.svg'
import Image from 'next/image'
import { type FieldPath, type FieldPathValue, type SubmitHandler, useForm } from 'react-hook-form'
import { sendMessage } from '@/app/api/fetch/chat'
import { useStateValue } from '@/app/context/StateProvider'
import { useEffect, useState } from 'react'
import Loader from '@/app/components/Loader'
import Alert from '@/app/components/Alert'
import { type User } from '../../../../types'

interface FormInputs {
	name: string
	email: string
	subject: string
	message: string
}

const Form = () => {
	const [{ user }]: User = useStateValue()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [alertVisible, setAlertVisible] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<FormInputs>({
		defaultValues: {
			name: user?.name || '',
			email: user?.email || ''
		}
	})

	useEffect(() => {
		if (user) {
			Object.entries(user as User).forEach(([key, value]) => {
				if (key !== 'id') {
					setValue(key as FieldPath<FormInputs>, value as string)
				}
			})
		}
	}, [user, setValue])

	const submitForm: SubmitHandler<FormInputs> = async data => {
		setLoading(true)
		const { name, email, subject, message } = data
		const text = `New message from ${name} (${email}):\nSubject: ${subject || '-'}\nMessage: ${message}`
		const res = await sendMessage(text)

		if (res.ok) {
			setAlertVisible(true)
			setError(false)
			setValue('subject' as FieldPath<FormInputs>, '' as FieldPathValue<FormInputs, 'subject'>)
			setValue('message' as FieldPath<FormInputs>, '' as FieldPathValue<FormInputs, 'message'>)
		} else {
			setError(true)
		}

		setLoading(false)
	}

	return (
		<div className="h-full w-full flex items-center flex-col px-4 bg-primary">
			<Image src={EmptyCartImg} alt="Empty cart" className="w-[25%] h-[25%] sm:w-[30%] sm:h-[30%]" />
			<form
				onSubmit={handleSubmit(submitForm)}
				className="mb-6 w-full flex items-center justify-center gap-y-3 flex-col"
			>
				<div className="mb-6 w-full">
					<input
						type="text"
						className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
						placeholder="Your Name"
						{...register<keyof FormInputs>('name', { required: 'Name is required' })}
					/>
				</div>
				<div className="mb-6 w-full">
					<input
						type="email"
						className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
						placeholder="Email"
						{...register<keyof FormInputs>('email', {
							required: 'Email is required',
							pattern: {
								value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
								message: 'Email is not valid'
							}
						})}
					/>
					{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
				</div>
				<div className="mb-6 w-full">
					<input
						type="text"
						className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
						placeholder="Subject"
						{...register<keyof FormInputs>('subject')}
					/>
					{errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
				</div>
				<div className="mb-6 w-full">
					<textarea
						className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
						placeholder="Message"
						{...register<keyof FormInputs>('message', { required: 'Message is required' })}
					/>
					{errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
				</div>

				<button
					disabled={loading}
					type="submit"
					className="text-white bg-orange-600 hover:bg-orange-700 w-full focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 block"
				>
					Send Message
				</button>
				{error && <span className="text-red-500 text-sm">Failed to send message</span>}
			</form>
			<p className="mb-2 cursor-pointer text-sm text-gray-500 dark:text-gray-400">
				<a href="mailto:soupandborsch@gmail.com" className="hover:underline">
					soupandborsch@gmail.com
				</a>
			</p>
			<p className="text-sm cursor-pointer text-gray-500 dark:text-gray-400">
				<a href="tel:+1111111111" className="hover:underline">
					+111-111-11-11
				</a>
			</p>
			{loading && <Loader />}
			<Alert isVisible={alertVisible} setIsVisible={setAlertVisible} description="Message was successfully sent!" />
		</div>
	)
}

export default Form

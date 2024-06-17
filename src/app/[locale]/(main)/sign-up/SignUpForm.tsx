'use client'

import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { signUp } from '@/app/api/fetch/auth'
import { useState } from 'react'
import Loader from '@/app/components/Loader'
import { useTranslations } from 'use-intl'

interface Inputs {
	email: string
	username: string
	phoneNumber: string
	password: string
}

const SignUpForm = () => {
	const inputOptions = {
		emailLength: 10,
		usernameLength: 5,
		passwordLength: 5
	}
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>()
	const router = useRouter()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const localeText = useTranslations('auth')

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setLoading(true)
		const response = await signUp(JSON.stringify(data))
		setLoading(false)
		if (response.error) {
			return setError(response.error)
		}
		router.push('/sign-in')
	}

	return (
		<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
					{localeText('email')}
				</label>
				<div className="mt-2">
					<input
						{...register<keyof Inputs>('email', {
							required: 'Email is required',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Invalid email address'
							},
							minLength: {
								value: inputOptions.emailLength,
								message: `Email must be at least ${inputOptions.emailLength} characters long`
							}
						})}
						name="email"
						className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
							errors.email ? 'ring-red-500' : 'ring-gray-300'
						} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
					/>
					{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
				</div>
			</div>
			<div>
				<label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
					{localeText('phone')}
				</label>
				<div className="mt-2">
					<input
						{...register<keyof Inputs>('phoneNumber', {
							required: 'Phone number is required',
							minLength: {
								value: 10,
								message: 'Invalid phone number'
							}
						})}
						name="phoneNumber"
						type="tel"
						className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
							errors.phoneNumber ? 'ring-red-500' : 'ring-gray-300'
						} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
					/>
					{errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between">
					<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
						{localeText('password')}
					</label>
				</div>
				<div className="mt-2">
					<input
						{...register<keyof Inputs>('password', {
							required: 'Password is required',
							minLength: {
								value: inputOptions.passwordLength,
								message: `Password must be at least ${inputOptions.passwordLength} characters long`
							}
						})}
						name="password"
						type="password"
						className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
							errors.password ? 'ring-red-500' : 'ring-gray-300'
						} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
					/>
					{errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
				</div>
			</div>

			<div>
				<button
					disabled={loading}
					type="submit"
					className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
						loading ? 'bg-gray-400' : 'bg-mild'
					}`}
				>
					{localeText('signUp')}
				</button>
				{loading && <Loader />}
				{error && <span className="text-red-500 text-sm">{error}</span>}
			</div>
		</form>
	)
}

export default SignUpForm

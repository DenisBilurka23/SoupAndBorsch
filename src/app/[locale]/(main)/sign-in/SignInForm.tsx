'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Loader from '@/app/components/Loader'
import { useTranslations } from 'use-intl'

interface Inputs {
	email: string
	password: string
}

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>()
	const router = useRouter()
	const inputOptions = { emailLength: 10, passwordLength: 5 }
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const localeText = useTranslations('auth')

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setLoading(true)
		const res = await signIn('credentials', { ...data, redirect: false })
		setLoading(false)
		res.error ? setError('Invalid email or password') : router.push('/')
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
							minLength: {
								value: inputOptions.emailLength,
								message: `Email must be at least ${inputOptions.emailLength} characters long`
							}
						})}
						name="email"
						type="email"
						className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
							errors.email ? 'ring-red-500' : 'ring-gray-300'
						} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
					/>
					{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
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
					type="submit"
					className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
						loading ? 'bg-gray-400' : 'bg-mild'
					}`}
				>
					{localeText('signIn')}
				</button>
				{loading && <Loader />}
				{error && <span className="text-red-500 text-sm">{error}</span>}
			</div>
		</form>
	)
}

export default SignInForm

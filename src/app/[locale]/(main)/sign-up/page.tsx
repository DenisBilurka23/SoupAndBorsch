import Image from 'next/image'
import LogoImg from '../../../../../public/img/torontoSizzle_transparent.png'
import SignUpForm from '@/app/[locale]/(main)/sign-up/SignUpForm'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const SignUp = () => {
	const localeText = useTranslations('auth')

	return (
		<section className="w-full h-auto">
			<div className="container h-full px-6 py-12 lg:px-8 mx-auto">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="flex justify-center items-center">
						<Image priority={true} src={LogoImg} alt="Logo" width={100} height={100} />
					</div>
					<h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
						{localeText('createAcc')}
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<SignUpForm />
					<p className="mt-10 text-center text-sm text-gray-500">
						{`${localeText('alreadyExist')} `}
						<Link href={'/sign-in'} className="font-semibold leading-6 text-mild">
							{localeText('here')}
						</Link>
					</p>
				</div>
			</div>
		</section>
	)
}

export default SignUp

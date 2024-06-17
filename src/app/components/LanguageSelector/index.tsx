import React from 'react'
import { useRouter, useParams } from 'next/navigation'

const LanguageSwitcher = () => {
	const router = useRouter()
	const params = useParams()
	const currentLocale = params.locale || 'en'

	const switchLocale = (newLocale: string) => () => {
		const currentPath = window.location.pathname
		const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`)
		router.push(newPath)
	}

	return (
		<div className="absolute top-1/2 right-full h-auto -translate-y-1/2 flex flex-col space-y-1 mx-3">
			<button
				onClick={switchLocale('en')}
				className={`rounded !my-0 ${currentLocale === 'en' ? 'text-orange-600 font-bold' : 'text-textColor'}`}
			>
				Eng
			</button>
			<button
				onClick={switchLocale('ru')}
				className={`rounded !my-0 ${currentLocale === 'ru' ? 'text-orange-600 font-bold' : 'text-textColor'}`}
			>
				Рус
			</button>
		</div>
	)
}

export default LanguageSwitcher

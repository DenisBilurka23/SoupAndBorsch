import React from 'react'
import useSwitchLocale from '@/app/hooks/language'

const LanguageSwitcher = ({ row }) => {
	const { switchLocale, currentLocale } = useSwitchLocale()

	return (
		<div className={`h-auto mx-3 ${row ? '' : '-translate-y-1/2 flex space-y-1 absolute flex-col top-1/2 right-full'}`}>
			<button
				onClick={switchLocale('en')}
				className={`rounded mx-2 !my-0 ${currentLocale === 'en' ? 'text-orange-600 font-bold' : 'text-textColor'}`}
			>
				Eng
			</button>
			<button
				onClick={switchLocale('ru')}
				className={`rounded mx-2 !my-0 ${currentLocale === 'ru' ? 'text-orange-600 font-bold' : 'text-textColor'}`}
			>
				Рус
			</button>
		</div>
	)
}

export default LanguageSwitcher

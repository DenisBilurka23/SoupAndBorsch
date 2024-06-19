import { ChatBubbleBottomCenterTextIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { type IconType } from 'react-icons'

interface Feature {
	name: string
	descriptionFirst: string
	descriptionSecond?: string
	icon: IconType
	linkFirst?: string
	linkSecond?: string
}

export const features: (lang: string) => Feature[] = (lang = 'en') => {
	const eng = lang === 'en'

	return [
		{
			name: eng ? 'Phone Call' : 'Телефон',
			descriptionFirst: '(647)123-4567',
			icon: PhoneIcon
		},
		{
			name: eng ? 'Address' : 'Адрес',
			descriptionFirst: '55 Smooth Rose Court, Toronto, ON',
			icon: MapPinIcon
		},
		{
			name: eng ? 'Opening Hours' : 'Часы работы',
			descriptionFirst: `${eng ? 'Mon - Fri' : 'Пн - Пт'}: 10:00 - 21:00`,
			descriptionSecond: `${eng ? 'Sat - Sun' : 'Сб - Вс'}: 10:00 - 16:00`,
			icon: ClockIcon
		},
		{
			name: eng ? 'Social Media' : 'Социальные сети',
			descriptionFirst: 'Facebook: @torontoSizzle',
			descriptionSecond: 'Instagram: @julia.eats.and.treats',
			linkSecond: 'https://www.instagram.com/julia.eats.and.treats',
			icon: ChatBubbleBottomCenterTextIcon
		}
	]
}

import { ChatBubbleBottomCenterTextIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'

export const features = [
	{
		name: 'Phone Call',
		description: '(647)123-4567',
		icon: PhoneIcon
	},
	{
		name: 'Address',
		description: '290 Bremner Blvd, Toronto, ON M5V 3L9',
		icon: MapPinIcon
	},
	{
		name: 'Opening Hours',
		description: 'Mon - Fri: 10:00 - 21:00',
		description2: 'Sat - Sun: 10:00 - 16:00',
		icon: ClockIcon
	},
	{
		name: 'Social Media',
		description: 'FB: @torontoSizzle',
		description2: 'IG: @torontoSizzle',
		icon: ChatBubbleBottomCenterTextIcon
	}
]

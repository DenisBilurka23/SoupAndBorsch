'use client'

import { useStateValue } from '../../context/StateProvider'
import { toggleContactForm } from '@/app/context/actionCreators'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'

const ContactButton = () => {
	const [_, dispatch] = useStateValue()

	const handleToggleContactForm = (): void => dispatch(toggleContactForm(true))

	return (
		<button
			className="fixed right-4 bottom-4 p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50"
			onClick={handleToggleContactForm}
		>
			<IoChatboxEllipsesOutline />
		</button>
	)
}

export default ContactButton

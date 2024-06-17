'use client'

import { useStateValue } from '../../context/StateProvider'
import { toggleContactForm } from '@/app/context/actionCreators'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'

const ContactButton = () => {
	const [_, dispatch] = useStateValue()

	const handleToggleContactForm = (): void => dispatch(toggleContactForm(true))

	return (
		<button
			className="fixed right-4 bottom-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
			onClick={handleToggleContactForm}
		>
			<IoChatboxEllipsesOutline />
		</button>
	)
}

export default ContactButton

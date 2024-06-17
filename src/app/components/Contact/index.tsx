'use client'

import ContactHeader from './header'
import Form from './form'
import Drawer from '@/app/components/Drawer'
import { useStateValue } from '../../context/StateProvider'
import { toggleContactForm } from '@/app/context/actionCreators'

const Contact = () => {
	const [{ showContactForm }, dispatch] = useStateValue()
	const handleToggleContactForm = (): void => dispatch(toggleContactForm(false))

	return (
		<Drawer
			direction="left"
			show={showContactForm}
			onClose={handleToggleContactForm}
			className="w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col drop-shadow-xl"
		>
			<ContactHeader onContactClose={handleToggleContactForm} />
			<Form />
		</Drawer>
	)
}

export default Contact

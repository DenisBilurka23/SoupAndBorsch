'use client'

import { MdOutlineKeyboardBackspace, MdOutlineMessage } from 'react-icons/md'

const ContactHeader = ({ onContactClose }) => {
	return (
		<div className="w-full flex flex-row-reverse items-center bg-white justify-between px-4 py-2 cursor-pointer">
			<div onClick={onContactClose}>
				<MdOutlineKeyboardBackspace className="text-textColor text-2xl " />
			</div>

			<div className="flex items-center justify-center gap-x-2 px-2">
				<MdOutlineMessage className="text-xl cursor-pointer text-orange-600" />
				<span>CONTACT US</span>
			</div>
		</div>
	)
}

export default ContactHeader

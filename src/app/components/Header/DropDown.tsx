'use client'

import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaUserCog } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { useStateValue } from '../../context/StateProvider'
import Link from 'next/link'
import { setCart, setUser } from '../../context/actionCreators'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'use-intl'
import { useParams } from 'next/navigation'

const DropDown = ({ user, onClose, anchorRef }: { user: any; onClose: () => void }) => {
	const [_, dispatch] = useStateValue()
	const dropdownRef = useRef<HTMLDivElement | null>(null)
	const localeText = useTranslations('dropdown')
	const { locale } = useParams()
	const currentLocale = Array.isArray(locale) ? locale[0] : locale || 'en'

	const handleLogout = async () => {
		dispatch(setUser(null))
		dispatch(setCart([]))
		await signOut()
		onClose()
	}

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!anchorRef?.current?.contains(event.target)
			) {
				onClose()
			}
		},
		[anchorRef, onClose]
	)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [handleClickOutside])

	return (
		<motion.div
			ref={dropdownRef}
			initial={{ opacity: 0, scale: 0.6 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.6 }}
			className="group-hover:flex w-54 bg-gray-50 rounded-lg shadow-xl flex-col absolute right-0 top-16"
		>
			<p className="px-10 py-2 flex items-center gap-3 transition-all duration-100 capitalize ease-in-out text-base text-headingColor">
				{user.username || user.email}
			</p>
			<Link
				onClick={onClose}
				href={`/${currentLocale}/profile`}
				className="px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-headingColor"
			>
				{localeText('profile')} <FaUserCog />
			</Link>
			{/* TODO Add orders page */}
			{/* <Link */}
			{/*	onClick={onClose} */}
			{/*	href={`/${currentLocale}/orders`} */}
			{/*	className="px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-headingColor" */}
			{/* > */}
			{/*	{localeText('orders')} <FaUtensils /> */}
			{/* </Link> */}
			<p
				className="cursor-pointer px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor"
				onClick={handleLogout}
			>
				{localeText('logout')} <MdLogout />
			</p>
		</motion.div>
	)
}

export default DropDown

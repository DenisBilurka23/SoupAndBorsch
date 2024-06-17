'use client'

import Avatar from '../../../../public/img/avatar.png'
import DropDown from './DropDown'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import LoginAction from './LoginAction'
import MobileNav from './mobile-nav'
import Navigations from './Navigations'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '../../../../public/img/torontoSizzle_transparent.png'
import { setUser } from '../../context/actionCreators'
import { useSession } from 'next-auth/react'
import LanguageSelector from '@/app/components/LanguageSelector'
import { useTranslations } from 'use-intl'

const Header = () => {
	const [{ user }, dispatch] = useStateValue()
	const { data } = useSession()
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
	const [mobileNavOpen, setMobileNavOpen] = useState(false)
	const anchorRefDesktop = useRef()
	const anchorRefMobile = useRef()
	const localeText = useTranslations('header')

	const toggleMobileDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen)
	const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen)
	const toggleDropdownOpen = () => setDropdownOpen(prev => !prev)

	useEffect(() => {
		if (data?.user) {
			dispatch(setUser(data.user))
		}
	}, [data?.user, dispatch])

	return (
		<header className="w-screen fixed z-40 bg-cardOverlay backdrop-blur-md py-1 md:p-3 md:px-4 lg:py-1 lg:px-16">
			{/* Tablet and Desktop */}
			<div className="hidden md:flex w-full justify-between items-center">
				<Link href={'/'}>
					<motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 cursor-pointer">
						<Image src={LogoImg} alt="Logo" width={80} className="object-cover" />
					</motion.div>
				</Link>
				<Navigations />
				<div className="relative">
					<LanguageSelector />
					{user && (
						<div className={'group flex items-center gap-3 px-3 py-1 rounded-lg'}>
							<motion.div
								ref={anchorRefDesktop}
								onClick={toggleDropdownOpen}
								whileHover={{ scale: 1.1 }}
								className=" flex items-center justify-center"
							>
								<Image
									src={user.profilePhoto || Avatar}
									className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer object-cover"
									alt="profile"
									width={100}
									height={100}
								/>
								<p className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
									<RiArrowDropDownLine />
								</p>
							</motion.div>
							{dropdownOpen && <DropDown anchorRef={anchorRefDesktop} user={user} onClose={toggleDropdownOpen} />}
						</div>
					)}
					{!user && <LoginAction text={localeText('login')} />}
				</div>
			</div>

			{/* Mobile */}
			<motion.div
				className="flex md:hidden w-full p-0 items-center justify-between"
				initial={{ opacity: 0, x: 200 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 200 }}
			>
				{mobileNavOpen ? (
					<MobileNav isOpen={mobileNavOpen} setIsOpen={toggleMobileNav} />
				) : (
					<div className="p-5 flex items-center justify-between w-full">
						<motion.div
							whileTap={{ scale: 0.9 }}
							className=" flex items-center justify-center"
							onClick={() => setMobileNavOpen(!mobileNavOpen)}
						>
							<HiOutlineMenuAlt2 className="text-headingColor text-4xl" />
						</motion.div>
						<Link href={'/'}>
							<motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2 cursor-pointer">
								<Image src={LogoImg} alt="Logo" className="w-8 object-cover" />
								<p className="text-headingColor text-xl font-bold">TorontoSizzle</p>
							</motion.div>
						</Link>
						{user ? (
							<div className={'flex items-center gap-3 px-3 py-1 rounded-lg relative'}>
								<motion.div whileHover={{ scale: 1.1 }} className="group flex items-center justify-center">
									<Image
										src={user.profilePhoto || Avatar}
										className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl object-cover rounded-full cursor-pointer"
										alt="user-profile"
										onClick={toggleMobileDropdown}
										ref={anchorRefMobile}
										width={100}
										height={100}
									/>
									<p className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
										<RiArrowDropDownLine />
									</p>
									{mobileDropdownOpen && (
										<DropDown onClose={toggleMobileDropdown} anchorRef={anchorRefMobile} user={user} />
									)}
								</motion.div>
							</div>
						) : (
							<LoginAction mobile />
						)}
					</div>
				)}
			</motion.div>
		</header>
	)
}

export default Header

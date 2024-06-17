'use client'

import { MdOutlineRestaurantMenu, MdShoppingBasket } from 'react-icons/md'
import Logo from '../../../../public/img/torontoSizzle_transparent.png'
import { motion } from 'framer-motion'
import { useStateValue } from '../../context/StateProvider'
import Link from 'next/link'
import Image from 'next/image'
import { toggleCart } from '@/app/context/actionCreators'
import { routes } from '@/app/utils/routes'

const MobileNav = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) => {
	const [{ showCart, cartItems }, dispatch] = useStateValue()

	const handleToggleCart = (): void => {
		dispatch(toggleCart(!showCart))
	}

	return (
		<div className="flex flex-col bg-cardOverlay backdrop-blur-sm items-start justify-start gap-16 w-screen h-screen  overflow-y-hidden  z-50 overflow-hidden ">
			<motion.div className="flex items-center justify-between w-screen h-24  px-10">
				<motion.div
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					initial={{ opacity: 0, x: 200 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 200 }}
					className="relative flex items-center justify-center text-textColor"
					onClick={handleToggleCart}
				>
					<MdShoppingBasket className="text-4xl cursor-pointer" />
					{cartItems && (
						<div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
							<p className="text-sm text-white font-semibold">{cartItems.length}</p>
						</div>
					)}
				</motion.div>
				<motion.div
					whileTap={{ scale: 0.9 }}
					initial={{ opacity: 0, x: 200 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 200 }}
					className="relative flex items-center justify-center text-textColor"
					onClick={() => setIsOpen(!isOpen)}
				>
					<MdOutlineRestaurantMenu className="text-headingColor text-4xl" />
				</motion.div>
			</motion.div>
			<div className={'flex items-center justify-center w-full  h-72 gap-10 flex-col'}>
				{routes.map(({ title, link }) => (
					<Link
						key={link}
						onClick={() => setIsOpen(!isOpen)}
						href={link}
						className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10"
					>
						{title}
					</Link>
				))}
			</div>

			<Link href={'/'} onClick={() => setIsOpen(!isOpen)} className="flex items-center  justify-center w-full">
				<motion.div
					whileTap={{ scale: 0.9 }}
					whileHover={{ scale: 1.1 }}
					className="flex items-center gap-2 cursor-pointer"
				>
					<Image src={Logo} alt="Toronto Sizzle" className="w-16 object-cover" />
					<p className="text-headingColor text-3xl font-bold">TorontoSizzle</p>
				</motion.div>
			</Link>
		</div>
	)
}

export default MobileNav

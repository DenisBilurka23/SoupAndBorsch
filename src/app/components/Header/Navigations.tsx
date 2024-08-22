import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useStateValue } from '../../context/StateProvider'
import Link from 'next/link'
import { type FC, useEffect, useState } from 'react'
import { toggleCart } from '@/app/context/actionCreators'
import { useTranslations } from 'use-intl'
import { useParams } from 'next/navigation'

interface PropTypes {
	direction?: string
}

const Navigations: FC<PropTypes> = ({ direction }) => {
	const [{ cart }, dispatch] = useStateValue()
	const [cartItemsCount, setCartItemsCount] = useState<number>(0)
	const localeText = useTranslations('header')
	const { locale } = useParams()
	const currentLocale = Array.isArray(locale) ? locale[0] : locale || 'en'

	const handleOpenCart = (): void => {
		dispatch(toggleCart(true))
	}

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		setCartItemsCount(cart.length)
	}, [cart])

	return (
		<div className="flex items-center gap-8">
			<motion.ul
				initial={{ opacity: 0, x: 200 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 200 }}
				className={`flex items-center gap-8 ${direction ?? ''}`}
			>
				<motion.li
					whileHover={{ scale: 1.1 }}
					className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
				>
					<Link href={`/${currentLocale}`}>{localeText('home')}</Link>
				</motion.li>
				<motion.li
					whileHover={{ scale: 1.1 }}
					className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
				>
					<Link href={`/${currentLocale}/menu`}>{localeText('menu')}</Link>
				</motion.li>
				<motion.li
					whileHover={{ scale: 1.1 }}
					className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
				>
					<Link href={`/${currentLocale}/delivery`}>{localeText('delivery')}</Link>
				</motion.li>
				<motion.li
					whileHover={{ scale: 1.1 }}
					className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out"
				>
					<Link href={`/${currentLocale}/contact`}>{localeText('contacts')}</Link>
				</motion.li>
				<motion.li
					onClick={handleOpenCart}
					whileHover={{ scale: 1.1 }}
					className="md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out relative flex items-center justify-center text-textColor"
				>
					<MdShoppingBasket className="text-2xl cursor-pointer" />
					{cartItemsCount > 0 && (
						<div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center cursor-pointer">
							<p className="text-sm text-white font-semibold">{cartItemsCount}</p>
						</div>
					)}
				</motion.li>
			</motion.ul>
		</div>
	)
}

export default Navigations

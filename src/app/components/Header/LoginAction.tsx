import { MdLogin } from 'react-icons/md'
import { motion } from 'framer-motion'
import Link from 'next/link'

const LoginAction = ({ text, mobile }: { text?: string; mobile?: boolean }) => {
	return (
		<Link href="/sign-in">
			<motion.div
				className={'flex items-center gap-3 border border-slate-200 px-3 py-1 rounded-lg cursor-pointer'}
				whileTap={{ scale: 0.8 }}
				whileHover={{ scale: 1.1 }}
			>
				<MdLogin className={` ${mobile && 'text-2xl text-headingColor'}`} />
				{text && <p className="text-headingColor ">{text}</p>}
			</motion.div>
		</Link>
	)
}

export default LoginAction

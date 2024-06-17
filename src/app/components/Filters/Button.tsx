import { type Category } from '../../../../types'
import { type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Button: FC<{ category: Category; categoryId: string; url?: string }> = ({ categoryId, category, url }) => {
	return (
		<Link
			scroll={false}
			href={url ?? `?categoryId=${category.id}`}
			whileTap={{ scale: 1.1 }}
			className={`group ${
				category.id === +categoryId
					? 'hover:bg-btnOverlay bg-gradient-to-tr from-orange-400 to-orange-600'
					: 'bg-btnOverlay hover:bg-gradient-to-tr from-orange-400 to-orange-600'
			} min-w-36 h-36 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all  ease-out`}
		>
			<div
				className={`w-20 h-20 rounded-full ${
					category.id === +categoryId
						? 'group-hover:bg-cartNumBg bg-btnOverlay'
						: 'bg-cartNumBg bg-white group-hover:bg-btnOverlay'
				}  flex items-center justify-center`}
			>
				<span
					className={`${
						category.id === +categoryId
							? 'text-textColor group-hover:text-btnOverlay'
							: 'group-hover:text-textColor text-btnOverlay'
					} text-lg`}
				>
					<Image width={100} height={100} src={category.img_path} alt="Category image" className="rounded-full" />
				</span>
			</div>
			<p
				className={`text-base ${
					category.id === +categoryId
						? 'group-hover:text-textColor text-white'
						: 'text-textColor group-hover:text-white'
				} `}
			>
				{category.name}
			</p>
		</Link>
	)
}

export default Button

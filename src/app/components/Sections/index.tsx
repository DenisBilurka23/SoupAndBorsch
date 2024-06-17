import { type FC } from 'react'

export const Title: FC<{ title: string; center?: boolean }> = ({ title, center }) => {
	return (
		<p
			className={`text-2xl text-headingColor font-semi-bold capitalize relative before:absolute before:rounded before:content before:w-32 before:h-1 before:-bottom-2 ${
				center ? 'before:left-1/2 before:-translate-x-1/2' : 'before:left-0'
			} before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100`}
		>
			{title}
		</p>
	)
}

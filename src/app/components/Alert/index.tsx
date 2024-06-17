'use client'

import { useRef, useEffect, type FC } from 'react'

interface PropTypes {
	isVisible: boolean
	setIsVisible: (isVisible: boolean) => void
	title?: string
	description?: string
}

const Alert: FC<PropTypes> = ({ isVisible, setIsVisible, title, description }) => {
	const alertRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
		}, 3000)

		return () => clearTimeout(timer)
	}, [setIsVisible, isVisible])

	const handleTransitionEnd = () => {
		if (!isVisible) {
			setIsVisible(false)
		}
	}

	return (
		<div
			ref={alertRef}
			className={`z-50 fixed left-1/2 transform -translate-x-1/2 bottom-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md transition-all duration-1000 ${
				isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
			onTransitionEnd={handleTransitionEnd}
		>
			<div className="flex items-center">
				<div className="mr-4">
					<svg className="fill-current h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
					</svg>
				</div>
				<div>
					{title && <p className="font-bold">{title}</p>}
					{description && <p className="text-sm">{description}</p>}
				</div>
			</div>
		</div>
	)
}

export default Alert

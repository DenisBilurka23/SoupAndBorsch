import { type FunctionComponent } from 'react'
import Image, { type StaticImageData } from 'next/image'
import Title from '@/app/components/Title'

interface propTypes {
	img: StaticImageData
	alt: string
	title: string
	gradient?: boolean
	center?: boolean
}

const Banner: FunctionComponent<propTypes> = ({ img, alt, title, gradient, center }) => (
	<div className="relative w-full isolate overflow-hidden bg-gray-900 h-vh-30 sm:h-vh-1/2 lg:h-vh-70">
		<Image
			src={img}
			alt={alt}
			className={`absolute inset-0 -z-10 h-full w-full object-cover object-${center ? 'center' : 'bottom'}`}
		/>
		{gradient ? (
			<>
				<div
					className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
					aria-hidden="true"
				>
					<div
						className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
						}}
					/>
				</div>
				<div
					className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
					aria-hidden="true"
				>
					<div
						className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
						}}
					/>
				</div>
			</>
		) : (
			<div className="absolute right-0 left-0 top-0 bottom-0 bg-black opacity-20" />
		)}
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Title styles="text-4xl sm:text-6xl text-white">{title}</Title>
		</div>
	</div>
)

export default Banner

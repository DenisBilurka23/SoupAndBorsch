import Image from 'next/image'
import MainFeatureProd from '../../../../public/img/main-feature-prod.jpg'
import SubFeatureProd from '../../../../public/img/sub-feature-prod.jpg'

const AboutUs = ({ text }) => (
	<div className="mx-auto mt-20 mb-20 lg:mb-36 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 flex">
		<div className="flex relative justify-center justify-between w-full">
			<div className="hidden lg:block basis-2/5 mx-8">
				<div className="rounded-lg">
					<Image
						height={500}
						width={500}
						src={MainFeatureProd}
						alt="product"
						className="rounded-lg h-96 object-cover object-center"
					/>
				</div>
				<div className="rounded-lg absolute -left-0 top-72">
					<Image
						height={500}
						width={500}
						src={SubFeatureProd}
						alt="product"
						className="w-80 rounded-lg object-cover object-center"
					/>
				</div>
			</div>
			<div className="lg:basis-3/5 lg:mx-8">
				<h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 sm:text-4xl">{text('title')}</h1>
				<p className="mt-4 text-xl text-gray-500">{text('about')}</p>
			</div>
		</div>
	</div>
)

export default AboutUs

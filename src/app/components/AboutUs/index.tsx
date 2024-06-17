import Image from 'next/image'
import MainFeatureProd from '../../../../public/img/main-feature-prod.jpg'
import SubFeatureProd from '../../../../public/img/sub-feature-prod.jpg'

const AboutUs = () => (
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
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 sm:text-6xl">
					Elevating Your Dining Experience Since 2001
				</h1>
				<p className="mt-4 text-xl text-gray-500">
					Welcome to TorontoSizzle. Immerse yourself in a culinary journey featuring Okonomi and Bulgogi bibimbap, a
					perfect fusion of traditional flavors with a contemporary twist. Enjoy the convenience of online ordering,
					bringing our exquisite dishes directly to your doorstep. Join us for a dining experience that combines warm
					hospitality, culinary artistry, and a modern approach to traditional cuisine. TorontoSizzle invites you to
					savor the rich tapestry of flavors – where each bite narrates a delightful story of culinary excellence.
				</p>
			</div>
		</div>
	</div>
)

export default AboutUs

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
				<h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6 sm:text-4xl">
					Домашняя восточно-европейская кухня с доставкой на дом в Торонто!
				</h1>
				<p className="mt-4 text-xl text-gray-500">
					Добро пожаловать в "Soup & Borsch". Мы предлагаем вкусные и полезные восточно-европейские блюда с доставкой
					прямо к вашему порогу. Вдохновляясь традициями и рецептами наших бабушек, мы готовим все блюда с любовью и
					заботой, используя только свежие и натуральные ингредиенты. В нашем меню вы найдете ароматные супы, борщи,
					пирожки, вареники и многое другое – все, как для своих близких. Моя цель – подарить вам вкус домашней кухни,
					создавая уют и тепло в каждом блюде. Присоединяйтесь к нашему кулинарному путешествию и наслаждайтесь вкусами
					Восточной Европы у себя дома!
				</p>
			</div>
		</div>
	</div>
)

export default AboutUs

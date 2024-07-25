'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import Category from './Category'
import { type Category as CategoryType } from '../../../../types'
import { type FC } from 'react'
import LogoImg from '../../../../public/img/torontoSizzle_transparent.png'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import { Mousewheel, Navigation } from 'swiper/modules'

interface Props {
	categoryId: string
	baseUrl: string
	allProductsLabel: string
	categories: CategoryType[]
	locale: 'en' | 'ru'
}

const CategoriesSlider: FC<Props> = ({ categoryId, baseUrl, categories, locale, allProductsLabel }) => {
	return (
		<div className="flex items-center md:justify-center">
			<Swiper
				slidesPerView={'auto'}
				freeMode={true}
				navigation={true}
				mousewheel={{
					sensitivity: 4,
					releaseOnEdges: true
				}}
				slidesPerGroup={2}
				modules={[Mousewheel, Navigation]}
			>
				<SwiperSlide style={{ width: 'auto' }}>
					<div className="py-1 px-2">
						<Category
							categoryId={categoryId}
							category={{
								_id: '0',
								name: allProductsLabel,
								img_path: LogoImg
							}}
							url={baseUrl}
						/>
					</div>
				</SwiperSlide>
				{categories?.map((category: CategoryType) => (
					<SwiperSlide style={{ width: 'auto' }} key={category._id}>
						<div className="py-1 px-2">
							<Category categoryId={categoryId} category={category} locale={locale} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default CategoriesSlider

import { useTranslations } from 'use-intl'
import { type ChangeEvent, type FC } from 'react'

interface OrderOptionsProps {
	options: string[]
	option: string
	setOption: (option: string) => void
}

const OrderOptions: FC<OrderOptionsProps> = ({ option, setOption, options, title }) => {
	const localeText = useTranslations('cart')

	const handlePaymentOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setOption(value)
	}

	return (
		<div className="w-full max-w-4xl mx-auto px-4">
			<div className="bg-white p-4 rounded-lg shadow mb-4">
				<h3 className="text-lg text-center font-semibold mb-2">{localeText(title)}</h3>
				<div className="flex flex-col space-y-2">
					{options.map(type => (
						<label key={type} className="flex items-center space-x-3 cursor-pointer">
							<input
								type="radio"
								id={type}
								name={title}
								value={type}
								checked={option === type}
								onChange={handlePaymentOptionChange}
								className="h-4 w-4 text-orange-600 accent-orange-600 border-gray-300 focus:ring-orange-600"
							/>
							<span className="text-gray-900">{localeText(type)}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	)
}

export default OrderOptions

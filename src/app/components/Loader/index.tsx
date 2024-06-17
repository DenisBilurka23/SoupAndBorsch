'use client'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => (
	<ColorRing
		visible={true}
		height="85"
		width="85"
		ariaLabel="color-ring-loading"
		wrapperStyle={{ position: 'fixed', bottom: '50%', left: '50%', transform: 'translate(-50%, 50%)', zIndex: 100 }}
		wrapperClass="color-ring-wrapper"
		colors={['rgb(234 88 12', 'rgb(234 88 12', 'rgb(234 88 12', 'rgb(234 88 12', 'rgb(234 88 12']}
	/>
)

export default Loader

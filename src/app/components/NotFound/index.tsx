import NotFoundImg from '../../../../public/img/NotFound.svg'
import Image from 'next/image'

const NotFound = ({ text }: { text: string }) => {
	return (
		<div className="w-full p-5 flex flex-col items-center gap-4 justify-center">
			<Image className="h-[340px]" src={NotFoundImg} alt="Not Found" />
			<p className="text-textColor  font-semibold">{text}</p>
		</div>
	)
}

export default NotFound

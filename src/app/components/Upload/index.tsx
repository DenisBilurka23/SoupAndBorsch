import { MdCloudUpload } from 'react-icons/md'
import { type FC } from 'react'

interface PropTypes {
	name: string
	register: any
}

const AssetUploader: FC<PropTypes> = ({ register, name }) => {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<label className="flex flex-col justify-center items-center w-full h-full rounded-lg cursor-pointer">
				<div className="flex flex-col justify-center items-center pt-5 pb-6 gap-2">
					<MdCloudUpload className="text-gray-500 text-3xl " />
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click here to upload</span>
					</p>
					<p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG (MAX 3MB)</p>
				</div>
				<input name={name} type="file" className="hidden" {...register<keyof any>(name)} />
			</label>
		</div>
	)
}

export default AssetUploader

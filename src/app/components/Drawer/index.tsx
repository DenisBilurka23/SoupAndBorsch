import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Drawer = ({ direction, children, show, onClose }) => (
	<Transition.Root show={show} as={Fragment}>
		<Dialog as="div" className="relative z-50" onClose={onClose}>
			<Transition.Child
				as={Fragment}
				enter="ease-in-out duration-500"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in-out duration-500"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</Transition.Child>

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div
						className={`pointer-events-none fixed inset-y-0 
							${direction === 'left' ? 'left-0 pr-10' : 'right-0 pl-10'} flex max-w-full`}
					>
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom={`${direction === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo={`${direction === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
						>
							<Dialog.Panel className="pointer-events-auto w-screen max-w-md">{children}</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</div>
		</Dialog>
	</Transition.Root>
)

export default Drawer

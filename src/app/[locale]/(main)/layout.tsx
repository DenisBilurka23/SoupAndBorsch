import Contact from '@/app/components/Contact'
import { type FC, type ReactNode } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Cart from '@/app/components/Cart'
import ContactButton from '@/app/components/ContactButton'

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => (
	<>
		<div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
			<Cart />
			<Contact />
			<Header />
			<main className="mt-16 md:mt-16 md:px-0 pt-6 py-0 w-full h-auto">
				{children}
				<Footer />
			</main>
			<ContactButton />
		</div>
	</>
)

export default MainLayout

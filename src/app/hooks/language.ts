import { useRouter, useParams } from 'next/navigation'

const useSwitchLocale = () => {
	const router = useRouter()
	const params = useParams()
	const currentLocale = params.locale || 'en'

	const switchLocale = (newLocale: string) => () => {
		const currentPath = window.location.pathname
		const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`)
		router.push(newPath)
	}

	return { switchLocale, currentLocale }
}

export default useSwitchLocale

import { REQUEST } from '@/app/api/fetch/index'
import { type User } from '../../../../types'

export const signUp: (payload) => Promise<any> = async payload => {
	const response = await REQUEST('api/auth', payload, { method: 'POST' })
	const data: User = await response.json()
	return data
}

export const userUpdate: (payload) => Promise<any> = async payload => {
	const response = await REQUEST('api/user/update', payload, { method: 'PUT' })
	const data: User = await response.json()
	return data
}

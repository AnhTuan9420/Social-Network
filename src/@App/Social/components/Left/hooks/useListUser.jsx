import { userService } from '@App/Social/services/userService'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

export const useListUser = () => {

	const {
		data: listUser,
		run: getListUser,
		loading: loadingListUser
	} = useRequest(userService.getListUser, {
		manual: true
	})

	useEffect(() => {
		getListUser()
	}, [])

	return {
		listUser,
		getListUser,
		loadingListUser,
	}
}

import React, { useEffect } from 'react'
import { useRequest } from 'ahooks'
import ListFavoriteContent from './ListFavoriteContent'
import { facilityService } from '@App/Social/services/facilityService'

const ListFavorite = props => {
	const {
		data: listLike,
		runAsync: getListLike,
		loading: loadingListLike,
		refresh
	} = useRequest(facilityService.getListLike, {
		manual: true
	})

	return <ListFavoriteContent refresh={refresh} loadingListLike={loadingListLike} listLike={listLike} getListLike={getListLike} />
}

export default React.memo(ListFavorite)

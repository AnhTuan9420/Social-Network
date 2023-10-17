import React, { useEffect } from 'react'
import { useRequest } from 'ahooks'
import ListFavoriteContent from './ListFavoriteContent'
import { postService } from '@App/Social/services/postService'

const ListFavorite = props => {
	const {
		data: listLike,
		runAsync: getListLike,
		loading: loadingListLike,
		refresh
	} = useRequest(postService.getListLike, {
		manual: true
	})

	return <ListFavoriteContent refresh={refresh} loadingListLike={loadingListLike} listLike={listLike} getListLike={getListLike} />
}

export default React.memo(ListFavorite)

import { postService } from '@App/Social/services/postService'
import { useRequest } from 'ahooks'
import React from 'react'
import ListFavoriteContent from './ListFavoriteContent'

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

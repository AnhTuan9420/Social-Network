import React, { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { postService } from '@App/Social/services/postService'
import FacilityList from './FacilityList'

const HomePage = props => {

	const {
		data: posts,
		run: getPost,
		loading: loadingPost,
		refresh: refreshListPost
	} = useRequest(postService.getListPost, {
		manual: true
	})

	return <FacilityList posts={posts} getPost={getPost} loadingPost={loadingPost} refreshListPost={refreshListPost}/>
}

export default React.memo(HomePage)

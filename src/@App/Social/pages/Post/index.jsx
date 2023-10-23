import { postService } from '@App/Social/services/postService'
import { useRequest } from 'ahooks'
import React from 'react'
import FacilityList from './PostList'

const Post = props => {

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

export default React.memo(Post)

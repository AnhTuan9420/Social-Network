import React, { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { facilityService } from '@App/Social/services/facilityService'
import FacilityList from './FacilityList'

const HomePage = props => {

	const {
		data: posts,
		run: getPost,
		loading: loadingPost
	} = useRequest(facilityService.getListPost, {
		manual: true
	})

	return <FacilityList posts={posts} getPost={getPost} loadingPost={loadingPost}/>
}

export default React.memo(HomePage)

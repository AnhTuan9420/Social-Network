import { authService } from '@App/Social/services/authService'
import { facilityService } from '@App/Social/services/facilityService'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { setDataSession } from '@Core/helper/Session'

export const usePostDetail = initDate => {
	const navigate = useNavigate()
	let [searchParams] = useSearchParams()
	const postId = searchParams.get('facility_id')

	const {
		data: postDetail,
		run: getPostDetail,
		loading: loadingPostDetail
	} = useRequest(facilityService.postDetail, {
		manual: true
	})

	useEffect(() => {
		if (postId) {
			getPostDetail(postId)
		}
	}, [postId])


	return {
		postDetail,
		getPostDetail,
		loadingPostDetail
	}
}

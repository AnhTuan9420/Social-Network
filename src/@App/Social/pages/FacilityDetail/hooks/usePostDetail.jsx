import { postService } from '@App/Social/services/postService'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const usePostDetail = initDate => {
	const navigate = useNavigate()
	let [searchParams] = useSearchParams()
	const postId = searchParams.get('facility_id')

	const {
		data: postDetail,
		run: getPostDetail,
		loading: loadingPostDetail
	} = useRequest(postService.postDetail, {
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
		loadingPostDetail,
	}
}

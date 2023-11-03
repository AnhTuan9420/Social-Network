import imagefail from '@App/Social/assets/imagefail.svg'
import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { postService } from '@App/Social/services/postService'
import { timeAgo } from '@Core/helper/Date'
import { getSocialUser } from '@Core/helper/Session'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useRequest } from 'ahooks'
import Image from 'mui-image'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteCommentModal } from '../Post/hooks/useDeleteCommentModal'
import { useImageModal } from './hooks/useImageModal'
import { usePostDetail } from './hooks/usePostDetail'
import { useShareModal } from './hooks/useShareModal'

const getUrlMap = google_map_url => {
	const urlStartIndex = google_map_url?.indexOf('src="') + 5
	const urlEndIndex = google_map_url?.indexOf('"', urlStartIndex)
	const url = google_map_url?.substring(urlStartIndex, urlEndIndex)
	return url
}

const PostDetail = props => {
	const { postDetail, loadingPostDetail } = usePostDetail()
	const navigate = useNavigate()
	const user = getSocialUser()
	const { onOpen, render } = useImageModal()
	const { onOpenShare, renderShare } = useShareModal()

	const [isFavorited, setIsFavorited] = useState(false)
	const [comment, setComment] = useState('')

	const { data: apiHasLike, run: getFavorite } = useRequest(postService.checkUserLike, {
		manual: true
	})

	const {
		data: listComment,
		run: getComment,
		loading: loadingComment
	} = useRequest(postService.listComment, {
		manual: true
	})

	const {
		data: totalLike,
		run: getTotalLike,
		loading: loadingTotalLike
	} = useRequest(postService.totalLike, {
		manual: true
	})

	useEffect(() => {
		const params = {
			postId: postDetail?.id,
			sortBy: 'createdAt:desc'
		}
		getComment(params)
		getTotalLike(postDetail?.id)
	}, [postDetail?.id])

	const { onOpenDeleteComment, renderDeleteComment } = useDeleteCommentModal(getComment)

	useEffect(() => {
		getFavorite(postDetail?.id)
	}, [postDetail?.id, isFavorited])

	useEffect(() => {
		if (apiHasLike?.id) {
			setIsFavorited(true)
		}
	}, [apiHasLike?.id])

	const handleLikeFacility = async () => {
		const dataSubmit = {
			postId: postDetail?.id
		}
		await postService.like(dataSubmit)
		setIsFavorited(true)
		getTotalLike(postDetail?.id)
	}

	const handleUnLikeFacility = async () => {
		await postService.unLike(apiHasLike?.id)
		setIsFavorited(false)
		getTotalLike(postDetail?.id)
	}


	const handleComment = async () => {
		const dataSubmit = {
			content: comment,
			postId: postDetail?.id
		}
		const res = await postService.comment(dataSubmit)
		if (res) {
			const params = {
				postId: postDetail?.id,
				sortBy: 'createdAt:desc'
			}
			setComment('')
			getComment(params)
		}
	}

	return (
		<EventContentPage
			maxWidth={1}
			hasBreadcrumb={false}
			content={
				<Box className="sm:pt-[20px] sm:pb-[56px] pb-[80px] w-full">
					{loadingPostDetail ? (
						<div className="my-[40%] flex justify-center items-center">
							<CircularProgress />
						</div>
					) : (
						<Box>
							<Box className="flex flex-wrap sm:flex-nowrap gap-10">
								<Box className="w-full h-[500px] bg-[pink]">
									<Image className='object-contain h-full' src={postDetail?.image ?? imagefail} />
								</Box>
								{/* {postDetail?.image?.sub ?
									<Box className="w-[240px]">
										<Stack spacing={1}>
											{postDetail?.image?.sub
												?.filter((_, index) => index < 3)
												?.map(image => (
													<Image src={image?.image_url ?? imagefail} height={135} />
												))}
											{postDetail?.image?.sub && facilityDetail?.image?.sub?.length > 0 ? (
												<Button
													variant="outlined"
													onClick={onOpen}
													className="sm:w-[240px] lowercase w-full px-0 text-20 text-[#00A0E9] font-semibold border-solid border-1 sm:leading-[160%] shadow-none"
												>
													Xem thêm ảnh
												</Button>
											) : null}
										</Stack>
									</Box>
									: null
								} */}
							</Box>
							<Box className="">
								<Typography className='mt-16 break-keep'>
									{postDetail?.title}
								</Typography>
								<Box className='my-16 flex'>
									<img src={postDetail?.userId?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-[15px] rounded-[50%]' />
									<Box>
										<Typography className='font-bold text-14'>{postDetail?.userId?.fullName}</Typography>
										<Typography className='text-12'>{timeAgo(postDetail?.createdAt)}</Typography>
									</Box>
								</Box>

								<Box className='my-10 flex justify-between mx-14'>
									<Typography className='text-16 underline'>{totalLike?.totalLike} lượt thích</Typography>
									<Typography className='text-16 underline'>{listComment?.totalResults} bình luận</Typography>
								</Box>

								<hr className='text-[#ddc1c1]' />
								<Box className='py-4 flex justify-between'>

									{isFavorited ?
										<Button className='w-[30%] flex'
											onClick={handleUnLikeFacility}
										>
											<img src='/Icons/like.png' className='h-20 w-20 mr-6' />
											<Typography className='text-[red] lowercase font-bold'>
												Thích
											</Typography>
										</Button>
										:
										<Button className='w-[30%] flex'
											onClick={handleLikeFacility}
										>
											<img src='/Icons/unlike.png' className='h-20 w-20 mr-6' />
											<Typography className='text-[#65676b] lowercase font-bold'>
												Thích
											</Typography>
										</Button>
									}

									<Button className='w-[30%] flex cursor-not-allowed'>
										<img src='/Icons/comment.png' className='h-20 w-20 mr-6' />
										<Typography className='text-[#65676b] lowercase font-bold'>
											Bình luận
										</Typography>
									</Button>
									<Button className='w-[30%] flex'
										onClick={onOpenShare}
									>
										<img src='/Icons/share.png' className='h-20 w-20 mr-6' />
										<Typography className='text-[#65676b] lowercase font-bold'>
											Chia sẻ
										</Typography>
									</Button>
								</Box>
								<hr className='text-[#ddc1c1]' />

								<Typography className='text-[#65676b] font-semibold my-16'>
									Bình luận
								</Typography>

								<Box className='max-h-[300px] relative overflow-y-scroll'
									sx={{
										'::-webkit-scrollbar': { width: '6px' },
										'::-webkit-scrollbar-track': {
											background: '#f1f1f1'
										},
										'::-webkit-scrollbar-thumb': {
											background: '#888888',
											borderRadius: '10px'
										},
										'& .MuiTabPanel-root': {
											padding: '0px'
										}
									}}
								>
									{loadingComment ? (
										<div className="my-[15%] flex justify-center items-center">
											<CircularProgress />
										</div>
									) : (
										listComment?.results?.length > 0 ?
											(
												listComment?.results?.map((item, index) => {
													return (
														<Box key={index} className='my-16 flex'>
															<img src={item?.userId?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-[15px] cursor-pointer rounded-[50%]'
																onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${item?.userId?.id}`)}
															/>
															<Box>
																<Box className='p-10 bg-[#e4e6eb] rounded-8'>
																	<Typography className='font-bold text-14 cursor-pointer'
																		onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${item?.userId?.id}`)}
																	>
																		{item?.userId?.fullName}
																	</Typography>
																	<Typography className='text-14 break-all'>
																		{item?.content?.split('\n').map((text, i) => (
																			<React.Fragment key={i}>
																				{text}
																				<br />{' '}
																			</React.Fragment >
																		))}
																	</Typography>


																</Box>
																<Box className='flex'>
																	<Typography className='text-12 mt-2 ml-8 mr-10'>{timeAgo(item?.createdAt)}</Typography>
																	{user?.id === item?.userId?.id ?
																		<Typography className='text-12  text-[red] mt-2 ml-8 cursor-pointer'
																			onClick={onOpenDeleteComment}
																		>
																			delete
																		</Typography>
																		: null
																	}
																</Box>
															</Box>
															{user?.id === item?.userId?.id ? renderDeleteComment(item?.id, postDetail?.id) : null}
														</Box>
													)
												})
											) :
											<Typography className='text-[black] my-16'>
												Hiện bào post này chưa có bình luận.
											</Typography>

									)}
								</Box>
								<Box className='mt-20 h-auto bg-[white]'>
									<Box className='flex py-10 px-20 items-center'>
										<img src={user?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-[15px] rounded-[50%]' />
										<textarea
											value={comment}
											onChange={(value) => setComment(value?.target?.value)}
											className="bg-[white] w-[600px] pt-20 outline-none text-16 mr-8"
											placeholder={'Nhập bình luận'}
										/>
										<Button className='font-bold text-16'
											onClick={handleComment}
										>
											Send
										</Button>
									</Box>
								</Box>
							</Box>
						</Box>
					)}
					{render()}
					{renderShare()}
				</Box>
			}
		/>
	)
}

export default React.memo(PostDetail)

import imagefail from '@App/Social/assets/imagefail.svg'
import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { Box, Button, CircularProgress, Pagination, Typography } from '@mui/material'
import Image from 'mui-image'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ListFavoriteContent = props => {
	const { listLike, loadingListLike, getListLike, refresh } = props
	const [pageApi, setPageApi] = useState(1)
	const navigate = useNavigate()

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [pageApi])

	useEffect(() => {
		const params = {
			page: pageApi,
			limit: 6,
			sortBy: 'createdAt:desc'
		}
		getListLike(params)
	}, [pageApi])

	return (
		<EventContentPage
			maxWidth={true}
			chat={true}
			content={
				<Box className="mx-[100px] mb-[100px]">
					<Typography className="text-start text-[20px] my-[32px] text-[black] font-semibold">
						{listLike?.results?.length > 0 ? 'Danh sách yêu thích của bạn' : null}
					</Typography>
					{loadingListLike ? (
						<div className="my-[30%] flex justify-center items-center">
							<CircularProgress />
						</div>
					) : (
						listLike?.results?.length > 0 ?
							<Box className='grid grid-cols-3 gap-[50px]'>
								{listLike?.results?.map((item, index) => {
									console.log(item?.postId?.userId?.avatar);
									return (
										item?.postId?.id ?
											<Box key={index}>
												<Box className="bg-[white] w-[300px] h-[380px]"
													sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
												>
													<Box className='cursor-pointer h-[300px]'
														onClick={() =>
															navigate(
																`${ROUTER_SOCIAL.event.detail}/?facility_id=${item?.postId?.id}`
															)
														}>
														<Image
															className="h-full w-full object-cover"
															src={item?.postId?.image ?? imagefail}

														/>
													</Box>

													<Box className='flex p-20 boder border-t-1'>
														<img src={item?.postId?.userId?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-[15px] cursor-pointer rounded-[50%]'
															onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${item?.postId?.userId?.id}`)}
														/>
														<Typography className='font-bold self-center text-14'>{item?.postId?.userId?.fullName}</Typography>

													</Box>

												</Box>
											</Box>
											:
											null
									)
								})}
							</Box>
							:
							<Box className='w-full text-center mt-[100px]'>
								<Typography className='text-18 text-[blue]'>
									Hiện tại bạn đang chưa yêu thích bài đăng nào.
								</Typography>
								<Typography className='text-18 text-[blue]'>
									Hãy quay lại trang chủ để trải nghiệm.
								</Typography>
								<Button
									className="bg-[red] shadow-none text-14 mt-[40px] px-20 font-semibold text-[#FFFFFF]"
									onClick={() => navigate(ROUTER_SOCIAL.event.search)}
								>
									HomePage
								</Button>
							</Box>
					)}

					{listLike?.results?.length > 0 ? (
						<Box className="sm:mt-40 mt-56 sm:mb-56 sm:px-0 flex justify-center">
							<Pagination
								count={Math.ceil(listLike?.totalPages)}
								siblingCount={0}
								size="large"
								page={pageApi}
								onChange={(_, value) => setPageApi(value)}
								sx={{
									'@media screen and (min-width: 600px)': {
										'.MuiPagination-ul': {
											gap: '16px'
										},
										'.MuiPaginationItem-root': {
											fontSize: '20px',
											fontWeight: 300,
											color: 'red',
											lineHeight: '160%',
											margin: '0px',
											padding: '0px'
										},
										'.MuiPaginationItem-icon': {
											color: 'red'
										},
										'.MuiPaginationItem-root.Mui-selected ': {
											fontWeight: 700,
											fontSize: '20px',
											color: 'red',
											lineHeight: '160%',
										},
										'li:first-child': {
											marginRight: '54px'
										},
										'li:last-child': {
											marginLeft: '54px'
										}
									},
								}}
							/>
						</Box>
					) : null}
				</Box>
			}
		/>
	)
}

export default React.memo(ListFavoriteContent)

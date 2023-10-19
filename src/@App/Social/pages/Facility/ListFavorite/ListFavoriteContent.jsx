import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import { Box, Button, CircularProgress, Grid, Pagination, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { useNavigate } from 'react-router-dom'
import imagefail from '@App/Social/assets/imagefail.svg'

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
									return (
										item?.postId?.id ?
											<Box key={index}>
												<Box className="bg-[white] w-[300px] h-[380px]"
													sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
												>
													<img
														className="h-[300px] w-full object-cover cursor-pointer"
														src={item?.postId?.image ?? imagefail}
														onClick={() =>
															navigate(
																`${ROUTER_SOCIAL.event.detail}/?facility_id=${item?.postId?.id}`
															)
														}
													/>

													<Box className='flex p-20 boder border-t-1'>
														<img src='/Icons/man.png' className='h-40 w-40 mr-[15px] cursor-pointer'
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
					{/* {!loadingFavorite && listFavorite?.facility?.length > 0 ? (
						<Box className="sm:mt-40 mt-56 sm:mb-56 sm:px-0 px-16 mb-24 flex justify-center">
							{Math.ceil(listFavorite?.total / listFavorite?.per_page) > 1 ? (
								<Pagination
									count={Math.ceil(listFavorite?.total / listFavorite?.per_page)}
									siblingCount={0}
									size="large"
									page={pageApi}
									color="primary"
									onChange={(_, value) => setPageApi(value)}
									sx={{
										'@media screen and (min-width: 600px)': {
											'.MuiPagination-ul': {
												gap: '16px'
											},
											'.MuiPaginationItem-root': {
												fontSize: '20px',
												fontWeight: 300,
												color: '#00A0E9',
												lineHeight: '160%',
												margin: '0px',
												padding: '0px'
											},
											'.MuiPaginationItem-icon': {
												color: '#00A0E9'
											},
											'.MuiPaginationItem-root.Mui-selected ': {
												fontWeight: 600,
												fontSize: '20px',
												color: '#00A0E9',
												lineHeight: '160%',
												backgroundColor: '#ffffff !important'
											},
											'li:first-child': {
												marginRight: '54px'
											},
											'li:last-child': {
												marginLeft: '54px'
											}
										},
										'@media screen and (max-width: 600px)': {
											width: '100%',
											'.MuiPagination-ul': {
												justifyContent: 'center',
												gap: '8px'
											},
											'.MuiPaginationItem-root': {
												fontSize: '16px',
												fontWeight: 300,
												color: '#00A0E9',
												lineHeight: '140%',
												margin: '0px',
												padding: '0px'
											},
											'.MuiPaginationItem-icon': {
												color: '#00A0E9'
											},
											'.MuiPaginationItem-root.Mui-selected ': {
												fontWeight: 600,
												fontSize: '16px',
												color: '#00A0E9',
												lineHeight: '140%',
												backgroundColor: '#ffffff !important'
											},
											'.MuiPaginationItem-root.MuiPaginationItem-previousNext': {
												minWidth: '24px'
											},
											'li:first-child': {
												marginRight: 'auto'
											},
											'li:last-child': {
												marginLeft: 'auto'
											}
										}
									}}
								/>
							) : null}
						</Box>
					) : null} */}
				</Box>
			}
		/>
	)
}

export default React.memo(ListFavoriteContent)

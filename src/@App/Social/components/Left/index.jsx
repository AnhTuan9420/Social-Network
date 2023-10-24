import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { getSocialUser } from '@Core/helper/Session'
import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useListUser } from './hooks/useListUser'

const Left = props => {
	const navigate = useNavigate()
	const user = getSocialUser()

	const { listUser, loadingListUser } = useListUser()

	return (
		<Box>
			<Box className="mt-20 px-20 py-10 bg-[white] cursor-pointer" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
				onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${user?.id}`)}
			>
				<Box className='flex items-center'>
					<img src={user?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-20 rounded-[50%]' />
					<Box>
						<Typography className='font-bold'>{user?.fullName}</Typography>
						<Typography >@{user?.username}</Typography>
					</Box>
				</Box>
			</Box>

			<Box className="mt-20 px-20 py-10 bg-[white]"
				sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
			>
				<Typography className='py-20 font-bold'>
					Danh sách người dùng ({listUser?.totalResults - 1})
				</Typography>
				<hr className='bg-[red] text-[red] h-2' />

				<Box className='overflow-y-scroll max-h-[300px] my-10'
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
					{loadingListUser ?
						<div className="my-[40%] flex justify-center items-center">
							<CircularProgress />
						</div>
						:
						listUser?.results?.map((item, index) => {
							return (
								user?.id === item?.id ? null
									:
									<Box key={index} className='my-28 w-full flex items-center justify-between'>
										<Box className='flex items-center cursor-pointer'
											onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${item?.id}`)}
										>
											<img src={item?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-20 rounded-[50%]' />
											<Typography className='font-bold'>
												{item?.fullName}
											</Typography>
										</Box>
										<img src='/Icons/messenger.png' className='h-[25px] w-[25px] cursor-pointer mr-14'
											onClick={() => navigate(`${ROUTER_SOCIAL.chat}/?user_id=${item?.id}`)}
										/>
									</Box>
							)
						})}
				</Box>
			</Box>

			<Box className="mt-20 px-20 py-10 bg-[white] cursor-pointer" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
				onClick={() => navigate(ROUTER_SOCIAL.faq)}
			>
				<Box className='flex items-center justify-between'>
					<Box className='flex'>
						<img src='/Icons/faq.png' className='h-40 w-40 mr-20' />
						<Typography className='font-bold self-center'>FAQs</Typography>
					</Box>
					<Box>
						<img src='/Icons/arrow.png' className='h-[25px] w-[25px]' />
					</Box>
				</Box>
			</Box>

			<Box className="mt-20 px-20 py-10 bg-[white] cursor-pointer" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
				onClick={() => navigate(ROUTER_SOCIAL.privacy)}
			>
				<Box className='flex items-center justify-between'>
					<Box className='flex'>
						<img src='/Icons/privacy.png' className='h-40 w-40 mr-20' />
						<Typography className='font-bold self-center'>Chính sách và điều khoản </Typography>
					</Box>
					<Box>
						<img src='/Icons/arrow.png' className='h-[25px] w-[25px]' />
					</Box>
				</Box>
			</Box>

		</Box>
	)
}

export default React.memo(Left)

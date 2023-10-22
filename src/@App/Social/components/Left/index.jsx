import { Box, CircularProgress, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { getSocialUser } from '@Core/helper/Session'
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
					<img src='/Icons/man.png' className='h-40 w-40 mr-20' />
					<Box>
						<Typography className='font-bold'>{user?.fullName}</Typography>
						<Typography >@{user?.username}</Typography>
					</Box>
				</Box>
			</Box>

			<Box className="mt-20 px-20 py-10  bg-[white]" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
				<Typography className='py-20 font-bold'>
					List User ({listUser?.totalResults - 1})
				</Typography>
				<hr className='bg-[red] text-[red] h-2' />

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
										<img src={item?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-20' />
										<Typography className='font-bold'>
											{item?.fullName}
										</Typography>
									</Box>
									<img src='/Icons/messenger.png' className='h-[25px] w-[25px] cursor-pointer'
										onClick={() => navigate(`${ROUTER_SOCIAL.chat}/?user_id=${item?.id}`)}
									/>
								</Box>
						)
					})}
			</Box>
		</Box>
	)
}

export default React.memo(Left)

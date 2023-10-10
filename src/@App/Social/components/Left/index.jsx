import { Box, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useLocation, Link, useHref } from 'react-router-dom'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { menu } from '@App/Social/configs/menuConfig'

const Left = props => {
	const navigate = useNavigate()
	const currentUrl = useHref()

	return (
		<Box>
			<Box className="mt-20 px-20 py-10 bg-[white] cursor-pointer" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
				onClick={() => navigate(ROUTER_SOCIAL.user.profile)}
			>
				<Box className='flex items-center'>
					<img src='/Icons/man.png' className='h-40 w-40 mr-20' />
					<Box>
						<Typography className='font-bold'>Charlie</Typography>
						<Typography >@anhtuan_ss</Typography>
					</Box>
				</Box>
			</Box>

			<Box className="mt-20 px-20 py-10  bg-[white]" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
				<Typography className='py-20 font-bold'>
					Danh sách người dùng
				</Typography>
				<hr className='bg-[red] text-[red] h-2' />
				<Box className='my-28 w-full flex items-center justify-between'>
					<Box className='flex items-center'>
						<img src='/Icons/man.png' className='h-40 w-40 mr-20 cursor-pointer' onClick={() => navigate(ROUTER_SOCIAL.user.profile)} />
						<Box>
							<Typography className='font-bold'>Charlie</Typography>
						</Box>
					</Box>
					<img src='/Icons/messenger.png' className='h-[30px] w-[30px] cursor-pointer' onClick={() => navigate(`${ROUTER_SOCIAL.chat}?/user_id=${1}`)} />
				</Box>
				<Box className='my-28 w-full flex items-center justify-between'>
					<Box className='flex items-center'>
						<img src='/Icons/man.png' className='h-40 w-40 mr-20 cursor-pointer' onClick={() => navigate(ROUTER_SOCIAL.user.profile)} />
						<Box>
							<Typography className='font-bold'>Charlie</Typography>
						</Box>
					</Box>
					<img src='/Icons/messenger.png' className='h-[30px] w-[30px] cursor-pointer' onClick={() => navigate(`${ROUTER_SOCIAL.chat}?/user_id=${2}`)} />
				</Box>
				<Box className='my-28 w-full flex items-center justify-between'>
					<Box className='flex items-center'>
						<img src='/Icons/man.png' className='h-40 w-40 mr-20 cursor-pointer' onClick={() => navigate(ROUTER_SOCIAL.user.profile)} />
						<Box>
							<Typography className='font-bold'>Charlie</Typography>
						</Box>
					</Box>
					<img src='/Icons/messenger.png' className='h-[30px] w-[30px] cursor-pointer' onClick={() => navigate(`${ROUTER_SOCIAL.chat}?/user_id=${3}`)} />
				</Box>
			</Box>
		</Box>
	)
}

export default React.memo(Left)

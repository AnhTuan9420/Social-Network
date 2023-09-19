import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useLocation, Link, useHref } from 'react-router-dom'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'

const Left = props => {
	const navigate = useNavigate()

	return (
		<Box className="m-20 px-20 py-10 rounded-8 bg-[white] cursor-pointer" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
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
	)
}

export default React.memo(Left)

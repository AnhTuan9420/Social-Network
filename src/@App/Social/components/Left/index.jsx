import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate, useLocation, Link, useHref } from 'react-router-dom'
import { getSocialUser } from '@Core/helper/Session'

const Left = props => {

	return (
		<Box className="m-20 px-20 py-10 rounded-8 bg-[white]" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
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

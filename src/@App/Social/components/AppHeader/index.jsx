import logo from '@App/Social/assets/logo.png'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useHref, useNavigate } from 'react-router-dom'
import UserHeader from '../UserHeader'

const AppHeader = props => {
	const navigate = useNavigate()
	const endpoint = useHref()

	return (
		endpoint === ROUTER_SOCIAL.event.event_top ?
			null :
			<Box>
				<AppBar position="fixed" className='bg-[white] shadow-none border-b-1 border-[#E0E0E0]'>
					<Toolbar className='justify-between px-[17%]'>
						<Typography component="div"
							className='cursor-pointer flex items-center font-600 text-[#e91c81]'
							onClick={() => navigate(ROUTER_SOCIAL.event.search)}
						>
							<img src={logo} alt="" className="h-[40px] mr-10 text-[#E0E0E0]" />
							PhotoVibe
						</Typography>
						<UserHeader />
					</Toolbar>
				</AppBar>
			</Box>
	)
}

export default React.memo(AppHeader)

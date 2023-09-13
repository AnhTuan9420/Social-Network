import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import logoMobile from '@App/Social/assets/logoMobile.svg'
import logo from '@App/Social/assets/logo.png'
import UserHeader from '../UserHeader'
import { useHref, useNavigate } from 'react-router-dom'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
// import PropTypes from 'prop-types'

const AppHeader = props => {
	const navigate = useNavigate()
	const isMobile = useMediaQuery('(max-width:600px)')
	const endpoint = useHref()

	return (
		<Box>
			<AppBar position="fixed" className='bg-[white] shadow-none border-b-1 border-[#E0E0E0]'>
				<Toolbar className='justify-between p-0'>
					<Typography component="div"
						className={endpoint === ROUTER_SOCIAL.event.event_top ?
							'pointer-events-none flex items-center font-600 text-[#e91c81]' :
							'cursor-pointer flex items-center font-600 text-[#e91c81]'}
					>
						<img src={isMobile ? logoMobile : logo} alt="" className="h-[40px] mr-10 text-[#E0E0E0] sm:pl-[40px] pl-16" onClick={() => navigate(ROUTER_SOCIAL.event.search)} />
						PhotoVibe
					</Typography>
					<UserHeader />
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default React.memo(AppHeader)

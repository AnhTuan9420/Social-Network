import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useHref, useNavigate } from 'react-router-dom'
import LeftMenu from '../AppHeader/LeftMenu'
import HeaderPerson from './HeaderPerson'

const UserHeader = (props) => {
	const [open, setOpen] = useState(false)

	const navigate = useNavigate()
	const endpoint = useHref()


	if (endpoint !== ROUTER_SOCIAL.event.event_top) {
		return (
			<div className="flex justify-between">
				<Button className="cursor-pointer flex" onClick={() => navigate(ROUTER_SOCIAL.event.favorite)}>
					<img src="/Icons/like.png" height={27} width={27} className="mr-[7px]" />
					<Typography className="font-bold text-[16px] text-[#e91c81] ">
						Yêu thích
					</Typography>
				</Button>
				{/* <HeaderNotification /> */}
				<HeaderPerson />

				<LeftMenu open={open} setOpen={setOpen} />
			</div>
		)
	}

}

export default React.memo(UserHeader)

import { Divider, Icon, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

const LeftMenuItem = props => {
	const { item, color, ...resProps } = props
	const navigate = useNavigate()
	const match = useMatch(item.url ?? '/')
	const handleClickMenu = url => {
		if (url) navigate(url)
	}

	return (
		<>
			<ListItem
				disablePadding
				secondaryAction={<Icon>navigate_next</Icon>}
				onClick={() => handleClickMenu(item?.url)}
				// components={NavLink}
				selected={Boolean(match)}
				{...resProps}
			>
				{match?.pattern?.end === true ? (
					<ListItemButton className='bg-[#e6f2f7]'>
					
					<ListItemText
						primary={
							<Box className="flex">
								<Typography variant="body1">{item?.title}</Typography>
								{item?.bagde}
							</Box>
						}
					/>
				</ListItemButton>
				) : (
					<ListItemButton>
					
					<ListItemText
						primary={
							<Box className="flex">
								<Typography variant="body1">{item?.title}</Typography>
								{item?.bagde}
							</Box>
						}
					/>
				</ListItemButton>
				)}
			</ListItem>
			<Divider />
		</>
	)
}

//LeftMenuItem.defaultProps = {}

//LeftMenuItem.propTypes = {}

export default React.memo(LeftMenuItem)

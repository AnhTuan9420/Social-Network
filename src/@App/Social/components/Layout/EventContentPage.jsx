import { Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import CoreBreadcrumb from '@Core/components/CoreBreadcrumb'
import { routerTraveloConfig } from '@App/Social/configs/routerConfig'
import Left from '../Left'

const EventContentPage = props => {
	const { content, header } = props

	return (
		<Box className='bg-[#f7fcfe] mt-64'>
			{/* {header && <Box className="w-full bg-[#F9F9F9]">{header}</Box>} */}
			<Box className='flex'>
				<Box className='w-[17%] fixed h-full'>
					<Left/>
				</Box>
				<Box className='w-[40%] mx-auto'>
					{content}
				</Box>
				<Box className='w-[17%] fixed right-0 h-full'>
					Right
					<Box className='self-center'>
						<Typography className='text-[30px] font-bold'>Welcome to PhotoVibe!  </Typography>
						Join us and embark on your creative journey with photos at PhotoVibe. <br />
						Let your moments be preserved and shared with our vibrant community.
						<br />
						Use PhotoVibe today and share your passion with our community!
						<br />
						#PhotoVibe #LovePhotography #ShareMoments
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

EventContentPage.defaultProps = {
	hasBreadcrumb: true,
}

EventContentPage.propTypes = {
	header: PropTypes.any,
	content: PropTypes.any,
	hasBreadcrumb: PropTypes.bool,
	maxWidth: PropTypes.number
}

export default React.memo(EventContentPage)

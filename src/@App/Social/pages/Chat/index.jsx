import { Divider, MenuItem, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Person from '@App/Social/assets/Person.svg'
import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import { deleteAccount, userInfoMenus } from '@App/Social/configs/menuConfig'

const Chat = props => {
	const isMobile = useMediaQuery('(max-width:600px)')

	// const {
	// 	data: profile,
	// 	run: getProfile,
	// 	loading
	// } = useRequest(profileService.getUserProfile, {
	// 	manual: true
	// })

	// useEffect(() => {
	// 	getProfile()
	// }, [])

	return (
		<EventContentPage
			maxWidth={true}
			chat={true}
			content={
				<Box className="flex my-[100px] shadow-lg">

					<Box className="w-[40%] bg-[white]">
						<Box className="h-[600px] sm:px-16 px-[18px] sm:py-[24px] py-[25px]">
							<Box className="flex">
								<img src={Person} className="h-20 w-20  mr-10 mt-8" />
								<Typography className="text-20 font-semibold self-center leading-[160%] text-[#222222] break-all">
									Charlie
								</Typography>
							</Box>
						</Box>
						<Divider />
					</Box>

					<Box className="w-full h-[600px] bg-[white] border-solid border-l-1 border-[#e0e0e0]">
						<Box className="sm:p-[24px] sm:mb-0 mb-24">
							<Typography className="sm:text-[24px] text-[22px] text-center sm:text-left font-semibold text-[#222222]">
								headerTile
							</Typography>
						</Box>
						<Divider className="sm:block hidden" />
						<Box className="sm:p-[24px] sm:px-[24px] px-[16px]">
							<Box className={isMobile ? 'border-solid border-1 border-[#E0E0E0] p-16 rounded-[4px] mb-[100px]' : ''}>
								<Box className="sm:mb-8 mb-4">
									<Typography className="text-[#222222] sm:text-20 text-16 sm:leading-[160%] leading-[140%] font-light">
										Member ID:
									</Typography>
								</Box>
								<Box className="sm:mb-8 mb-4">
									<Typography className="text-[#222222] sm:text-20 text-16 sm:leading-[160%] leading-[140%] font-light">
										nickname:
									</Typography>
								</Box>
								<Box className="sm:mb-8 mb-4">
									<Typography className="text-[#222222] sm:text-20 text-16 sm:leading-[160%] leading-[140%] font-light">
										email address:
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			}
		/>
	)
}

export default React.memo(Chat)

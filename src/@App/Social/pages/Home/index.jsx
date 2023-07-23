import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@App/Social/assets/logo.png'
const HomeTop = props => {
	const navigate = useNavigate()

	return (
		<Box className="relative h-full w-full bg-no-repeat bg-cover " sx={{ backgroundImage: `url('https://wallpaper.dog/large/5461261.jpg')` }}>
			<Box className="absolute top-[20%] left-[20%] right-[20%] bottom-[20%]  bg-[#f0f2f5] shadow-5 rounded-12">
				<Box className='grid grid-cols-2 gap-20 p-40'>
					<Box className='flex break-all'>
						Welcome to PhotoVibe!  <br />
						<br />
						At PhotoVibe, you can:
						<br />
						📸 Share Photos: Easily upload your most beautiful photos and share them with the community.
						<br />
						❤️ Like and Comment: Show love to your favorite photos by liking and commenting on them.
						<br />
						🔍 Explore: Discover the world through the photos of other users and explore new technical angles.
						<br />
						🏆 Join Contests: Participate in exciting photo contests and stand a chance to win attractive rewards.
						<br />
						👥 Connect: Make new friends and share a common passion for photography.
						<br />
						<br />
						Join us and embark on your creative journey with photos at PhotoVibe. Let your moments be preserved and shared with our vibrant community.
						<br />
						<br />
						Use PhotoVibe today and share your passion with our community!
						<br />
						<br />
						#PhotoVibe #LovePhotography #ShareMoments
					</Box>
					<Box className='self-center rounded-16'>
						<img src='https://subsites-newsroom.imgix.net/sites/pinnews/files/post_main_content_image/2020-02/Pinterest_Lite_EN-US_0.png?ixlib=php-3.3.1&s=bab402bbf44197725be1a32a8bc9b486' />
					</Box>
				</Box>
				<Typography className='cursor-pointer text-center text-[#32a0e9] text-[25px] font-600 underline'
					onClick={() => navigate(ROUTER_SOCIAL.event.search)}
				>
					Let's Get Started!
				</Typography>
			</Box>
		</Box>

	)
}
export default React.memo(HomeTop)
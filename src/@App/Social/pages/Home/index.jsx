import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import logo from '@App/Social/assets/logo.png'

import Login from './Auth/Login'
import Register from './Auth/Register'

const HomeTop = props => {
	const [login, setLogin] = useState(true)

	return (
		//sx={{ backgroundImage: `url('https://wallpaper.dog/large/5461261.jpg')` }}
		<Box className="relative h-full w-full bg-no-repeat bg-cover bg-[#e75348]" >
			<Box className="absolute top-[20%] left-[25%] right-[25%] bottom-[20%] bg-[white]">
				<Box className='grid grid-cols-2 gap-20 p-40 h-full' >
					<Box className='self-center'>
						<Typography component="div"
							className='flex items-center font-600 text-28 mb-28'
						>
							<img src={logo} alt="" className="h-[40px] mr-10" />
							PhotoVibe
						</Typography>
						<Box className='text-14'>
							Join us and embark on your creative journey with photos at PhotoVibe. <br />
							Let your moments be preserved and shared with our vibrant community.
							<br />
							Use PhotoVibe today and share your passion with our community!
							<br />
							[ #PhotoVibe #LovePhotography #ShareMoments ]
						</Box>
						<img src="/Icons/login.png" alt="" className="mt-28" />
					</Box>
					<Box className='mx-[10%] rounded-16'>
						<Box className='flex justify-end'>
							{login ?
								<Button className='bg-[red] w-[90px] rounded-l-6 rounded-r-none text-[white] font-bold'>
									Đăng nhập
								</Button>
								:
								<Button className='bg-[#e5e5e5] w-[90px] rounded-l-6 rounded-r-none text-[black] font-bold' onClick={() => setLogin(true)}>
									Đăng nhập
								</Button>
							}

							{!login ?
								<Button className='bg-[red] w-[90px] rounded-r-6 rounded-l-none text-[white] font-bold'>
									Đăng ký
								</Button>
								:
								<Button className='bg-[#e5e5e5] w-[90px] rounded-r-6 rounded-l-none text-[black] font-bold' onClick={() => setLogin(false)}>
									Đăng ký
								</Button>
							}

						</Box>
						<Box className=''>
							{login ?
								<Login /> :
								<Register />
							}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>

	)
}
export default React.memo(HomeTop)
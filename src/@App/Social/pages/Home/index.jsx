import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { Box, Button, IconButton, InputAdornment, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@App/Social/assets/logo.png'
import CoreInput from '@Core/components/Input/CoreInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from '@Core/helper/Yup'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

const HomeTop = props => {
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		watch
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: yupResolver(
			Yup.object({
				email: Yup.string()
					.required('Required')
					.email('Error!')
					.min(3, 'Error'),
				password: Yup.string()
					.required('Required')
					.min(8, 'Error')
					.max(20, 'Error')
			})
		)
	})

	const [viewPassword, setViewPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setViewPassword(true)
	}

	return (
		//sx={{ backgroundImage: `url('https://wallpaper.dog/large/5461261.jpg')` }}
		<Box className="relative h-full w-full bg-no-repeat bg-cover bg-[#f0f2f5]" >
			<Box className="absolute top-[25%] left-[25%] right-[25%] bottom-[25%] bg-[white] shadow-6 rounded-12">
				<Box className='grid grid-cols-2 gap-20 p-40 h-full' >
					<Box className='self-center'>
						<Typography className='text-[30px] font-bold'>Welcome to PhotoVibe!  </Typography>
						Join us and embark on your creative journey with photos at PhotoVibe. <br />
						Let your moments be preserved and shared with our vibrant community.
						<br />
						Use PhotoVibe today and share your passion with our community!
						<br />
						#PhotoVibe #LovePhotography #ShareMoments
					</Box>
					<Box className='self-center mx-[10%] rounded-16'>
						<Typography className="mb-4  text-[#222222] font-semibold">
							Email
						</Typography>
						<CoreInput
							control={control}
							name="email"
							className="w-full"
							placeholder={'Số điện thoại, tên người dùng hoặc email'}
							inputLogin={true}
						/>
						<Typography className="mb-4 mt-10 text-[#222222] sm:leading-[160%] leading-[140%] font-semibold">
							Password
						</Typography>
						<CoreInput
							id="password"
							control={control}
							name="password"
							type={viewPassword ? 'text' : 'password'}
							className="w-full"
							placeholder={'Mật khẩu'}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										{viewPassword ? (
											<IconButton onClick={() => setViewPassword(false)}>
												<VisibilityOutlinedIcon color="primary" />
											</IconButton>
										) : (
											<IconButton onClick={togglePasswordVisibility}>
												<VisibilityOffOutlinedIcon color="primary" />
											</IconButton>
										)}
									</InputAdornment>
								)
							}}
						/>
						<Button
							variant="contained"
							className="w-full mt-10 h-56 shadow-none font-semibold text-[#FFFFFF]"
							onClick={() => navigate(ROUTER_SOCIAL.event.search)}
						>
							Đăng nhập
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>

	)
}
export default React.memo(HomeTop)
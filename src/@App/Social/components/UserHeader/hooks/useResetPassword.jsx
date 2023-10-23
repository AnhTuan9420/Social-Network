import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { authService } from '@App/Social/services/authService'
import CoreInput from '@Core/components/Input/CoreInput'
import { errorMsg, successMsg } from '@Core/helper/Message'
import { clearSession, getSocialUser } from '@Core/helper/Session'
import Yup from '@Core/helper/Yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Typography } from '@mui/material'
import { useBoolean } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const useResetPassword = () => {
	const [open, { setTrue, setFalse }] = useBoolean()
	const user = getSocialUser()
	const navigate = useNavigate()
	const [viewPassword, setViewPassword] = useState(false)
	const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, errors },
		setValue
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			password: '',
			newPassword: '',
			confirmPassword: ''
		},
		resolver: yupResolver(
			Yup.object({
				password: Yup.string()
					.required('Required'),
				newPassword: Yup.string()
					.required('Required')
					.min(8, 'Password must be between 8 and 20 characters')
					.max(20, 'Password must be between 8 and 20 characters'),
				confirmPassword: Yup.string()
					.required('Required')
					.oneOf([Yup.ref('newPassword'), null], 'ConfirmPassword and NewPassword not match')
			})
		)
	})

	const onSubmit = handleSubmit(async data => {
		try {
			await authService.resetPassword(data)
			successMsg('Đổi mật khẩu thành công')
			setFalse()
			navigate(ROUTER_SOCIAL.event.event_top)
			clearSession()
		} catch (error) {
			errorMsg(error.response.data.message)
		}
	})

	useEffect(() => {
		setValue('password', '')
		setValue('newPassword', '')
		setValue('confirmPassword', '')
	}, [open])

	const renderResetPassword = useCallback(() => {
		return (
			<Dialog
				onClose={setFalse}
				open={open}
				maxWidth="md"
				fullWidth
				PaperProps={{
					style: {
						borderRadius: '8px',
						maxWidth: '600px'
					}
				}}
			>
				<form encType="multipart/form-data">
					<DialogTitle className="p-16">
						<Box className="flex items-center">
							<IconButton onClick={() => setFalse()} className="p-0">
								<CloseOutlinedIcon color="error" />
							</IconButton>
							<Typography className="mx-auto sm:text-[26px] text-16 font-semibold text-[#222222] leading-[140%]">
								Đổi mật khẩu
							</Typography>
						</Box>
					</DialogTitle>
					<Divider />
					<DialogContent className="p-0">
						<Box className="p-16">

							<Typography className="mb-4 mt-10 text-[#222222] sm:leading-[160%] leading-[140%] font-semibold">
								Current Password
							</Typography>

							<CoreInput
								control={control}
								name="password"
								className="w-full mb-8"
								placeholder={'Nhập mật khẩu hiện tại'}
								inputLogin={true}
							/>

							<Typography className="mb-4 mt-10 text-[#222222] sm:leading-[160%] leading-[140%] font-semibold">
								New Password
							</Typography>

							<CoreInput
								id="newPassword"
								control={control}
								name="newPassword"
								type={viewPassword ? 'text' : 'password'}
								className="w-full"
								placeholder={'Nhập mật khẩu hiện tại'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{viewPassword ? (
												<IconButton onClick={() => setViewPassword(false)}>
													<VisibilityOutlinedIcon color="error" />
												</IconButton>
											) : (
												<IconButton onClick={() => setViewPassword(true)}>
													<VisibilityOffOutlinedIcon color="error" />
												</IconButton>
											)}
										</InputAdornment>
									)
								}}
							/>

							<Typography className="mb-4 mt-10 text-[#222222] sm:leading-[160%] leading-[140%] font-semibold">
								Confirm Password
							</Typography>

							<CoreInput
								id="confirmPassword"
								control={control}
								name="confirmPassword"
								type={viewConfirmPassword ? 'text' : 'password'}
								className="w-full"
								placeholder={'Nhập lại mật khẩu'}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{viewConfirmPassword ? (
												<IconButton onClick={() => setViewConfirmPassword(false)}>
													<VisibilityOutlinedIcon color="error" />
												</IconButton>
											) : (
												<IconButton onClick={() => setViewConfirmPassword(true)}>
													<VisibilityOffOutlinedIcon color="error" />
												</IconButton>
											)}
										</InputAdornment>
									)
								}}
							/>

							<Box className='text-center mt-20'>
								<Button
									variant="contained"
									onClick={onSubmit}
									className="w-[60%] bg-[red] shadow-none text-16 font-semibold text-[#FFFFFF]"
								>
									Xác nhận
								</Button>
							</Box>
						</Box>
					</DialogContent>
				</form>
			</Dialog>
		)
	},
		[open, viewPassword, viewConfirmPassword]
	)

	return { onOpen: setTrue, renderResetPassword }
}

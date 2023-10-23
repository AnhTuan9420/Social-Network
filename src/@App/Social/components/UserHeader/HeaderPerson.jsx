import Person from '@App/Social/assets/Person.svg'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { authService } from '@App/Social/services/authService'
import { successMsg } from '@Core/helper/Message'
import { COOKIE, clearSession, getDataSession, getSocialUser } from '@Core/helper/Session'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import { useBoolean } from 'ahooks'
import clsx from 'clsx'
import { memo, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResetPassword } from './hooks/useResetPassword'

const HeaderPerson = () => {
	const user = getSocialUser()
	const [open, setOpen] = useState(false)
	const { onOpen, renderResetPassword } = useResetPassword()
	const navigate = useNavigate()
	const el = useRef()

	useEffect(() => {
		window.addEventListener('scroll', () => setOpen(false))
		function handleClickOutside(event) {
			if (el.current && !el.current.contains(event.target)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			window.removeEventListener('scroll', () => { })
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleLogout = async () => {
		const res = getDataSession(COOKIE, 'refresh_token')
		await authService.logout(res)
		setFalse()
		successMsg('Logout success.')
		navigate(ROUTER_SOCIAL.event.event_top)
		clearSession()
	}

	const [openConfirmLogout, { setTrue, setFalse }] = useBoolean(false)
	const handleOpenModal = async () => {
		await setTrue()
	}
	const handleCloseModal = () => {
		setFalse()
	}

	return (
		<div ref={el}>
			<Box className="cursor-pointer ml-40 mt-2 flex" onClick={() => setOpen(!open)}>
				<IconButton
					size="small"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					color="primary"
				>
					<img src={Person} />
				</IconButton>
				<Typography className="font-bold uppercase self-center text-[16px] text-[#e91c81] ">
					Trang cá nhân
				</Typography>
			</Box>

			<Box
				className={clsx(
					'z-9999 fixed sm:top-[62px] sm:right-[160px] top-0 right-0 bottom-0 shadow-4 sm:min-w-[300px] sm:w-auto w-[100%] sm:h-[280px] bg-white rounded-[10px] ease-out duration-200 origin-top-left',
					open ? 'scale-100' : 'scale-0'
				)}
			>
				<Box className="p-16">
					<Typography className="text-[16px] break-all font-semibold text-[red] ">{user?.fullName}</Typography>
				</Box>
				<Divider />

				<Typography
					className="text-[16px] px-16 pb-8 pt-16 text-[#e91c81] cursor-pointer "
					onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${user?.id}`) & setOpen(!open)}
				>
					Trang cá nhân
				</Typography>

				<Typography
					className="text-[16px] px-16 py-8 text-[#e91c81] leading-[140%] cursor-pointer "
					onClick={() => navigate(ROUTER_SOCIAL.faq) & setOpen(!open)}
				>
					FAQs
				</Typography>

				<Typography
					className="text-[16px] px-16 py-8 text-[#e91c81] leading-[140%] cursor-pointer "
					onClick={() => navigate(ROUTER_SOCIAL.privacy) & setOpen(!open)}
				>
					Chính sách và điều khoản
				</Typography>

				<Typography
					className="text-[16px] px-16 py-8 text-[#e91c81] leading-[140%] cursor-pointer "
					onClick={onOpen}
				>
					Đổi mật khẩu
				</Typography>
				<Divider />

				<Typography className="text-[16px] font-bold p-16 text-[red] leading-[140%] cursor-pointer " onClick={handleOpenModal}>
					Đăng xuất
				</Typography>
			</Box>

			<Dialog
				onClose={handleCloseModal}
				open={openConfirmLogout}
				maxWidth="xs"
				fullWidth

			>
				<DialogTitle className=" font-bold py-[19px] px-16 p-0 bg-[red] relative">
					<Box className="flex items-center">
						<Typography className="mx-auto text-[20px] font-semibold text-[white] leading-[140%]">
							Đăng xuất
						</Typography>
						<IconButton onClick={() => handleCloseModal()} className=" absolute top-0 right-0">
							<CloseOutlinedIcon className='text-[white]' />
						</IconButton>
					</Box>
				</DialogTitle>
				<Divider className="" />
				<DialogContent className="sm:py-[24px] py-16 sm:px-24 px-16">
					<Typography className="text-[#222222] text-20 sm:mb-24 mb-16 sm:leading-[160%] leading-[140%] font-normal">
						Bạn có muốn đăng xuất khỏi <strong>PHOTOVIBE</strong> không?
					</Typography>
					<Box className="text-center mt-24">
						<Button
							onClick={handleLogout}
							variant="contained"
							type="submit"
							className="sm:w-[250px] bg-[red] w-full text-16 py-[17px] px-0 leading-[140%] font-bold text-[#FFFFFF]"
						>
							Đăng xuất
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
			{renderResetPassword()}
		</div>
	)
}

export default memo(HeaderPerson)

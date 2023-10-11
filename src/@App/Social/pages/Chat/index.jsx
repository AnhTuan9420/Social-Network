import { Button, Divider, MenuItem, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import CoreInput from '@Core/components/Input/CoreInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from '@Core/helper/Yup'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { user } from '@App/Social/configs/menuConfig'

const Chat = props => {
	const navigate = useNavigate()
	let [searchParams] = useSearchParams()
	const user_id = searchParams.get('user_id')


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

	return (
		<EventContentPage
			maxWidth={true}
			chat={true}
			content={
				<Box className="flex my-[50px]" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>

					<Box className="w-[40%] bg-[white] h-[700px]">
						<Box className="sm:px-16 px-[18px] sm:py-[24px] py-[25px]">
							<Typography className="text-20 font-semibold self-center leading-[160%] text-[#222222] break-all" onClick={() => navigate(`${ROUTER_SOCIAL.chat}?/user_id=${3}`)}>
								Messages
							</Typography>
						</Box>
						<Divider />
						<Box className='h-[620px] overflow-y-scroll'
							sx={{
								'::-webkit-scrollbar': {
									width: '0px'
								}
							}}
						>
							{user?.map((item, i) => {
								if (Number(item?.id) === Number(user_id)) {
									return (
										<Box key={i} onClick={() => navigate(`${ROUTER_SOCIAL.chat}/?user_id=${item.id}`)}>
											<MenuItem className="p-[16px] text-[#00A0E9] font-semibold bg-[#EFFAFF] sm:text-20 text-16 sm:leading-[160%] leading-[140%]">
												<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' /> {item?.username}
											</MenuItem>
											<Divider className='m-0' />
										</Box>
									)
								} else {
									return (
										<Box key={i} onClick={() => navigate(`${ROUTER_SOCIAL.chat}/?user_id=${item.id}`)}>
											<MenuItem className="p-[16px] text-[#222222] font-normal sm:text-20 text-16 sm:leading-[160%] leading-[140%]">
												<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' /> {item?.username}
											</MenuItem>
											<Divider className='m-0' />
										</Box>
									)
								}
							})}
						</Box>
					</Box>

					<Box className="w-full h-[700px] bg-[white] border-solid border-l-1 border-[#e0e0e0]">
						<Box className="px-[30px] py-[18px] overflow-y-scroll h-[617px] flex flex-col-reverse gap-y-20"
							sx={{
								'::-webkit-scrollbar': {
									width: '0px'
								}
							}}
						>
							<Box className='flex justify-end'>
								<Box className='mr-[15px] max-w-[40%]'>
									<Box className='py-10 px-[20px]  bg-[red] rounded-8'>
										<Typography className='text-16 text-[white] font-400 break-keep'>
											Gần đây thì mình đã học React và mình đã sử dụng create-react-app để tạo project React của mình. Với việc sử dụng create-react-app việc config và thời gian để tạo project React rất dễ dàng. Mình cũng đoán rằng, các bạn cũng thường xuyên sử dụng create-react-app để tạo project React của các bạn. Trong bài viết này mình sẽ giới thiệu với các bạn một cách để xây dựng project React sử dụng Webpack 4 và Babel. Let’s get started 😃
										</Typography>
									</Box>
									<Typography className='text-12 text-end mt-2 ml-8 text-[E0E0E0]'>20 phút trước</Typography>
								</Box>

								<img src='/Icons/man.png' className='h-40 w-40' />
							</Box>

							<Box className='flex justify-start'>
								<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />

								<Box className='max-w-[40%]'>
									<Box className='py-10 px-[18px] bg-[#e4e6eb] rounded-8'>
										<Typography className='text-16 font-400 break-keep'>
											Gần đây thì mình đã học React và mình đã sử dụng create-react-app để tạo project React của mình. Với việc sử dụng create-react-app việc config và thời gian để tạo project React rất dễ dàng. Mình cũng đoán rằng, các bạn cũng thường xuyên sử dụng create-react-app để tạo project React của các bạn. Trong bài viết này mình sẽ giới thiệu với các bạn một cách để xây dựng project React sử dụng Webpack 4 và Babel. Let’s get started 😃
										</Typography>
									</Box>
									<Typography className='text-12 mt-2 ml-8 text-[E0E0E0]'>20 phút trước</Typography>
								</Box>
							</Box>

						</Box>
						<Box className='w-full'>
							<Box className="flex gap-x-40 p-[18px] bg-[#effaff]">
								<CoreInput
									control={control}
									name="comment"
									className="w-[85%] bg-[white]"
									placeholder={'message'}
									sx={{
										'@media screen and (min-width: 600px)': {
											'.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
												fontWeight: 400,
												fontSize: '16px',
												paddingY: '12px !important',
												paddingX: '16px !important'
											},
										},

									}}
								/>
								<Button className='w-[100px] h-[40px] self-center bg-[red] text-[white] text-14 font-semibold'>
									Send
								</Button>
							</Box>
							<Divider />
						</Box>
					</Box>
				</Box >
			}
		/>
	)
}

export default React.memo(Chat)

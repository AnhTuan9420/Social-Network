import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from '@Core/helper/Yup'
import { useRequest } from 'ahooks'
import { facilityService } from '@App/Social/services/facilityService'
import DataPost from './components/DataPost'
import { useEditProfile } from './hooks/useEditProfile'

const Profile = props => {
	const { onOpenEditProfile, renderEditProfile } = useEditProfile()

	const {
		data: facility,
		run: getFacility,
		loading: loadingFacility
	} = useRequest(facilityService.getListFacility, {
		manual: true
	})

	useEffect(() => {
		const params = {
			favorite: 1
		}
		getFacility(params)
	}, [])

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
		<Box className="w-full pt-[64px] bg-[#f0f2f5]" >
			<Box className="w-full bg-white">
				<Box className='w-[60%] mx-auto bg-white pb-20'>
					<img className='w-full h-[350px] object-cover rounded-b-16' src='/img/bg.jpg' />
					<Box className='flex justify-center mb-[-80px]'>
						<img src='/Icons/man.png' className='rounded-[50%] h-[180px] w-[180px] translate-y-[-50%]' />
					</Box>
					<Box className='text-center'>
						<Typography className='text-36 font-bold'>Charlie</Typography>
						<Typography >@anhtuan_ss</Typography>
					</Box>
				</Box>
			</Box>

			<Box className="w-[60%] h-auto mx-auto mt-20 px-[28px]">
				<Box className='w-full flex gap-20'>
					<Box className='w-[40%] flex'>
						<Box className='sticky bottom-[20px] self-end w-full'>
							<Box className='bg-[white] p-16 rounded-8' sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
								<Typography className='font-bold mb-4'>Giới thiệu</Typography>
								<hr className='text-[#ddc1c1]' />

								<Box className='flex mt-8'>
									<Typography >Làm việc tại </Typography>
									<Typography className='font-bold ml-4'> Hà Nội</Typography>
								</Box>

								<Box className='flex mt-8'>
									<Typography >Học tại </Typography>
									<Typography className='font-bold ml-4'> Greenwich Việt Nam</Typography>
								</Box>

								<Box className='flex mt-8'>
									<Typography >Sống tại </Typography>
									<Typography className='font-bold ml-4'> Hà Nội</Typography>
								</Box>

								<Box className='flex mt-8'>
									<Typography >Số điện thoại </Typography>
									<Typography className='font-bold ml-4'> 0999999999</Typography>
								</Box>

								<Box className='flex mt-8'>
									<Typography >Tham gia vào </Typography>
									<Typography className='font-bold ml-4'> Tháng 7 năm 2014</Typography>
								</Box>

								<Button className='w-full mt-8 bg-[#e4e6eb] text-black font-bold' onClick={onOpenEditProfile} >
									Chỉnh sửa thông tin
								</Button>

							</Box>

							<Box className='bg-[white] p-16 rounded-8 mt-20' sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
								<Typography className='font-bold mb-4'>Vị trí hiện tại</Typography>
								<hr className='text-[#ddc1c1]' />
								<iframe className='w-full mt-12' src="https://s.net.vn/RPtP" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
							</Box>
							
						</Box>
					</Box>

					<Box className='w-[60%]'>
						<DataPost loadingFacility={loadingFacility} facility={facility} />
					</Box>
				</Box>
			</Box>
			{renderEditProfile()}
		</Box>

	)
}
export default React.memo(Profile)
import { useBoolean } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from '@Core/helper/Yup'
import CoreInput from '@Core/components/Input/CoreInput'

export const useCreatePostModal = () => {
	const [open, { setTrue, setFalse }] = useBoolean()

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

	const [selectedFile, setSelectedFile] = useState()
	const [preview, setPreview] = useState()

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined)
			return
		}

		const objectUrl = URL.createObjectURL(selectedFile)
		setPreview(objectUrl)

		return () => URL.revokeObjectURL(objectUrl)
	}, [selectedFile])

	const onSelectFile = e => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined)
			return
		}

		setSelectedFile(e.target.files[0])
	}

	const render = useCallback(() => {
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
				<DialogTitle className="p-16">
					<Box className="flex items-center">
						<IconButton onClick={() => setFalse()} className="p-0">
							<CloseOutlinedIcon color="primary" />
						</IconButton>
						<Typography className="mx-auto sm:text-[26px] text-16 font-semibold text-[#222222] leading-[140%]">
							Tạo bài viết
						</Typography>
					</Box>
				</DialogTitle>
				<Divider />
				<DialogContent className="p-0">
					<Box className="p-16">
						<Box className='mb-16 flex items-center'>
							<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />
							<Box>
								<Typography className='font-bold text-14'>Charlie</Typography>
							</Box>
						</Box>
						<textarea
							control={control}
							name="desc"
							className="w-full h-auto outline-none text-20 mb-16"
							placeholder={'Nhập mô tả của bài Post'}
						/>
						<Box className='mb-16'>
							{selectedFile && preview &&
								<Box>
									<IconButton onClick={() => setPreview(undefined) && setSelectedFile(undefined)} className="p-0">
										<CloseOutlinedIcon color="error"/>
									</IconButton>
									<img className='mb-16 object-contain w-full h-256' src={preview} />
								</Box>}
							<input type='file' onChange={onSelectFile} />
						</Box>
						<Box className='text-center'>
							<Button
								variant="contained"
								className="w-[60%] shadow-none font-semibold text-[#FFFFFF]"
							>
								Đăng
							</Button>
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
		)
	},
		[open, selectedFile, preview]
	)

	return { onOpen: setTrue, render }
}

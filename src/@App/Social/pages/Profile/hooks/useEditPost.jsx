import { useBoolean } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from '@Core/helper/Yup'
import imagefail from '@App/Social/assets/imagefail.svg'

export const useEditPost = (dataPost, refreshListPost) => {
	const [open, { setTrue, setFalse }] = useBoolean()

	const {
		control,
		handleSubmit,
		setValue,
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

	const handleClose = () => {
		setPreview(undefined)
		setSelectedFile(undefined)
	}

	useEffect(() => {
		setValue('desc', 'Charlie')
		setValue('file', 'Greenwich Việt Nam')
	}, [])

	const renderEditPost = useCallback(() => {
		return (
			<Dialog
				onClose={setFalse}
				open={open}
				maxWidth="md"
				fullWidth
				PaperProps={{
					style: {
						borderRadius: '8px',
						maxWidth: '700px'
					}
				}}
			>
				<DialogTitle className="p-16">
					<Box className="flex items-center">
						<IconButton onClick={() => setFalse()} className="p-0">
							<CloseOutlinedIcon color="error" />
						</IconButton>
						<Typography className="mx-auto sm:text-[26px] text-16 font-semibold text-[#222222] leading-[140%]">
							Chỉnh sửa thông tin post
						</Typography>
					</Box>
				</DialogTitle>
				<Divider />

				<DialogContent className="p-0">
					<Box className="p-16">
						<Box className='mb-16 flex items-center'>
							<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />
							<Box>
								<Typography className='font-bold text-14'>{dataPost?.userId?.fullName}</Typography>
							</Box>
						</Box>
						<textarea
							control={control}
							name="title"
							defaultValue={dataPost?.title}
							className="w-full outline-none text-20 mb-16 min-h-[100px]"
							placeholder={'Nhập mô tả của bài Post'}
						/>

						<Box className='mb-16'>
							<Box>
								{selectedFile && preview ?
									<Box className='flex items-start'>
										<Box className='mb-16 mx-auto max-w-[90%] h-[256px]'>
											<img className='object-contain w-full h-full' src={preview} />
										</Box>
										<IconButton onClick={() => handleClose()} className="p-0">
											<CloseOutlinedIcon color="error" />
										</IconButton>
									</Box>
									:
									<img className='mb-16 object-contain w-full h-256' src={dataPost?.image ?? imagefail} />
								}
							</Box>
							<input type='file' onChange={onSelectFile} />
						</Box>
					</Box>
				</DialogContent>
				<Divider />

				<DialogActions>
					<Box className='text-center p-8 flex justify-between w-full'>
						<Button
							variant="contained"
							className="bg-[#e4e6eb] shadow-none font-bold text-[black]"
							onClick={() => setFalse()}
						>
							Hủy
						</Button>
						<Button
							variant="contained"
							className="bg-[red] shadow-none font-semibold text-[#FFFFFF]"
						>
							Cập nhật
						</Button>
					</Box>
				</DialogActions>
			</Dialog >
		)
	},
		[open, selectedFile, preview]
	)

	return { onOpenEditPost: setTrue, renderEditPost }
}

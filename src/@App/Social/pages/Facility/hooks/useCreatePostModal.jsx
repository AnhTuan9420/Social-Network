import { useBoolean } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from '@Core/helper/Yup'
import { postService } from '@App/Social/services/postService'
import { errorMsg, successMsg } from '@Core/helper/Message'
import { getSocialUser } from '@Core/helper/Session'

export const useCreatePostModal = (refreshListPost) => {
	const [open, { setTrue, setFalse }] = useBoolean()
	const user = getSocialUser()

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, errors },
		watch,
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			title: '',
		},
		resolver: yupResolver(
			Yup.object({
				title: Yup.string().required('Required'),
			})
		)
	})

	const [selectedFile, setSelectedFile] = useState()
	const [preview, setPreview] = useState()
	const [submit, setSubmit] = useState(false)

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

	const onSubmit = handleSubmit(async data => {
		setSubmit(true)
		try {
			const formData = new FormData();
			formData.append('title', data?.title);
			formData.append('file', selectedFile);
			const res = await postService.createPost(formData)
			if (res) {
				setSubmit(false)
			}
			successMsg('Create post success.')
			setFalse()
			refreshListPost()
			setPreview(undefined)
			setSelectedFile(undefined)
		} catch (error) {
			setSubmit(false)
			errorMsg(error)
		}
	})

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
				<form encType="multipart/form-data">
					<DialogTitle className="p-16">
						<Box className="flex items-center">
							<IconButton onClick={() => setFalse()} className="p-0">
								<CloseOutlinedIcon color="error" />
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
									<Typography className='font-bold text-14'>{user?.fullName}</Typography>
								</Box>
							</Box>
							<Controller
								control={control}
								name="title"
								render={({ field: { onChange } }) =>
									<textarea
										onChange={onChange}
										className="bg-[white] w-full min-h-[100px] outline-none text-20 mb-16"
										placeholder={'Nhập mô tả của bài Post'}
									/>
								}
							/>

							<Box className='mb-16'>
								{selectedFile && preview &&
									<Box className='flex items-start'>
										<Box className='mb-16 mx-auto max-w-[90%] h-[256px]'>
											<img className='object-contain w-full h-full' src={preview} />
										</Box>
										<IconButton onClick={handleClose} className="p-0">
											<CloseOutlinedIcon color="error" />
										</IconButton>
									</Box>
								}
								<input type='file' name='file' onChange={onSelectFile} />
							</Box>
							<Box className='text-center'>
								{!submit ?
									<Button
										variant="contained"
										onClick={onSubmit}
										className="w-[60%] bg-[red] shadow-none text-16 font-semibold text-[#FFFFFF]"
									>
										Đăng
									</Button>
									:
									<Button
										variant="contained"
										disabled
										className="w-[60%] cursor-not-allowed shadow-none text-16 font-semibold text-[#FFFFFF]"
									>
										Đăng
									</Button>
								}
							</Box>
						</Box>
					</DialogContent>
				</form>
			</Dialog>
		)
	},
		[open, selectedFile, preview, submit]
	)

	return { onOpen: setTrue, render }
}

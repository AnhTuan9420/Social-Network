import { useBoolean } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from '@Core/helper/Yup'
import imagefail from '@App/Social/assets/imagefail.svg'
import { postService } from '@App/Social/services/postService'
import { successMsg } from '@Core/helper/Message'

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
			title: '',
		},
		resolver: yupResolver(
			Yup.object({
				title: Yup.string().required('Required')
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

	const deletePost = async () => {
		await postService.deletePost(dataPost?.id)
		refreshListPost()
		successMsg('Delete post success.')
		setFalse()
	}

	const onSubmit = handleSubmit(async data => {
		try {
			const formData = new FormData();
			formData.append('title', data?.title);
			await postService.updatePost(formData, dataPost?.id)
			successMsg('Update post success.')
			setFalse()
			refreshListPost()
		} catch (error) {
			errorMsg(error)
		}
	})

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
				<form encType="multipart/form-data">
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

							<Controller
								control={control}
								name="title"
								render={({ field: { onChange } }) =>
									<textarea
										onChange={onChange}
										defaultValue={dataPost?.title}
										className="bg-[white] w-full min-h-[100px] outline-none text-20 mb-16"
										placeholder={'Nhập mô tả của bài Post'}
									/>
								}
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
										<img className='mb-16 object-contain mx-auto h-256' src={dataPost?.image ?? imagefail} />
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
							<Box className='flex'>
								<Button
									variant="contained"
									onClick={deletePost}
									className="bg-[red] mr-10 shadow-none font-semibold text-[#FFFFFF]"
								>
									Xóa
								</Button>
								<Button
									variant="contained"
									onClick={onSubmit}
									className="bg-[red] shadow-none font-semibold text-[#FFFFFF]"
								>
									Cập nhật
								</Button>
							</Box>
						</Box>
					</DialogActions>
				</form>
			</Dialog >
		)
	},
		[open, selectedFile, preview]
	)

	return { onOpenEditPost: setTrue, renderEditPost }
}

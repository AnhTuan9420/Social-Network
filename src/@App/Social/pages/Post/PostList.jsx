import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import CoreInput from '@Core/components/Input/CoreInput'
import { getSocialUser } from '@Core/helper/Session'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
	Box,
	CircularProgress,
	IconButton,
	InputAdornment,
	Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import PostItem from './PostItem'
import TopLike from './TopLike'
import { useCreatePostModal } from './hooks/useCreatePostModal'

const PostList = props => {
	const { title } = props
	const user = getSocialUser()

	const { posts, getPost, loadingPost, refreshListPost } = props
	const { onOpen, render } = useCreatePostModal(refreshListPost)
	const [searching, setSearching] = useState(false)

	const [page, setPage] = useState(1)

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [page])

	const { control, getValues, handleSubmit, watch, setValue } = useForm({
		mode: 'onTouched',
		defaultValues: {
			title: title ?? ''
		}
	})

	const [data, setData] = useState([])

	useEffect(() => {
		if (posts) {
			setData(posts?.results)
		}
	}, [])

	useEffect(() => {
		if (posts) {
			setData(prev => {
				return [...prev, ...posts?.results]
			})
		}
	}, [posts])

	useEffect(() => {
		const params = {
			page: page,
			limit: 20,
			sortBy: 'createdAt:desc'
		}
		getPost(params)
	}, [page])

	const onSubmit = handleSubmit(async () => {
		try {
			const data = getValues()
			const params = {
				...data,
				page: page,
			}
			await getPost(params)
			setSearching(true)
		} catch (error) {
			console.log(error)
		}
	})

	const handerClear = (async () => {
		setValue('title', '')
		setSearching(false)
		const params = {
			page: page,
			limit: 20,
			sortBy: 'createdAt:desc'
		}
		await getPost(params)
	})

	return (
		<EventContentPage
			content={
				<>
					<Typography className='mt-20 font-bold'>
						Top lượt thích
					</Typography>
					<TopLike />

					<Typography className='mt-20 font-bold'>
						Tìm kiếm
					</Typography>
					<Box className="bg-[white] mt-20 rounded-8" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
						<form
							onSubmit={onSubmit}
							className=""
						>
							<Box className="p-10  flex flex-nowrap items-center justify-between w-full">
								<div className="w-full">
									<CoreInput
										control={control}
										name="title"
										placeholder="Tìm kiếm"
										variant="outlined"
										className="bg-white text-[20px]"
										sx={{
											'.MuiOutlinedInput-input': {
												padding: '16px',
												height: '24px'
											},
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													{searching ?
														<IconButton onClick={handerClear} className="p-0">
															<CloseOutlinedIcon color="error" />
														</IconButton>
														: null
													}
												</InputAdornment>
											)
										}}
									/>
								</div>
							</Box>
						</form>
					</Box>

					<Typography className='mt-20 font-bold'>
						Đăng bài
					</Typography>

					<Box className='flex items-center mt-20 p-16 bg-[white] rounded-8' sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
						<img src={user?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-[30px] rounded-[50%]' />
						<Typography className='cursor-pointer'
							onClick={onOpen}
						>Bạn có muốn đăng bài không?</Typography>
					</Box>

					<Typography className='mt-20 font-bold'>
						Danh sách bài đăng
					</Typography>

					<Box className="mt-20">
						{loadingPost ? (
							<div className="my-[15%] flex justify-center items-center">
								<CircularProgress />
							</div>
						) : (
							<Box className='flex flex-col gap-20 mb-20'>
								{posts?.results?.map((item, index) => {
									return <PostItem key={index} dataPost={item} />
								})}
							</Box>
						)}

					</Box>
					{render()}
				</>
			}
		/>
	)
}

export default React.memo(PostList)

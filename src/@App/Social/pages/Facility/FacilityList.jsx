import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import CoreInput from '@Core/components/Input/CoreInput'
import {
	Autocomplete,
	Box,
	Button,
	Chip,
	CircularProgress,
	TextField,
	Typography,
	useMediaQuery
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSearchDialog } from './hooks/useSearchDialog'
import { useCreatePostModal } from './hooks/useCreatePostModal'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
// import no_image from '@App/Social/assets/no_image.webp'
import trash from '@App/Social/assets/trash.svg'
import TopLike from './TopLike'
import PostItem from './PostItem'

const FacilityList = props => {
	const { tags, title } = props
	const navigate = useNavigate()

	const { posts, getPost, loadingPost } = props
	const { onOpen, render } = useCreatePostModal()
	const [searching, setSearching] = useState(false)
	const [searchFavorite, setSearchFavorite] = useState({
		label: '人気順',
		value: 1
	})
	const [pageApi, setPageApi] = useState(1)

	const isMobile = useMediaQuery('(max-width:600px)')

	const [searchTags, setSearchTags] = useState(tags ?? [])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [pageApi])

	const { control, getValues, handleSubmit, watch, setValue } = useForm({
		mode: 'onTouched',
		defaultValues: {
			title: title ?? ''
		}
	})

	const onSubmit = handleSubmit(async () => {
		try {
			const data = getValues()
			const params = {
				...data,
				page: pageApi,
			}
			await getPost(params)

			if (!watch('title') && addTags.length === 0) {
				setSearching(false)
				return
			}
			setSearching(true)
		} catch (error) {
			console.log(error)
		}
	})

	useEffect(() => {
		const params = {
			pageApi: pageApi,
			sortBy: 'createdAt:desc'
		}
		getPost(params)
	}, [pageApi])

	return (
		<EventContentPage
			header={
				<FormProvider>
					<Box className="bg-[#EFFAFF]">
						<form
							onSubmit={onSubmit}
							className="flex sm:flex-wrap items-center sm:w-[80%] lg:w-[1234px] w-full mx-auto py-16 sm:px-0 px-16 sm:py-[22px] overflow-auto"
						>
							<Box className="flex flex-wrap sm:flex-nowrap items-center justify-between w-full gap-x-22">

								<div className="w-full sm:w-[477px] sm:mb-0 mb-16">
									<CoreInput
										control={control}
										name="title"
										placeholder="フリーワード"
										variant="outlined"
										size="small"
										className="bg-white text-[20px]"
										sx={{
											'.MuiOutlinedInput-input': {
												padding: '16px',
												height: '24px'
											},
											'.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
												borderColor: 'white'
											}
										}}
									/>
								</div>
								<Box className="w-full sm:w-[200px] ">
									<Button
										variant="contained"
										disableElevation
										size="small"
										className="w-full h-[56px] sm:text-20 text-16 font-semibold py-12 "
										color="primary"
										type="submit"
										onClick={() => setSearchTags()}
									>
										検索する
									</Button>
								</Box>
							</Box>
						</form>
					</Box>
				</FormProvider>
			}
			content={
				<>
					<Typography className='mt-20 font-bold'>
						Top lượt thích
					</Typography>
					<TopLike />

					<Typography className='mt-20 font-bold'>
						Đăng bài
					</Typography>

					<Box className='flex items-center mt-20 p-16 bg-[white] rounded-8' sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
						<img src='/Icons/man.png' className='h-40 w-40 mr-[30px]' />
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
								{searching ? (
									<>
										<Box className="flex justify-between items-center sm:mt-[66px] mt-24 sm:mx-0 mx-16 sm:mb-[32px] mb-[16px]">
											<Box className="flex">
												<Typography className="sm:text-[26px] text-20 font-semibold sm:mr-32 mr-16 text-[#000000]">
													検索結果
												</Typography>
												<Typography className="sm:text-[26px] text-20 font-semibold sm:mr-8 mr-4 text-[#000000]">
													{posts?.data?.length}
												</Typography>
												<Typography className="sm:text-[26px] text-20 font-semibold text-[#000000]">
													件
												</Typography>
											</Box>
											<Button
												className="flex items-center cursor-pointer"
												onClick={() => handleRefresh()}
											>
												<img
													src={trash}
													className="sm:h-[18px] h-[14px] sm:mt-0 mt-2 sm:mr-[15px] mr-[7px]"
												/>
												<Typography className="sm:text-[20px] text-16 font-semibold">
													検索条件をクリア
												</Typography>
											</Button>
										</Box>

										<Box className="flex sm:ml-0 ml-16 sm:mb-16 mb-8">
											<Typography className="sm:text-[20px] text-16 mr-32 text-[#000000]">
												検索中のタグ
											</Typography>
											<Typography className="sm:text-[20px] text-16 mr-4 text-[#000000]">
												{searchTags?.length}
											</Typography>
											<Typography className="sm:text-[20px] text-16 text-[#000000]">
												件
											</Typography>
										</Box>
										<Box className="sm:mx-0 mx-16 flex flex-wrap sm:gap-16 gap-8 sm:mb-16 whitespace-nowrap">
											{searchTags?.map((tag, i) => (
												<Box
													className="py-4 w-max truncate px-12 bg-[#FFFFFF] text-[16px]
													text-[#00A0E9] border-solid border-[1px] rounded-[160px]"
													key={i}
												>
													#{tag?.name}
												</Box>
											))}
										</Box>

										{posts?.results?.length ? (
											<Autocomplete
												id="combo-box-demo"
												sx={{
													width: !isMobile ? 282 : 'full',
													marginLeft: isMobile ? '16px' : '0px',
													marginRight: isMobile ? '16px' : '0px',
													marginBottom: '32px',
													marginTop: '16px'
												}}
												renderInput={params => (
													<TextField
														{...params}
														inputProps={{
															...params.inputProps,
															readOnly: true
														}}
													/>
												)}
												defaultValue={1}
												clearIcon={null}
												options={[
													{
														label: '人気順',
														value: 1
													},
													{
														label: '新着順',
														value: 2
													}
												]}
												isOptionEqualToValue={(option, value) => option === value}
												value={searchFavorite}
												onChange={(_, value) => setSearchFavorite(value)}
												getOptionLabel={option => option.label}
											/>
										) : null}
									</>
								) : (
									null
								)}

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

export default React.memo(FacilityList)

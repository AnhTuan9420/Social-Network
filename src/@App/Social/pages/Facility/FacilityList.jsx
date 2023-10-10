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
import AddIcon from '@mui/icons-material/Add'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
// import no_image from '@App/Social/assets/no_image.webp'
import trash from '@App/Social/assets/trash.svg'
import { removeDataSession } from '@Core/helper/Session'
import TopLike from './TopLike'
import PostItem from './PostItem'

const FacilityList = props => {
	const { tags, facility_type } = props
	const navigate = useNavigate()

	const { facility, getFacility, loadingFacility } = props
	const { renderSearchDialog, handleOpenSearchDialog, addTags } = useSearchDialog(tags)
	const { onOpen, render } = useCreatePostModal()
	const [searching, setSearching] = useState(false)
	const [searchFavorite, setSearchFavorite] = useState({
		label: '人気順',
		value: 1
	})

	const isMobile = useMediaQuery('(max-width:600px)')

	const [pageApi, setPageApi] = useState(1)
	const [searchTags, setSearchTags] = useState(tags ?? [])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [pageApi])

	const { control, getValues, handleSubmit, watch, setValue } = useForm({
		mode: 'onTouched',
		defaultValues: {
			facility_type: facility_type ?? ''
		}
	})

	const onSubmit = handleSubmit(async () => {
		try {
			const data = getValues()
			const params = {
				...data,
				page: pageApi,
				tags: addTags?.map(item => item?.id)
			}
			await getFacility(params)

			if (!watch('facility_type') && addTags.length === 0) {
				setSearching(false)
				return
			}
			setSearching(true)
		} catch (error) {
			console.log(error)
		}
	})

	useEffect(() => {
		const data = getValues()
		if (facility_type || tags?.length > 0) {
			const listTags = tags?.map(item => item?.id)
			const params = {
				facility_type: facility_type,
				page: pageApi,
				tags: listTags
			}
			if (searchFavorite.value === 1) {
				params.favorite = 1
			} else if (searchFavorite.value === 2) {
				delete params.favorite
				params.created_at = 2
			}
			getFacility(params)
			setSearching(true)
		} else if (searchFavorite) {
			const params = {
				...data,
				page: pageApi,
				tags: addTags?.map(item => item?.id)
			}
			if (searchFavorite.value === 1) {
				params.favorite = 1
			} else if (searchFavorite.value === 2) {
				delete params.favorite
				params.created_at = 2
			}
			getFacility(params)
		}
	}, [searchFavorite, pageApi])

	const handleRefresh = () => {
		while (addTags.length > 0) {
			addTags.pop()
		}
		removeDataSession('session', 'tags')
		setValue('facility_type', '')
		getFacility()
		setSearching(false)
	}

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
								<Box
									className={
										isMobile
											? 'flex w-full sm:w-[477px] bg-white cursor-pointer sm:mb-0 mb-16'
											: 'flex w-full sm:w-[477px] bg-white cursor-pointer overflow-hidden '
									}
									onClick={handleOpenSearchDialog}
								>
									<Box className="w-full sm:w-[477px] text-[#00A0E9] h-[56px] px-16 sm:pr-0 sm:text-[20px] text-16 sm:py-12 py-20 not-italic font-semibold flex items-center sm:justify-start justify-between">
										{addTags?.length == 0 ? (
											'タグを選択'
										) : (
											<Box className="flex overflow-hidden w-full">
												{isMobile ? (
													<>
														{addTags?.slice(0, 2)?.map((tag, i) => (
															<Box className="mr-10">
																<Chip
																	key={i}
																	label={tag?.name}
																	color="secondary"
																	className="text-white text-16 font-light"
																/>
															</Box>
														))}
														{addTags?.length >= 2 && (
															<Typography className="">...</Typography>
														)}
													</>
												) : (
													addTags?.map((tag, i) => (
														<Box className="mr-10">
															<Chip
																key={i}
																label={tag?.name}
																color="secondary"
																className="text-white text-16 font-light"
															/>
														</Box>
													))
												)}
											</Box>
										)}
										{!isMobile ? (
											<> {addTags?.length > 0 ? null : <AddIcon fontSize="medium" />} </>
										) : (
											<AddIcon fontSize="medium" />
										)}
									</Box>
								</Box>
								<div className="w-full sm:w-[477px] sm:mb-0 mb-16">
									<CoreInput
										control={control}
										name="facility_type"
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
										onClick={() => setSearchTags(addTags)}
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
					<TopLike/>

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
						{loadingFacility ? (
							<div className="my-40 min-h-[50vh] flex justify-center items-center">
								<CircularProgress />
							</div>
						) : (
							<Box className='flex flex-col gap-20'>
								{searching ? (
									<>
										<Box className="flex justify-between items-center sm:mt-[66px] mt-24 sm:mx-0 mx-16 sm:mb-[32px] mb-[16px]">
											<Box className="flex">
												<Typography className="sm:text-[26px] text-20 font-semibold sm:mr-32 mr-16 text-[#000000]">
													検索結果
												</Typography>
												<Typography className="sm:text-[26px] text-20 font-semibold sm:mr-8 mr-4 text-[#000000]">
													{facility?.data?.length}
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

										{facility?.data?.length ? (
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

								{facility?.data?.map((item, index) => {
									return <PostItem key={index} dataPost={item} />
								})}
							</Box>
						)}

						{/* {facility?.data?.length > 0 ? (
							<Box className="mt-56 sm:mb-56 mb-24 sm:px-0 px-16 flex justify-center">
								{Math.ceil(facility?.total / facility?.per_page) > 1 ? (
									<Pagination
										count={Math.ceil(facility?.total / facility?.per_page)}
										siblingCount={0}
										size="large"
										page={pageApi}
										color="primary"
										onChange={(_, value) => setPageApi(value)}
										sx={{
											'@media screen and (min-width: 600px)': {
												'.MuiPagination-ul': {
													gap: '16px'
												},
												'.MuiPaginationItem-root': {
													fontSize: '20px',
													fontWeight: 300,
													color: '#00A0E9',
													lineHeight: '160%',
													margin: '0px',
													padding: '0px'
												},
												'.MuiPaginationItem-icon': {
													color: '#00A0E9'
												},
												'.MuiPaginationItem-root.Mui-selected ': {
													fontWeight: 600,
													fontSize: '20px',
													color: '#00A0E9',
													lineHeight: '160%',
													backgroundColor: '#ffffff !important'
												},
												'li:first-child': {
													marginRight: '54px'
												},
												'li:last-child': {
													marginLeft: '54px'
												}
											},
											'@media screen and (max-width: 600px)': {
												width: '100%',
												'.MuiPagination-ul': {
													justifyContent: 'center',
													gap: '8px'
												},
												'.MuiPaginationItem-root': {
													fontSize: '16px',
													fontWeight: 300,
													color: '#00A0E9',
													lineHeight: '140%',
													margin: '0px',
													padding: '0px'
												},
												'.MuiPaginationItem-icon': {
													color: '#00A0E9'
												},
												'.MuiPaginationItem-root.Mui-selected ': {
													fontWeight: 600,
													fontSize: '16px',
													color: '#00A0E9',
													lineHeight: '140%',
													backgroundColor: '#ffffff !important'
												},
												'.MuiPaginationItem-root.MuiPaginationItem-previousNext': {
													minWidth: '24px'
												},
												'li:first-child': {
													marginRight: 'auto'
												},
												'li:last-child': {
													marginLeft: 'auto'
												}
											}
										}}
									/>
								) : null}
							</Box>
						) : null} */}
					</Box>
					{renderSearchDialog()}
					{render()}
				</>
			}
		/>
	)
}

export default React.memo(FacilityList)

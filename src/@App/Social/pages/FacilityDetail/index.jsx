import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Button, Chip, CircularProgress, Divider, Stack, Typography, useMediaQuery } from '@mui/material'
import Image from 'mui-image'
import { get } from 'lodash'
import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import { useFacilityDetail } from './hooks/useEventDetail'
import './EventDetail.css'
import { useImageModal } from './hooks/useImageModal'
import FacilityImageSlide from './components/FacilityImageSlide'
import { useEntryDialog } from './hooks/useEntryDialog'
import { facilityService } from '@App/Social/services/facilityService'
import { useRequest } from 'ahooks'
import imagefail from '@App/Social/assets/imagefail.svg'

const getUrlMap = google_map_url => {
	const urlStartIndex = google_map_url?.indexOf('src="') + 5
	const urlEndIndex = google_map_url?.indexOf('"', urlStartIndex)
	const url = google_map_url?.substring(urlStartIndex, urlEndIndex)
	return url
}

const DetailEvent = props => {
	const { facilityDetail, loading } = useFacilityDetail()
	const { onOpen, render } = useImageModal()
	const isMobile = useMediaQuery('(max-width:600px)')

	const { data: apiFavorite, run: getFavorite } = useRequest(facilityService.isFavorite, {
		manual: true
	})

	const [isFavorited, setIsFavorited] = useState(false)

	useEffect(() => {
		if (facilityDetail?.id) {
			getFavorite(facilityDetail?.id)
		}
	}, [facilityDetail?.id, isFavorited])

	useEffect(() => {
		if (apiFavorite?.id) {
			setIsFavorited(true)
		}
	}, [apiFavorite?.id])

	const handleLikeFacility = async () => {
		const dataSubmit = {
			facility_id: facilityDetail?.id
		}
		await facilityService.favorite(dataSubmit)
		setIsFavorited(true)
	}

	const handleUnLikeFacility = async () => {
		await facilityService.unFavorite(apiFavorite?.id)
		setIsFavorited(false)
	}




	const title = {
		1: '平日',
		2: '土曜日',
		3: '日曜日',
		4: '祝日'
	}

	const titleRegularHoliday = {
		0: 'なし',
		1: '月曜日',
		2: '火曜日',
		3: '水曜日',
		4: '木曜日',
		5: '金曜日',
		6: '土曜日',
		7: '日曜日'
	}

	const mainImage = []
	mainImage?.push(facilityDetail?.image?.main)
	const totalImage = mainImage?.concat(facilityDetail?.image?.sub)

	return (
		<EventContentPage
			maxWidth={1128}
			hasBreadcrumb={false}
			content={
				<Box className="sm:pt-[20px] sm:pb-[56px] pb-[80px] w-full">
					{loading ? (
						<div className="my-40 min-h-[50vh] flex justify-center items-center">
							<CircularProgress />
						</div>
					) : (
						<>

							<Box className="flex flex-wrap sm:flex-nowrap gap-10">
								<Box className="w-full h-[472px] object-cover">
									<Image src={facilityDetail?.image?.main?.image_url ?? imagefail} />
								</Box>
								{facilityDetail?.image?.sub ?
									<Box className="w-[240px]">
										<Stack spacing={1}>
											{facilityDetail?.image?.sub
												?.filter((_, index) => index < 3)
												?.map(image => (
													<Image src={image?.image_url ?? imagefail} height={135} />
												))}
											{facilityDetail?.image?.sub && facilityDetail?.image?.sub?.length > 0 ? (
												<Button
													variant="outlined"
													onClick={onOpen}
													className="sm:w-[240px] lowercase w-full px-0 text-20 text-[#00A0E9] font-semibold border-solid border-1 sm:leading-[160%] shadow-none"
												>
													Xem thêm ảnh
												</Button>
											) : null}
										</Stack>
									</Box>
									: null
								}
							</Box>
							<Box className="">
								<Typography className='mt-16'>
									Đu đủ (danh pháp khoa học: Carica papaya) là một cây thuộc họ Đu đủ.[3] Đây là cây thân thảo to, không hoặc ít khi có nhánh, cao từ 3–10 m. Lá to hình chân vịt, cuống dài, đường kính 50–70 cm, có khoảng 7 khía. Hoa trắng hay xanh, đài nhỏ, vành to năm cánh. Quả đu đủ to tròn, dài, khi chín mềm, hạt màu nâu hoặc đen tùy từng loại giống, có nhiều hạt.
								</Typography>
								<Box className='my-16 flex'>
									<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />
									<Box>
										<Typography className='font-bold text-14'>Charlie</Typography>
										<Typography className='text-12'>20 phút trước</Typography>
									</Box>
								</Box>

								<hr className='text-[#ddc1c1]' />
								<Box className='py-4 flex justify-between'>
									<Button className='w-[30%] flex'>
										<img src='/Icons/like.png' className='h-20 w-20 mr-6' />
										<Typography className='text-[red] lowercase font-bold'>
											Thích
										</Typography>
									</Button>
									<Button className='w-[30%] flex cursor-not-allowed'>
										<img src='/Icons/comment.png' className='h-20 w-20 mr-6' />
										<Typography className='text-[#65676b] lowercase font-bold'>
											Bình luận
										</Typography>
									</Button>
									<Button className='w-[30%] flex'>
										<img src='/Icons/share.png' className='h-20 w-20 mr-6' />
										<Typography className='text-[#65676b] lowercase font-bold'>
											Chia sẻ
										</Typography>
									</Button>
								</Box>
								<hr className='text-[#ddc1c1]' />

								<Typography className='text-[#65676b] font-semibold my-16'>
									Bình luận
								</Typography>

								<Box className='my-16 flex'>
									<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />
									<Box>
										<Box className='p-10 bg-[#e4e6eb] rounded-8'>
											<Typography className='font-bold text-14'>Charlie</Typography>
											<Typography className='text-14'>Bức ảnh này đẹp quá!</Typography>

										</Box>
										<Typography className='text-12 mt-2 ml-8'>20 phút trước</Typography>
									</Box>
								</Box>

								<Box className='my-16 flex'>
									<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />
									<Box>
										<Box className='p-10 bg-[#e4e6eb] round-8'>
											<Typography className='font-bold text-14'>Charlie</Typography>
											<Typography className='text-14'>Bức ảnh này đẹp quá!Bức ảnh này đẹp quá!Bức ảnh này đẹp quá!Bức ảnh này đẹp quá!Bức ảnh này đẹp quá!Bức ảnh này đẹp quá!Bức ảnh này đẹp quá!</Typography>

										</Box>
										<Typography className='text-12 mt-2 ml-8'>20 phút trước</Typography>
									</Box>
								</Box>

							</Box>
						</>
					)}
					{render(totalImage)}
				</Box>
			}
		/>
	)
}

export default React.memo(DetailEvent)

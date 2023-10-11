import { ROUTER_SOCIAL } from "@App/Social/configs/constants"
import { Box, Button, Typography } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import imagefail from '@App/Social/assets/imagefail.svg'
import { useShareModal } from "../../FacilityDetail/hooks/useShareModal"

const PostItem = props => {
    const { dataPost } = props
    const navigate = useNavigate()
    const { onOpenShare, renderShare } = useShareModal()

    const [isFavorited, setIsFavorited] = useState(false)

    const handleLikeFacility = async () => {
        // const dataSubmit = {
        //     facility_id: facilityDetail?.id
        // }
        // await facilityService.favorite(dataSubmit)
        setIsFavorited(true)
    }

    const handleUnLikeFacility = async () => {
        // await facilityService.unFavorite(apiFavorite?.id)
        setIsFavorited(false)
    }

    return (
        <Box className="bg-[white] sm:border border-b-1 max-w-full border-[#e0e0e0] sm:rounded-8 sm:border-[#E0E0E0] sm:min-h-[540px] p-[16px]"
            sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
        >
            <Box className='mb-16 flex'>
                <img src='/Icons/man.png' className='h-40 w-40 mr-[15px] cursor-pointer'
                    onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user=${999}`)}
                />
                <Box>
                    <Typography className='font-bold text-14 cursor-pointer'
                        onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user=${999}`)}
                    >
                        Charlie
                    </Typography>
                    <Typography className='text-12'>20 phút trước</Typography>
                </Box>
            </Box>

            <Box className='mb-16'>
                <Typography className='text_truncate_4'>
                    Đu đủ (danh pháp khoa học: Carica papaya) là một cây thuộc họ Đu đủ.[3] Đây là cây thân thảo to, không hoặc ít khi có nhánh, cao từ 3–10 m. Lá to hình chân vịt, cuống dài, đường kính 50–70 cm, có khoảng 7 khía. Hoa trắng hay xanh, đài nhỏ, vành to năm cánh. Quả đu đủ to tròn, dài, khi chín mềm, hạt màu nâu hoặc đen tùy từng loại giống, có nhiều hạt.
                </Typography>
            </Box>

            <Box
                onClick={() =>
                    navigate(
                        `${ROUTER_SOCIAL.event.detail}/?facility_id=${dataPost?.id}`
                    )
                }>
                <img
                    className="h-[500px] w-full object-cover cursor-pointer "
                    src={dataPost?.main_image?.image_url ?? imagefail}
                    duration={500}
                />
            </Box>
            <Box className="pt-10">
                <hr className='text-[#ddc1c1]' />
                <Box className='py-4 flex justify-between'>

                    {isFavorited ?
                        <Button className='w-[30%] flex'
                            onClick={handleUnLikeFacility}
                        >
                            <img src='/Icons/like.png' className='h-20 w-20 mr-6' />
                            <Typography className='text-[red] lowercase font-bold'>
                                Thích
                            </Typography>
                        </Button>
                        :
                        <Button className='w-[30%] flex'
                            onClick={handleLikeFacility}
                        >
                            <img src='/Icons/unlike.png' className='h-20 w-20 mr-6' />
                            <Typography className='text-[#65676b] lowercase font-bold'>
                                Thích
                            </Typography>
                        </Button>
                    }

                    <Button className='w-[30%] flex'
                        onClick={() =>
                            navigate(
                                `${ROUTER_SOCIAL.event.detail}/?facility_id=${dataPost?.id}`
                            )
                        }
                    >
                        <img src='/Icons/comment.png' className='h-20 w-20 mr-6' />
                        <Typography className='text-[#65676b] lowercase font-bold'>
                            Bình luận
                        </Typography>
                    </Button>
                    <Button className='w-[30%] flex'
                        onClick={onOpenShare}
                    >
                        <img src='/Icons/share.png' className='h-20 w-20 mr-6' />
                        <Typography className='text-[#65676b] lowercase font-bold'>
                            Chia sẻ
                        </Typography>
                    </Button>
                </Box>
                <hr className='text-[#ddc1c1]' />
            </Box>

            <Typography className='text-[#65676b] font-semibold my-16'>
                Bình luận
            </Typography>

            <Box className='my-16 flex'>
                <img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />
                <Box>
                    <Box className='p-10 bg-[#f0f2f5] rounded-8'>
                        <Typography className='font-bold text-14'>Charlie</Typography>
                        <Typography className='text-14'>Bức ảnh này đẹp quá!</Typography>
                    </Box>
                    <Typography className='text-12 mt-2 ml-8'>20 phút trước</Typography>

                </Box>
            </Box>

            <Typography className='text-[#65676b] font-semibold mt-16 cursor-pointer'
                onClick={() =>
                    navigate(
                        `${ROUTER_SOCIAL.event.detail}/?facility_id=${dataPost?.id}`
                    )
                }>
                Xem thêm bình luận
            </Typography>
            {renderShare()}
        </Box>

    )
}

export default React.memo(PostItem)

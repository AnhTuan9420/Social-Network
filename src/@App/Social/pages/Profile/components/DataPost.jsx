import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useCreatePostModal } from "../../Facility/hooks/useCreatePostModal"
import imagefail from '@App/Social/assets/imagefail.svg'
import { ROUTER_SOCIAL } from "@App/Social/configs/constants"
import { useNavigate } from "react-router-dom"
import { useEditPost } from "../hooks/useEditPost"
import { useState } from "react"

const DataPost = (props) => {
    const { loadingFacility, facility } = props
    const [dataPost, setDataPost] = useState()
    const { onOpen, render } = useCreatePostModal()
    const { onOpenEditPost, renderEditPost } = useEditPost()
    const navigate = useNavigate()

    const handleOpenEditPostDialog = (item) => {
        onOpenEditPost()
        setDataPost(item)
    }

    return (
        <Box>
            <Box className='flex items-center mb-20 p-16 bg-[white] rounded-8' sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                <img src='/Icons/man.png' className='h-40 w-40 mr-[30px]' />
                <Typography className='cursor-pointer'
                    onClick={onOpen}
                >Bạn có muốn đăng bài không?</Typography>
            </Box>

            <Box className='flex flex-col gap-20'>
                {loadingFacility ? (
                    <div className="my-40 min-h-[10vh] flex justify-center items-center">
                        <CircularProgress />
                    </div>
                ) : (
                    facility?.data?.map((item, index) => {
                        return (
                            <Box key={index} className="bg-[white] sm:border border-b-1 max-w-full border-[#e0e0e0] sm:rounded-8 sm:border-[#E0E0E0] sm:min-h-[540px] p-[16px]"
                                sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
                            >
                                <Box className='flex items-center justify-between'>
                                    <Box className='mb-16 flex'>
                                        <img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />
                                        <Box>
                                            <Typography className='font-bold text-14'>Charlie</Typography>
                                            <Typography className='text-12'>20 phút trước</Typography>
                                        </Box>
                                    </Box>
                                    <Box className='cursor-pointer' onClick={() => handleOpenEditPostDialog(item)}>
                                        <img src='/Icons/edit.png' className='mt-[-16px] h-20 w-20' />
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
                                            `${ROUTER_SOCIAL.event.detail}/?facility_id=${item?.id}`
                                        )
                                    }>
                                    <img
                                        className="h-[500px] w-full object-cover cursor-pointer "
                                        src={item?.main_image?.image_url ?? imagefail}
                                        duration={500}
                                    />
                                </Box>
                                <Box className="pt-10">
                                    <hr className='text-[#ddc1c1]' />
                                    <Box className='py-4 flex justify-between'>
                                        <Button className='w-[30%] flex'>
                                            <img src='/Icons/like.png' className='h-20 w-20 mr-6' />
                                            <Typography className='text-[red] lowercase font-bold'>
                                                Thích
                                            </Typography>
                                        </Button>
                                        <Button className='w-[30%] flex'
                                            onClick={() =>
                                                navigate(
                                                    `${ROUTER_SOCIAL.event.detail}/?facility_id=${item?.id}`
                                                )
                                            }
                                        >
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
                                            `${ROUTER_SOCIAL.event.detail}/?facility_id=${item?.id}`
                                        )
                                    }>
                                    Xem thêm bình luận
                                </Typography>
                            </Box>
                        )
                    })
                )}
            </Box>
            {render()}
            {renderEditPost(dataPost)}
        </Box >
    )
}

export default DataPost

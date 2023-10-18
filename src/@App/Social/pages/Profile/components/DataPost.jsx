import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useCreatePostModal } from "../../Facility/hooks/useCreatePostModal"
import imagefail from '@App/Social/assets/imagefail.svg'
import { ROUTER_SOCIAL } from "@App/Social/configs/constants"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEditPost } from "../hooks/useEditPost"
import React, { useEffect, useState } from "react"
import { useShareModal } from "../../FacilityDetail/hooks/useShareModal"
import { getSocialUser } from "@Core/helper/Session"
import { postService } from "@App/Social/services/postService"
import { useRequest } from "ahooks"
import { timeAgo } from "@Core/helper/Date"
import { useDeleteCommentModal } from "../../Facility/hooks/useDeleteCommentModal"

const DataPost = (props) => {
    const { dataPost, refreshListPost } = props
    const user = getSocialUser()
    let [searchParams] = useSearchParams()
    const user_id = searchParams.get('user_id')
    const { onOpenEditPost, renderEditPost } = useEditPost(dataPost, refreshListPost)
    const navigate = useNavigate()

    const handleOpenEditPostDialog = (item) => {
        onOpenEditPost()
    }

    const {
        data: listComment,
        run: getComment,
        loading: loadingComment
    } = useRequest(postService.listComment, {
        manual: true
    })

    const {
        data: totalLike,
        run: getTotalLike,
        loading: loadingTotalLike
    } = useRequest(postService.totalLike, {
        manual: true
    })

    useEffect(() => {
        const params = {
            postId: dataPost.id,
            sortBy: 'createdAt:desc'
        }
        getComment(params)
        getTotalLike(dataPost?.id)
    }, [dataPost.id])

    const { onOpenDeleteComment, renderDeleteComment } = useDeleteCommentModal(getComment)


    const { onOpenShare, renderShare } = useShareModal()

    const [isFavorited, setIsFavorited] = useState(false)

    const { data: apiHasLike, run: getFavorite } = useRequest(postService.checkUserLike, {
        manual: true
    })

    useEffect(() => {
        getFavorite(dataPost.id)
    }, [dataPost.id, isFavorited])

    useEffect(() => {
        if (apiHasLike?.id) {
            setIsFavorited(true)
        }
    }, [apiHasLike?.id])

    const handleLikeFacility = async () => {
        const dataSubmit = {
            postId: dataPost?.id
        }
        await postService.like(dataSubmit)
        setIsFavorited(true)
        getTotalLike(dataPost?.id)
    }

    const handleUnLikeFacility = async () => {
        await postService.unLike(apiHasLike?.id)
        setIsFavorited(false)
        getTotalLike(dataPost?.id)
    }

    return (
        <Box className="bg-[white] sm:border border-b-1 max-w-full border-[#e0e0e0] sm:rounded-8 sm:border-[#E0E0E0] sm:min-h-[540px] p-[16px]"
            sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
        >
            <Box className='flex items-center justify-between'>
                <Box className='mb-16 flex'>
                    <img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' />
                    <Box>
                        <Typography className='font-bold text-14'>{dataPost?.userId?.fullName}</Typography>
                        <Typography className='text-12'>{timeAgo(dataPost?.createdAt)}</Typography>
                    </Box>
                </Box>
                {user?.id === user_id ?
                    <Box className='cursor-pointer' onClick={() => handleOpenEditPostDialog(dataPost)}>
                        <img src='/Icons/update.png' className='mt-[-22px] h-20 w-20' />
                    </Box>
                    : null
                }
            </Box>

            <Box className='mb-16'>
                <Typography className='break-keep'>
                    {dataPost?.title}
                </Typography>
            </Box>

            <Box
                className='bg-[pink]'
                onClick={() =>
                    navigate(
                        `${ROUTER_SOCIAL.event.detail}/?facility_id=${dataPost?.id}`
                    )
                }>
                <img
                    className="h-[600px] w-full object-contain cursor-pointer "
                    src={dataPost?.image ?? imagefail}
                    duration={500}
                />
            </Box>

            <Box className='mt-10 flex justify-between mx-14'>
                <Typography className='text-16 underline'>{totalLike?.totalLike} lượt thích</Typography>
                <Typography className='text-16 underline'>{listComment?.totalResults} bình luận</Typography>
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
                Bình luận ({listComment?.totalResults})
            </Typography>

            {loadingComment ? (
                <div className="my-[15%] flex justify-center items-center">
                    <CircularProgress />
                </div>
            ) : (
                listComment?.results?.length > 0 ?
                    (listComment?.results?.length > 5 ?
                        <Box>
                            {listComment?.results?.slice(0, 5)?.map((item, index) => {
                                return (
                                    <Box key={index} className='my-16 flex'>
                                        <img src='/Icons/man.png' className='h-40 w-40 mr-[15px] cursor-pointer'
                                            onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${item?.userId?.id}`)}
                                        />
                                        <Box>
                                            <Box className='p-10 bg-[#f0f2f5] rounded-8'>
                                                <Typography className='font-bold text-14 cursor-pointer'
                                                    onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${item?.userId?.id}`)}
                                                >
                                                    {item?.userId?.fullName}
                                                </Typography>
                                                <Typography className='text-14 break-all'>
                                                    {item?.content?.split('\n').map((text, i) => (
                                                        <React.Fragment key={i}>
                                                            {text}
                                                            <br />{' '}
                                                        </React.Fragment >
                                                    ))}
                                                </Typography>
                                            </Box>
                                            <Box className='flex'>
                                                <Typography className='text-12 mt-2 ml-8 mr-10'>{timeAgo(item?.createdAt)}</Typography>
                                                {user?.id === item?.userId?.id ?
                                                    <Typography className='text-12  text-[red] mt-2 ml-8 cursor-pointer'
                                                        onClick={onOpenDeleteComment}
                                                    >
                                                        delete
                                                    </Typography>
                                                    : null
                                                }
                                            </Box>

                                        </Box>
                                        {user?.id === item?.userId?.id ? renderDeleteComment(item?.id, dataPost.id) : null}
                                    </Box>
                                )
                            })}
                            {
                                listComment?.results?.length > 5 ?
                                    <Typography className='text-[black] my-16 underline cursor-pointer'
                                        onClick={() =>
                                            navigate(
                                                `${ROUTER_SOCIAL.event.detail}/?facility_id=${dataPost?.id}`
                                            )
                                        }
                                    >
                                        Xem thêm bình luận
                                    </Typography>
                                    : null
                            }
                        </Box>
                        :
                        listComment?.results?.map((item, index) => {
                            return (
                                <Box key={index} className='my-16 flex'>
                                    <img src='/Icons/man.png' className='h-40 w-40 mr-[15px] cursor-pointer'
                                        onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${item?.userId?.id}`)}
                                    />
                                    <Box>
                                        <Box className='p-10 bg-[#f0f2f5] rounded-8'>
                                            <Typography className='font-bold text-14 cursor-pointer'
                                                onClick={() => navigate(`${ROUTER_SOCIAL.user.profile}/?user_id=${item?.userId?.id}`)}
                                            >
                                                {item?.userId?.fullName}
                                            </Typography>
                                            <Typography className='text-14 break-all'>
                                                {item?.content?.split('\n').map((text, i) => (
                                                    <React.Fragment key={i}>
                                                        {text}
                                                        <br />{' '}
                                                    </React.Fragment >
                                                ))}
                                            </Typography>
                                        </Box>
                                        <Box className='flex'>
                                            <Typography className='text-12 mt-2 ml-8 mr-10'>{timeAgo(item?.createdAt)}</Typography>
                                            {user?.id === item?.userId?.id ?
                                                <Typography className='text-12  text-[red] mt-2 ml-8 cursor-pointer'
                                                    onClick={onOpenDeleteComment}
                                                >
                                                    delete
                                                </Typography>
                                                : null
                                            }
                                        </Box>

                                    </Box>
                                    {user?.id === item?.userId?.id ? renderDeleteComment(item?.id, dataPost.id) : null}
                                </Box>
                            )
                        })
                    ) :
                    <Typography className='text-[black] my-16'>
                        Hiện bào post này chưa có bình luận.
                    </Typography>

            )}

            {renderEditPost()}
            {renderShare()}
        </Box>
    )
}

export default DataPost

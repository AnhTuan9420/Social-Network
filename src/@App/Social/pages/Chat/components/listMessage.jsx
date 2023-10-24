import { chatService } from "@App/Social/services/chatService"
import CoreInput from "@Core/components/Input/CoreInput"
import { timeAgo } from "@Core/helper/Date"
import { getSocialUser } from "@Core/helper/Session"
import { Box, Button, CircularProgress, Divider, Typography } from "@mui/material"
import { useRequest } from "ahooks"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import UserMessage from "./userMessage"

const ChatMessage = props => {
    const { user_id, socket } = props
    const user = getSocialUser()

    const {
        data: listMessage,
        run: getListMessage,
        loading: loadingListUser,
        refresh: refreshListMessage
    } = useRequest(chatService.getListMessage, {
        manual: true
    })

    useEffect(() => {
        const dataSubmit = {
            sortBy: 'createdAt:desc',
            to: user_id
        }
        getListMessage(dataSubmit)
    }, [user_id])

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (listMessage?.results) {
            setMessages(listMessage?.results)
        }

    }, [listMessage]);

    useEffect(() => {
        if (socket) {
            socket.on('message', (message) => {
                setMessages((prevMessages) => [message, ...prevMessages]);
            });
        }
    }, [socket]);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        watch,
        setValue
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            content: '',
        }
    })

    const onSubmit = handleSubmit(async data => {
        if (socket) {
            const dataSubmit = {
                content: data.content,
                to: user_id,
            }
            const res = await chatService.createMessage(dataSubmit)
            if (res) {
                setValue('content', '')
            }
        }
    })

    return (
        <Box>
            <Box className="px-[30px] py-[18px] overflow-y-scroll h-[617px] flex flex-col-reverse gap-y-[5px]"
                sx={{
                    '::-webkit-scrollbar': {
                        width: '0px'
                    }
                }}
            >
                {loadingListUser ?
                    <div className="my-[30%] flex justify-center items-center">
                        <CircularProgress />
                    </div>
                    :
                    messages?.length > 0 ?
                        messages?.map((item, index) => {
                            if (item?.from.id === user?.id) {
                                return (
                                    <UserMessage key={index} dataMess={item} refreshListMessage={refreshListMessage} />
                                )
                            } else {
                                return (
                                    <Box key={index} className='flex justify-start'>
                                        <img src={item?.from?.avatar ?? '/Icons/man.png'} className='h-40 w-40 mr-[15px] rounded-[50%]' />

                                        <Box className='max-w-[40%]'>
                                            <Box className='py-10 px-[18px] bg-[#e4e6eb] rounded-8'>
                                                <Typography className='text-16 font-400 break-keep'>
                                                    {item?.content}
                                                </Typography>
                                            </Box>
                                            <Typography className='text-12 mt-2 ml-8 text-[E0E0E0]'>{timeAgo(item?.createdAt)}</Typography>
                                        </Box>
                                    </Box>
                                )
                            }
                        })
                        :
                        <Typography className="text-center text-16 mb-20">
                            Hiện bạn đang chưa có tin nhắn nào. Hãy bắt đầu chat nào.
                        </Typography>
                }
            </Box>
            <form onSubmit={onSubmit}>
                <Box className='w-full'>
                    <Box className="flex gap-x-40 p-[18px] bg-[#effaff]">
                        <CoreInput
                            control={control}
                            name="content"
                            className="w-[85%] bg-[white]"
                            placeholder={'Nhập tin nhắn ...'}
                            sx={{
                                '@media screen and (min-width: 600px)': {
                                    '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        paddingY: '12px !important',
                                        paddingX: '16px !important'
                                    },
                                },

                            }}
                        />
                        <Button
                            type="submit"
                            className='w-[100px] h-[40px] self-center bg-[red] text-[white] text-14 font-semibold'
                        >
                            Send
                        </Button>
                    </Box>
                    <Divider />
                </Box>
            </form>
        </Box >
    )
}

export default React.memo(ChatMessage)
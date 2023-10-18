import { Box, Typography } from "@mui/material"
import React from "react"
import { useDeleteMessageModal } from "../hooks/useDeleteCommentModal"
import { timeAgo } from "@Core/helper/Date"


const UserMessage = props => {
    const { dataMess, refreshListMessage } = props
    const { onOpenDeleteMessage, renderDeleteMessage } = useDeleteMessageModal(refreshListMessage)

    return (
        <Box className='flex justify-end'>
            <Box className='mr-[15px] max-w-[40%]'>
                <Box className='py-10 px-[20px]  bg-[red] rounded-8'>
                    <Typography className='text-16 text-[white] font-400 break-keep'>
                        {dataMess?.content}
                    </Typography>
                </Box>
                <Box className='flex'>
                    <Typography className='text-12 text-end mt-2 ml-8 text-[E0E0E0]'>{timeAgo(dataMess?.createdAt)}</Typography>
                    <Typography className='text-12  text-[red] mt-2 ml-10 cursor-pointer'
                        onClick={onOpenDeleteMessage}
                    >
                        delete
                    </Typography>
                </Box>
            </Box>
            <img src='/Icons/man.png' className='h-40 w-40' />
            {renderDeleteMessage(dataMess?.id)}
        </Box>
    )
}

export default React.memo(UserMessage)
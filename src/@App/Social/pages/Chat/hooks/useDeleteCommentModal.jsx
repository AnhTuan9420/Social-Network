import { useBoolean } from 'ahooks'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { chatService } from '@App/Social/services/chatService'

export const useDeleteMessageModal = (refreshListMessage) => {
	const [open, { setTrue, setFalse }] = useBoolean()

	const handleDeleteMessage = async (messageId) => {
		await chatService.deleteMessage(messageId)
		setFalse()
		refreshListMessage()
	}

	const renderDeleteMessage = useCallback((messageId) => {
		return (
			<Dialog
				onClose={setFalse}
				open={open}
				maxWidth="md"
				fullWidth
				PaperProps={{
					style: {
						borderRadius: '8px',
						maxWidth: '600px'
					}
				}}
			>
				<DialogTitle className="p-16">
					<Box className="flex items-center">
						<IconButton onClick={() => setFalse()} className="p-0">
							<CloseOutlinedIcon color="error" />
						</IconButton>
						<Typography className="mx-auto sm:text-[26px] text-16 font-semibold text-[#222222] leading-[140%]">
							Delete Message
						</Typography>
					</Box>
				</DialogTitle>
				<Divider />
				<DialogContent className="p-0">
					<Box className="p-16">

						<Typography className='text-16'>Do you want to delete message?</Typography>

						<Box className='text-center mt-10'>
							<Button
								variant="contained"
								className="w-[60%] bg-[red] shadow-none text-16 font-semibold text-[#FFFFFF]"
								onClick={() => handleDeleteMessage(messageId)}
							>
								Delete
							</Button>
						</Box>
					</Box>
				</DialogContent>
			</Dialog>
		)
	},
		[open]
	)

	return { onOpenDeleteMessage: setTrue, renderDeleteMessage }
}

import { postService } from '@App/Social/services/postService'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import { useBoolean } from 'ahooks'
import { useCallback } from 'react'

export const useDeleteCommentModal = (getComment) => {
	const [open, { setTrue, setFalse }] = useBoolean()

	const handleDeleteComment = async (commentId, postId) => {
		await postService.deleteComment(commentId)
		setFalse()
		const params = {
            postId: postId,
            sortBy: 'createdAt:desc'
        }
        getComment(params)
	}

	const renderDeleteComment = useCallback((commentId, postId) => {
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
							Delete Comment
						</Typography>
					</Box>
				</DialogTitle>
				<Divider />
				<DialogContent className="p-0">
					<Box className="p-16">

						<Typography className='text-16'>Do you want to delete comment?</Typography>

						<Box className='text-center mt-10'>
							<Button
								variant="contained"
								className="w-[60%] bg-[red] shadow-none text-16 font-semibold text-[#FFFFFF]"
								onClick={() => handleDeleteComment(commentId, postId)}
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

	return { onOpenDeleteComment: setTrue, renderDeleteComment }
}

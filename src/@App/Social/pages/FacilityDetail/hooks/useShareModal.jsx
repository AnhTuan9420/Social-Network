import { useBoolean } from 'ahooks'
import { useCallback } from 'react'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import {
	FacebookShareButton,
	WhatsappShareButton,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TelegramShareButton,
	TelegramIcon,
} from 'react-share';

export const useShareModal = () => {
	const [open, { setTrue, setFalse }] = useBoolean()
	const shareUrl = 'https://www.facebook.com/lacian.vn?locale=vi_VN'

	const renderShare = useCallback(
		facilityDetail => {
			console.log(facilityDetail);
			return (
				<Dialog
					onClose={setFalse}
					open={open}
					maxWidth="sm"
					fullWidth
				>
					<DialogTitle className="sm:p-24 p-16 bg-[red] relative">
						<Box className="flex items-center">
							<IconButton onClick={() => setFalse()} className=" absolute top-0 right-0">
								<CloseOutlinedIcon className='text-[white]' />
							</IconButton>
							<Typography className="mx-auto text-[30px] font-semibold text-[white] leading-[140%]">
								Chia sẻ lên các nền tảng
							</Typography>
						</Box>
					</DialogTitle>

					<DialogContent className="p-24">
						<Box className="sm:p-24 p-16 flex gap-20 justify-center sm:h-80 h-[54px]">
							<FacebookShareButton
								url={shareUrl}
								// quote={'Title or jo bhi aapko likhna ho'}
								hashtag={'#photovibe'}
							>
								<FacebookIcon size={40} round={true} />
							</FacebookShareButton>

							<WhatsappShareButton
								url={shareUrl}
								// quote={'Title or jo bhi aapko likhna ho'}
								hashtag={'#photovibe'}
							>
								<WhatsappIcon size={40} round={true} />
							</WhatsappShareButton>

							<TwitterShareButton
								// title={"test"}
								url={shareUrl}
								hashtags={["PhotoVide", "Photo"]}
							>
								<TwitterIcon size={40} round />
							</TwitterShareButton>

							<LinkedinShareButton
								url={shareUrl}
								hashtags={["PhotoVide", "Photo"]}
							>
								<LinkedinIcon size={40} round />
							</LinkedinShareButton>

							<TelegramShareButton
								url={shareUrl}
								hashtags={["PhotoVide", "Photo"]}
							>
								<TelegramIcon size={40} round/>
							</TelegramShareButton>
						</Box>

					</DialogContent>
				</Dialog>
			)
		},
		[open]
	)

	return { onOpenShare: setTrue, renderShare }
}

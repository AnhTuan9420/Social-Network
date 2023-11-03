import { Box, Typography } from '@mui/material'
import React from 'react'
import EventContentPage from '../../components/Layout/EventContentPage'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles'

const AccordionCustom = styled(Accordion)(({ theme }) => ({
	border: 'solid 1px #E0E0E0',
	boxShadow: 'unset',
	borderRadius: '8px !important',
	'&.Mui-expanded': {
		backgroundColor: '#FFFFFF',
		border: 'solid 1px #E0E0E0',
		paddingY: '0px'
	},
	'&::before': {
		display: 'none'
	},
	'.MuiAccordionSummary-expandIconWrapper': {
		color: '#00590E'
	},
	'.Mui-expanded': {
		'.accordion-title': {
			color: '#000000 !important'
		}
	},
	'.MuiAccordionSummary-content': {
		margin: '0px'
	},
	'@media screen and (min-width: 600px)': {
		'.MuiAccordionSummary-root': {
			padding: '0px',
			paddingLeft: '24px !important',
			paddingRight: '24px !important'
		}
	},
	'@media screen and (max-width: 600px)': {
		'.MuiAccordionSummary-root': {
			padding: '0px',
			paddingLeft: '16px !important',
			paddingRight: '16px !important'
		},
		'.MuiAccordionSummary-root.Mui-expanded ': {
			minHeight: '0px !important'
		}
	},
	'.MuiAccordionSummary-content.Mui-expanded': {
		margin: '0px'
	},

}))

const FAQs = () => {
	const [expanded, setExpanded] = React.useState(false)

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	const faqs = [
		{
			panel: 'panel1',
			title: 'Mạng xã hội về hình ảnh là gì?',
			content: 'Mạng xã hội về hình ảnh là một nền tảng trực tuyến cho phép người dùng chia sẻ, lưu trữ và tương tác với hình ảnh. Người dùng có thể tạo, tìm kiếm, xem và tương tác với các hình ảnh được đăng tải bởi họ hoặc người dùng khác.'
		},
		{
			panel: 'panel2',
			title: 'Các ứng dụng nổi tiếng nào thuộc thể loại mạng xã hội về hình ảnh?',
			content: 'Các ứng dụng nổi tiếng trong thể loại này bao gồm Instagram, Pinterest và Flickr.'
		},
		{
			panel: 'panel3',
			title: 'Làm cách nào để tạo tài khoản trên mạng xã hội về hình ảnh?',
			content: 'Để tạo tài khoản, bạn thường cần tải ứng dụng hoặc truy cập trang web của nền tảng, sau đó chọn tùy chọn "Đăng ký". Bạn sẽ cần cung cấp thông tin cá nhân và đăng nhập tài khoản.'
		},
		{
			panel: 'panel4',
			title: 'Làm cách nào để chia sẻ hình ảnh trên mạng xã hội?',
			content: 'Để chia sẻ hình ảnh, bạn thường cần tải lên hình ảnh từ thiết bị của bạn, sau đó thêm mô tả và chọn ai có thể xem hình ảnh đó. Bạn sau đó có thể đăng tải hình ảnh.'
		},
		{
			panel: 'panel5',
			title: 'Tôi có thể tạo album hình ảnh trên mạng xã hội không?',
			content: 'Có, bạn có thể tạo album hình ảnh để tổ chức hình ảnh theo chủ đề hoặc sự kiện trên hầu hết các nền tảng mạng xã hội về hình ảnh.'
		},
		{
			panel: 'panel6',
			title: 'Làm cách nào để tìm bạn bè trên mạng xã hội về hình ảnh?',
			content: 'Để tìm bạn bè, bạn có thể sử dụng tính năng tìm kiếm trên nền tảng hoặc kết nối tài khoản của bạn với tài khoản của bạn bè.'
		},
		{
			panel: 'panel7',
			title: 'Có tính năng bảo mật nào để bảo vệ hình ảnh của tôi trên mạng xã hội?',
			content: 'Đa số các mạng xã hội về hình ảnh cung cấp các tùy chọn bảo mật để kiểm soát ai có thể xem hình ảnh của bạn. Bạn có thể đặt quyền riêng tư cho từng hình ảnh hoặc album.'
		},
		{
			panel: 'panel8',
			title: 'Tôi có thể tải xuống hình ảnh từ mạng xã hội không?',
			content: 'Đa số các mạng xã hội cho phép bạn tải xuống hình ảnh của mình hoặc hình ảnh mà bạn có quyền truy cập.'
		},
		{
			panel: 'panel9',
			title: 'Tôi có thể tương tác với hình ảnh của người khác như thế nào?',
			content: 'Bạn có thể bình luận, thích, chia sẻ hoặc tải xuống hình ảnh của người khác, tùy thuộc vào quyền riêng tư của hình ảnh đó.'
		},
		{
			panel: 'panel10',
			title: 'Làm cách nào để đảm bảo chất lượng hình ảnh trên mạng xã hội?',
			content: 'Để đảm bảo chất lượng hình ảnh, hãy tải lên hình ảnh có độ phân giải cao và tránh sử dụng hình ảnh có bản quyền mà bạn không được phép sử dụng. Đảm bảo bạn tuân thủ quy tắc và điều khoản sử dụng của nền tảng.'
		}
	];

	return (
		<EventContentPage
			maxWidth={1}
			content={
				<Box className="mt-[40px] mb-[100px] px-0">
					<Typography className="text-center text-[#222222] text-[32px] font-semibold not-italic">
						FAQs
					</Typography>

					<Box className="mt-[40px]">
						{faqs?.map((question, index) => (
							<AccordionCustom
								className="sm:mb-24 mb-16"
								expanded={expanded === question.panel}
								onChange={handleChange(question.panel)}
								key={index}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon color="error" />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<Typography className="text-[#222222] text-20 py-24 leading-[160%] font-500 accordion-title">
										{question.title}
									</Typography>
								</AccordionSummary>
								<AccordionDetails className="p-0">
									<Typography className="text-[#222222] sm:pl-24 pl-16 sm:pb-24 pb-10 sm:pr-56 pr-44 sm:text-20 text-16 sm:leading-[160%] leading-[140%] font-light">
										{question.content}
									</Typography>
								</AccordionDetails>
							</AccordionCustom>
						))}
					</Box>
				</Box>
			}
		/>
	)
}

export default React.memo(FAQs)

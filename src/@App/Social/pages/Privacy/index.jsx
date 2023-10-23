import { Box, Typography } from '@mui/material'
import React from 'react'
import EventContentPage from '../../components/Layout/EventContentPage'


const Privacy = () => {

	return (
		<EventContentPage
			maxWidth={true}
			content={
				<Box className="mt-[40px] mb-[100px] px-0">
					<Typography className="text-center text-[#222222] text-[32px] font-semibold not-italic">
						Privacy Policy
					</Typography>
					<Box className="mt-4 text-[#333333] text-justify">
						<Typography className='text-20'>
							Chào mừng bạn đến với PhotoVibe của chúng tôi. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và quyền riêng tư của bạn. Nếu bạn có bất kỳ câu hỏi hoặc lo ngại nào về chính sách của chúng tôi hoặc thực tiễn của chúng tôi liên quan đến thông tin cá nhân của bạn, vui lòng liên hệ với chúng tôi tại email Dungtd@gmail.com.
						</Typography>
						<Typography className="mt-10 text-20">
							Khi bạn truy cập trang web của chúng tôi và sử dụng dịch vụ của chúng tôi, bạn tin tưởng chúng tôi với thông tin cá nhân của bạn. Chúng tôi coi trọng quyền riêng tư của bạn. Trong chính sách quyền riêng tư này, chúng tôi mô tả chính sách quyền riêng tư của chúng tôi. Chúng tôi cố gắng giải thích cho bạn cách rõ ràng nhất về thông tin mà chúng tôi thu thập, cách chúng tôi sử dụng nó và những quyền mà bạn có liên quan đến nó.
						</Typography>
						<Typography className="mt-10 text-20">
							 Chúng tôi hy vọng bạn dành thời gian để đọc kỹ, bởi đó rất quan trọng. Nếu có bất kỳ điều khoản nào trong chính sách quyền riêng tư này mà bạn không đồng ý, vui lòng ngưng sử dụng trang web của chúng tôi và dịch vụ của chúng tôi.
						</Typography>
						<Typography className="mt-10 text-20">
							Chính sách quyền riêng tư này áp dụng cho tất cả thông tin được thu thập thông qua trang web của chúng tôi.
						</Typography>
						<Typography className="mt-10 text-20">
							Vui lòng đọc kỹ chính sách quyền riêng tư này bởi vì nó sẽ giúp bạn đưa ra quyết định có kiến thức về việc chia sẻ thông tin cá nhân của bạn với chúng tôi.
						</Typography>
					</Box>
				</Box>
			}
		/>
	)
}

export default React.memo(Privacy)

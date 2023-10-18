import { CircularProgress, Divider, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import EventContentPage from '@App/Social/components/Layout/EventContentPage'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useListUser } from '@App/Social/components/Left/hooks/useListUser'
import { getSocialUser, getToken } from '@Core/helper/Session'
import ChatMessage from './components/listMessage'

const Chat = (props) => {
	const navigate = useNavigate()
	let [searchParams] = useSearchParams()
	const user_id = searchParams.get('user_id')
	const user = getSocialUser()
	const token = getToken()

	const { listUser, loadingListUser } = useListUser()
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const socket = io('http://localhost:3000', {
			path: '/socket.io',
			transports: ['websocket'],
			secure: true,
			query: `token=${token}`
		});
		setSocket(socket);
		
		if (socket) {
			socket.emit('userConnected', user?.id);
		}
		socket.on('userConnectedResponse', (isConnected) => {
			if (isConnected) {
				console.log('Người dùng đã kết nối.');
			} else {
				console.log('Người dùng chưa kết nối.');
			}
		});
		// Cleanup the socket connection when the component unmounts
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<EventContentPage
			maxWidth={true}
			chat={true}
			content={
				<Box className="flex my-[50px]" sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>

					<Box className="w-[40%] bg-[white] h-[700px]">
						<Box className="sm:px-16 px-[18px] sm:py-[24px] py-[25px]">
							<Typography className="text-20 font-semibold self-center leading-[160%] text-[#222222] break-all" onClick={() => navigate(`${ROUTER_SOCIAL.chat}?/user_id=${3}`)}>
								Messages
							</Typography>
						</Box>
						<Divider />
						<Box className='h-[620px] overflow-y-scroll'
							sx={{
								'::-webkit-scrollbar': {
									width: '0px'
								}
							}}
						>
							{loadingListUser ? (
								<div className="my-[20%] flex justify-center items-center">
									<CircularProgress />
								</div>
							) : (
								<Box>
									{listUser?.results?.filter((val) => val?.id !== user?.id)?.map((item, i) => {
										if (String(item?.id) === String(user_id)) {
											return (
												<Box key={i} onClick={() => navigate(`${ROUTER_SOCIAL.chat}/?user_id=${item.id}`)}>
													<MenuItem className="p-[16px] text-[#00A0E9] font-semibold bg-[#EFFAFF] sm:text-20 text-16 sm:leading-[160%] leading-[140%]">
														<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' /> {item?.username}
													</MenuItem>
													<Divider className='m-0' />
												</Box>
											)
										} else {
											return (
												<Box key={i} onClick={() => navigate(`${ROUTER_SOCIAL.chat}/?user_id=${item.id}`)}>
													<MenuItem className="p-[16px] text-[#222222] font-normal sm:text-20 text-16 sm:leading-[160%] leading-[140%]">
														<img src='/Icons/man.png' className='h-40 w-40 mr-[15px]' /> {item?.username}
													</MenuItem>
													<Divider className='m-0' />
												</Box>
											)
										}
									})}
								</Box>
							)}
						</Box>
					</Box>

					{/* Chat */}
					<Box className="w-full h-[700px] bg-[white] border-solid border-l-1 border-[#e0e0e0]">
						<ChatMessage user_id={user_id} socket={socket} />
					</Box>
				</Box >
			}
		/>
	)
}

export default React.memo(Chat)

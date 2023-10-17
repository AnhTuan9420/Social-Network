import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import CoreInput from '@Core/components/Input/CoreInput'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Yup from "@Core/helper/Yup"
import Cookies from 'js-cookie'
import React, { useState } from "react"
import { ROUTER_SOCIAL } from "@App/Social/configs/constants"
import { authService } from "@App/Social/services/authService"
import { errorMsg, successMsg } from "@Core/helper/Message"
import { setDataSession } from "@Core/helper/Session"

const Login = props => {
    const navigate = useNavigate()
    const [viewPassword, setViewPassword] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isDirty },
        watch
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: yupResolver(
            Yup.object({
                username: Yup.string()
                    .required('Required')
                    .min(8, 'Username must be between 8 and 20 characters')
                    .max(20, 'Username must be between 8 and 20 characters'),
                password: Yup.string()
                    .required('Required')
                    .min(8, 'Password must be between 8 and 20 characters')
                    .max(20, 'Password must be between 8 and 20 characters')
            })
        )
    })

    const onSubmit = handleSubmit(async data => {
        try {
            const res = await authService.login(data)
            setDataSession('local', 'social_user', {
                id: res?.user?.id,
                username: res?.user?.username,
                fullName: res?.user?.fullName,
            })
            Cookies.set('token', res?.tokens?.access?.token)
            Cookies.set('refresh_token', res?.tokens?.refresh?.token)
            successMsg('Login success.')
            navigate(ROUTER_SOCIAL.event.search)
        } catch (error) {
            errorMsg(error.response.data.message)
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <Box className='mt-[50px]'>
                <Typography className="mb-4  text-[#222222] font-semibold border-b-2 border-solid border-[red]"
                    sx={{ width: 'fit-content' }}
                >
                    Username
                </Typography>
                <CoreInput
                    control={control}
                    name="username"
                    className="w-full mt-8"
                    placeholder={'Tên đăng nhập'}
                // inputLogin={true}
                />
                <Typography className="mb-4 mt-20 text-[#222222] sm:leading-[160%] leading-[140%] font-semibold border-b-2 border-solid border-[red]"
                    sx={{ width: 'fit-content' }}
                >
                    Password
                </Typography>
                <CoreInput
                    id="password"
                    control={control}
                    name="password"
                    type={viewPassword ? 'text' : 'password'}
                    className="w-full mt-8"
                    placeholder={'Mật khẩu'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {viewPassword ? (
                                    <IconButton onClick={() => setViewPassword(false)}>
                                        <VisibilityOutlinedIcon color="error" />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => setViewPassword(true)}>
                                        <VisibilityOffOutlinedIcon color="error" />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    className="w-full mt-[20px] text-14 h-56 bg-[red] shadow-none font-semibold text-[#FFFFFF]"
                >
                    Đăng nhập
                </Button>
            </Box>
        </form>
    )
}

export default React.memo(Login)
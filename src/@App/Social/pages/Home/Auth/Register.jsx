import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import CoreInput from '@Core/components/Input/CoreInput'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Yup from "@Core/helper/Yup"
import React, { useState } from "react"
import { errorMsg, successMsg } from "@Core/helper/Message"
import { authService } from "@App/Social/services/authService"

const Register = props => {
    const { setLogin } = props
    const navigate = useNavigate()
    const [viewPassword, setViewPassword] = useState(false)
	const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        watch
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            fullName: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(
            Yup.object({
                fullName: Yup.string()
                    .required('Required')
                    .min(8, 'Full Name must be between 8 and 20 characters')
                    .max(20, 'Full Name must be between 8 and 20 characters'),
                username: Yup.string()
                    .required('Required')
                    .min(8, 'Username must be between 8 and 20 characters')
                    .max(20, 'Username must be between 8 and 20 characters'),
                password: Yup.string()
                    .required('Required')
                    .min(8, 'Password must be between 8 and 20 characters')
                    .max(20, 'Password must be between 8 and 20 characters'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'ConfirmPassword and Password not match')
                    .min(8, 'ConfirmPassword must be between 8 and 20 characters')
                    .max(20, 'ConfirmPassword must be between 8 and 20 characters'),
            })
        )
    })

    const onSubmit = handleSubmit(async data => {
        try {
            const res = await authService.register(data)
            successMsg('Register success.')
            if (res) {
                setLogin(true)
            }
        } catch (error) {
            errorMsg(error.response.data.message)
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <Box className=''>
                <Typography className="mb-4 text-[#222222] font-semibold">
                    Full name
                </Typography>
                <CoreInput
                    control={control}
                    name="fullName"
                    className="w-full"
                    placeholder={'Tên người dùng'}
                />

                <Typography className="mb-4 mt-10 text-[#222222] font-semibold">
                    Username
                </Typography>
                <CoreInput
                    control={control}
                    name="username"
                    className="w-full"
                    placeholder={'Tên đăng nhập'}
                />

                <Typography className="mb-4 mt-10 text-[#222222] sm:leading-[160%] leading-[140%] font-semibold">
                    Password
                </Typography>
                <CoreInput
                    id="password"
                    control={control}
                    name="password"
                    type={viewPassword ? 'text' : 'password'}
                    className="w-full"
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

                <Typography className="mb-4 mt-10 text-[#222222] sm:leading-[160%] leading-[140%] font-semibold">
                    Confirm Password
                </Typography>
                <CoreInput
                    id="confirmPassword"
                    control={control}
                    name="confirmPassword"
                    type={viewConfirmPassword ? 'text' : 'password'}
                    className="w-full"
                    placeholder={'Nhập lại mật khẩu'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {viewConfirmPassword ? (
                                    <IconButton onClick={() => setViewConfirmPassword(false)}>
                                        <VisibilityOutlinedIcon color="error" />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => setViewConfirmPassword(true)}>
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
                    className="w-full text-14 mt-[20px] h-56 bg-[red] shadow-none font-semibold text-[#FFFFFF]"
                    onClick={() => navigate(ROUTER_SOCIAL.event.search)}
                >
                    Đăng ký
                </Button>
            </Box>
        </form>
    )
}

export default React.memo(Register)
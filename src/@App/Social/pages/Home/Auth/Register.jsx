import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import CoreInput from '@Core/components/Input/CoreInput'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Yup from "@Core/helper/Yup"
import React, { useState } from "react"

const Register = props => {
    const navigate = useNavigate()
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        watch
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(
            Yup.object({
                email: Yup.string()
                    .required('Required')
                    .email('Error!')
                    .min(3, 'Error'),
                password: Yup.string()
                    .required('Required')
                    .min(8, 'Error')
                    .max(20, 'Error')
            })
        )
    })

    const [viewPassword, setViewPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setViewPassword(true)
    }

    return (
        <Box className='mt-10'>
            <Typography className="mb-4 text-[#222222] font-semibold">
                Username
            </Typography>
            <CoreInput
                control={control}
                name="email"
                className="w-full"
                placeholder={'Tên người dùng'}
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
                                <IconButton onClick={togglePasswordVisibility}>
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
                id="password"
                control={control}
                name="password"
                type={viewPassword ? 'text' : 'password'}
                className="w-full"
                placeholder={'Nhập lại mật khẩu'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {viewPassword ? (
                                <IconButton onClick={() => setViewPassword(false)}>
                                    <VisibilityOutlinedIcon color="error" />
                                </IconButton>
                            ) : (
                                <IconButton onClick={togglePasswordVisibility}>
                                    <VisibilityOffOutlinedIcon color="error" />
                                </IconButton>
                            )}
                        </InputAdornment>
                    )
                }}
            />

            <Button
                variant="contained"
                className="w-full text-14 mt-[20px] h-56 bg-[red] shadow-none font-semibold text-[#FFFFFF]"
                onClick={() => navigate(ROUTER_SOCIAL.event.search)}
            >
                Đăng ký
            </Button>
        </Box>
    )
}

export default React.memo(Register)
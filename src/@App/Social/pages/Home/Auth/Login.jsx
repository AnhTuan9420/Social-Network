import { Box, Button, IconButton, InputAdornment, Typography } from "@mui/material"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import CoreInput from '@Core/components/Input/CoreInput'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Yup from "@Core/helper/Yup"
import React, { useState } from "react"

const Login = props => {
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
        <Box className='mt-60'>
            <Typography className="mb-4  text-[#222222] font-semibold border-b-2 border-solid border-[red]">
                Username
            </Typography>
            <CoreInput
                control={control}
                name="email"
                className="w-full mt-8"
                placeholder={'Tên người dùng'}
                inputLogin={true}
            />
            <Typography className="mb-4 mt-20 text-[#222222] sm:leading-[160%] leading-[140%] font-semibold border-b-2 border-solid border-[red]">
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
                                    <VisibilityOutlinedIcon color="primary" />
                                </IconButton>
                            ) : (
                                <IconButton onClick={togglePasswordVisibility}>
                                    <VisibilityOffOutlinedIcon color="primary" />
                                </IconButton>
                            )}
                        </InputAdornment>
                    )
                }}
            />
            <Button
                variant="contained"
                className="w-full mt-[20px] text-14 h-56 bg-[red] shadow-none font-semibold text-[#FFFFFF]"
                onClick={() => navigate(ROUTER_SOCIAL.event.search)}
            >
                Đăng nhập
            </Button>
        </Box>
    )
}

export default React.memo(Login)
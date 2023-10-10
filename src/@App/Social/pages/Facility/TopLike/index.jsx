import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const TopLike = props => {

    return (
        <Box className='mt-20 grid grid-cols-5 gap-10'>
            <Box className='relative'>
                <img src='/Icons/man.png' className='absolute left-[20px] top-[20px] h-40 w-40' />
                <img className='rounded-12 h-[250px]' src='https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=yCCOAE_oJHG0iGnTDNgAEA' />
                <Typography className='absolute left-[20px] bottom-[20px] font-bold text-14 text-[white]'>Charlie</Typography>
            </Box>
            <Box className='relative'>
                <img src='/Icons/man.png' className='absolute left-[20px] top-[20px] h-40 w-40' />
                <img className='rounded-12 h-[250px]' src='https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=yCCOAE_oJHG0iGnTDNgAEA' />
                <Typography className='absolute left-[20px] bottom-[20px] font-bold text-14 text-[white]'>Charlie</Typography>
            </Box>
            <Box className='relative'>
                <img src='/Icons/man.png' className='absolute left-[20px] top-[20px] h-40 w-40' />
                <img className='rounded-12 h-[250px]' src='https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=yCCOAE_oJHG0iGnTDNgAEA' />
                <Typography className='absolute left-[20px] bottom-[20px] font-bold text-14 text-[white]'>Charlie</Typography>
            </Box>
            <Box className='relative'>
                <img src='/Icons/man.png' className='absolute left-[20px] top-[20px] h-40 w-40' />
                <img className='rounded-12 h-[250px]' src='https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=yCCOAE_oJHG0iGnTDNgAEA' />
                <Typography className='absolute left-[20px] bottom-[20px] font-bold text-14 text-[white]'>Charlie</Typography>
            </Box>
            <Box className='relative'>
                <img src='/Icons/man.png' className='absolute left-[20px] top-[20px] h-40 w-40' />
                <img className='rounded-12 h-[250px]' src='https://i1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=yCCOAE_oJHG0iGnTDNgAEA' />
                <Typography className='absolute left-[20px] bottom-[20px] font-bold text-14 text-[white]'>Charlie</Typography>
            </Box>
        </Box>
    )
}

export default React.memo(TopLike)

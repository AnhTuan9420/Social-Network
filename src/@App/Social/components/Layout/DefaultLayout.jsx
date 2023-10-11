import { Box, CircularProgress } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Outlet, useHref, useLocation } from 'react-router-dom'
import AppFooter from '../AppFooter'
import AppHeader from '../AppHeader'
import { ROUTER_SOCIAL } from '@App/Social/configs/constants'
// import PropTypes from 'prop-types'
const TraveloLayouContext = React.createContext()

export const useTraveloLayoutContext = () => useContext(TraveloLayouContext)

const DefaultLayout = props => {
	const location = useLocation()
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [location.pathname])

	const currentUrl = useHref()

	return (
		<TraveloLayouContext.Provider value={props}>
			<Box className={currentUrl === ROUTER_SOCIAL.event.event_top ? "flex flex-col min-h-screen bg-[#e75348]" : "flex flex-col min-h-screen bg-[#f2f2f2]"}>
				<AppHeader className='bg-white' />
				<div className="app-content h-full ">
					<React.Suspense
						fallback={
							<div className="mt-200 text-center min-h-[100vh]">
								<CircularProgress />
							</div>
						}
					>
						<Outlet />
					</React.Suspense>
				</div>
				{/* <AppFooter /> */}
			</Box>
		</TraveloLayouContext.Provider>
	)
}

//DefaultLayout.defaultProps = {}

//DefaultLayout.propTypes = {}

export default React.memo(DefaultLayout)

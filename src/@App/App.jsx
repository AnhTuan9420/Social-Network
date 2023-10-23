import React from 'react'
import CoreAppTheme from '../@Core/components/CoreAppTheme'
// import PropTypes from 'prop-types'
import { CoreConfirmProvider } from '@Core/components/Confirm/CoreConfirm'
import { CoreLoadingFullPage } from '@Core/components/Loading/CoreLoadingFullPage'
import CoreAuthProvider from '@Core/components/Provider/CoreAuthProvider'
import 'react-datepicker/dist/react-datepicker.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { appRouterConfig } from './appConfig'

// Create the function
export function AddLibrary(urlOfTheLibrary) {
	const script = document.createElement('script')
	script.src = urlOfTheLibrary
	script.async = true
	document.body.appendChild(script)
}
const App = props => {
	return (
		<CoreAppTheme>
			<CoreConfirmProvider>
				<CoreAuthProvider>
					<RouterProvider router={appRouterConfig} />
					<ToastContainer />
					<CoreLoadingFullPage />
				</CoreAuthProvider>
			</CoreConfirmProvider>
		</CoreAppTheme>
	)
}

//App.defaultProps = {}

//App.propTypes = {}

export default React.memo(App)

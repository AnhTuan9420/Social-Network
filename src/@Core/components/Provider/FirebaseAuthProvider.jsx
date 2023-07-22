// import { authFirebase } from '@Core/helper/Firebase'

import React, { useContext, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'

import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { errorMsg, successMsg } from '@Core/helper/Message'
import { authService } from '@App/Fum/services/authService'
import { getFumUser, setFirebaseToken, setTraveloUser } from '@Core/helper/Session'

import { hideLoadingPage, showLoadingPage } from '@Core/helper/System'
import { CoreLoadingFullPage } from '@Core/components/Loading/CoreLoadingFullPage'

const FirebaseAuthContext = React.createContext()

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)

const FirebaseAuthProvider = props => {
	const [auth, setAuth] = useState()
	const [authLoading, setAuthLoading] = useState(true)
	const [authRole, setAuthRole] = useState('guest')
	// useEffect(() => {
	// 	// const user = authFirebase.currentUser
	// 	onAuthStateChanged(authFirebase, user => {
	// 		if (user) {
	// 			// User is signed in, see docs for a list of available properties
	// 			// https://firebase.google.com/docs/reference/js/firebase.User
	// 			setAuth(user)
	// 			setAuthLoading(false)
	// 			setAuthRole('user')
	// 			// ...
	// 		} else {
	// 			// User is signed out
	// 			// ...
	// 			setAuth(null)
	// 			setAuthRole('guest')
	// 			setAuthLoading(false)
	// 		}
	// 	})
	// }, [])

	const handleSignInFirebase = async (mail, password) => {
		showLoadingPage()
		// try {
		// 	const res = await signInWithEmailAndPassword(authFirebase, mail, password)
		// 	const user = res.user
		// 	setAuth(user)
		// 	setAuthRole('user')
		// 	// setFirebaseToken(user?.stsTokenManager)
		// 	const fum = await authService.login({ mail, password })
		// 	setTraveloUser(fum?.user_info)
		// 	successMsg('Login success')
		// 	hideLoadingPage()
		// 	return user
		// } catch (e) {
		// 	errorMsg('Invalid email or password')
		// }
		hideLoadingPage()
	}

	const handleSignout = async () => {
		try {
			showLoadingPage()
			authService.logout(getFumUser())
			// await signOut(authFirebase)
			setAuth(null)
			setAuthRole('guest')

			successMsg('Logout success')
			localStorage.clear()
			sessionStorage.clear()
			hideLoadingPage()
			return true
		} catch (e) {
			errorMsg(error)
		}
		hideLoadingPage()
	}

	return (
		<FirebaseAuthContext.Provider
			value={{
				handleSignInFirebase,
				handleSignout,
				auth,
				authLoading,
				authRole
			}}
		>
			{authLoading ? (
				<CoreLoadingFullPage />
			) : (
				<>
					{props.children}
					<div id="firebaseui-auth-container" />
				</>
			)}
		</FirebaseAuthContext.Provider>
	)
}

//FirebaseAuthProvider.defaultProps = {}

//FirebaseAuthProvider.propTypes = {}

export default React.memo(FirebaseAuthProvider)

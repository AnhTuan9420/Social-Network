export const ROUTER_SOCIAL = {
	auth: {
		login: '/login',
		reset_password: '/reset-password',
		register: {
			profile: '/register-profile',
			confirm: '/confirm-register',
			verification_codes: '/verification-codes',
			success: '/register_success',
			send_otp_to_email: '/send-otp-to-email'
		},
	},
	terms: '/terms',
	privacy: '/privacy',
	faq: '/faq',
	chat: '/chat',

	event: {
		list: '/event-list',
		detail: '/facility-detail',
		favorite: '/facility-favorite',
		search: '/facility',
		history: '/history',
		history_detail: '/history-detail',
		event_top: '/',
		event_top_detail: '/event-top-detail',
	},
	user: {
		profile: '/profile',
	},
}

export const authRole = {
	user: 'user',
	admin: 'admin',
	guest: 'guest'
}
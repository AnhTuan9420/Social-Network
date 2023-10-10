import { ROUTER_SOCIAL } from './constants'

export const menuAboutUserConfig = [
	{
		title: 'マイページ',
		url: ROUTER_SOCIAL.user.info
	},
	{
		title: 'お気に入り',
		url: ROUTER_SOCIAL.event.favorite
	},
	{
		title: '利用履歴',
		url: ROUTER_SOCIAL.event.history
	}
]

export const menu = [
	{
		title: 'Trang chủ',
		url: ROUTER_SOCIAL.event.search
	},
	{
		title: 'Yêu thích',
		url: ROUTER_SOCIAL.event.favorite
	},
]

export const menuBeforeLoginConfig = [
	{
		title: '施設検索',
		url: ROUTER_SOCIAL.event.search
	},
	{
		title: '施設を利用する',
		url: ROUTER_SOCIAL.event.event_top
	}
]

export const menuAboutAppConfig = [
	{
		title: 'よくある質問',
		url: ROUTER_SOCIAL.questions
	},
	{
		title: 'お問い合わせ',
		url: ROUTER_SOCIAL.inquiry
	},
	{
		title: 'プライバシーポリシー',
		url: ROUTER_SOCIAL.privacy
	},
	{
		title: 'キャンセルポリシー',
		url: ROUTER_SOCIAL.cancellation
	},
	{
		title: '利用規約',
		url: ROUTER_SOCIAL.terms
	}
]

export const userInfoMenus = [
	{
		title: 'マイページ',
		url: ROUTER_SOCIAL.user.info
	},
	{
		title: 'ニックネームの変更',
		url: ROUTER_SOCIAL.user.change_nick_name
	},
	{
		title: '電話番号の変更',
		url: ROUTER_SOCIAL.user.change_phone
	},
	{
		title: 'メールアドレスの変更',
		url: ROUTER_SOCIAL.user.change_email
	},
	{
		title: 'パスワードの変更',
		url: ROUTER_SOCIAL.user.change_password
	},
	{
		title: '見積書・領収書の宛名の変更',
		url: ROUTER_SOCIAL.user.change_address
	},
	{
		title: '特別プランIDの編集',
		url: ROUTER_SOCIAL.user.edit_id
	}
]

export const user = [
	{
		username: 'User1',
		id: 1
	},
	{
		username: 'User2',
		id: 2
	},
	{
		username: 'User3',
		id: 3
	},
	{
		username: 'User4',
		id: 4
	},
	{
		username: 'User5',
		id: 5
	},
	{
		username: 'User6',
		id: 6
	},
	{
		username: 'User7',
		id: 7
	},
	{
		username: 'User8',
		id: 8
	},
	{
		username: 'User9',
		id: 9
	},
	{
		username: 'User10',
		id: 10
	}
]

export const deleteAccount = {
	title: '退会',
	url: ROUTER_SOCIAL.user.delete_acount
}

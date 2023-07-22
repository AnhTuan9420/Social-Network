import { ROUTER_FUM } from './constants'

export const menuAboutUserConfig = [
	{
		title: 'マイページ',
		url: ROUTER_FUM.user.info
	},
	{
		title: 'お気に入り',
		url: ROUTER_FUM.event.favorite
	},
	{
		title: '利用履歴',
		url: ROUTER_FUM.event.history
	}
]

export const menuBeforeLoginConfig = [
	{
		title: '施設検索',
		url: ROUTER_FUM.event.search
	},
	{
		title: '施設を利用する',
		url: ROUTER_FUM.event.event_top
	}
]

export const menuAboutAppConfig = [
	{
		title: 'よくある質問',
		url: ROUTER_FUM.questions
	},
	{
		title: 'お問い合わせ',
		url: ROUTER_FUM.inquiry
	},
	{
		title: 'プライバシーポリシー',
		url: ROUTER_FUM.privacy
	},
	{
		title: 'キャンセルポリシー',
		url: ROUTER_FUM.cancellation
	},
	{
		title: '利用規約',
		url: ROUTER_FUM.terms
	}
]

export const userInfoMenus = [
	{
		title: 'マイページ',
		url: ROUTER_FUM.user.info
	},
	{
		title: 'ニックネームの変更',
		url: ROUTER_FUM.user.change_nick_name
	},
	{
		title: '電話番号の変更',
		url: ROUTER_FUM.user.change_phone
	},
	{
		title: 'メールアドレスの変更',
		url: ROUTER_FUM.user.change_email
	},
	{
		title: 'パスワードの変更',
		url: ROUTER_FUM.user.change_password
	},
	{
		title: '見積書・領収書の宛名の変更',
		url: ROUTER_FUM.user.change_address
	},
	{
		title: '特別プランIDの編集',
		url: ROUTER_FUM.user.edit_id
	}
]

export const userInfoMenuMobile = [
	{
		title: 'マイページ',
		url: ROUTER_FUM.user.info
	},
	{
		title: 'ニックネームの変更',
		url: ROUTER_FUM.user.change_nick_name
	},
	{
		title: '見積書・領収書の宛名の変更',
		url: ROUTER_FUM.user.change_address
	},
	{
		title: 'パスワードの変更',
		url: ROUTER_FUM.user.change_password
	},
	{
		title: '特別プランIDの編集',
		url: ROUTER_FUM.user.edit_id
	},
	{
		title: '電話番号の変更',
		url: ROUTER_FUM.user.change_phone
	},
	{
		title: 'メールアドレスの変更',
		url: ROUTER_FUM.user.change_email
	}
]

export const deleteAccount = {
	title: '退会',
	url: ROUTER_FUM.user.delete_acount
}

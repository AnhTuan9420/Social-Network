import React from 'react'

import { ROUTER_SOCIAL } from './constants'

const LazyPostDetail = React.lazy(() => import('../pages/PostDetail'))

const LazyPost = React.lazy(() => import('../pages/Post'))

const LazyListLike = React.lazy(() => import('../pages/Post/ListFavorite'))

const LazyHome = React.lazy(() => import('../pages/Home'))

const LazyChat = React.lazy(() => import('../pages/Chat'))

const LazyProfile = React.lazy(() => import('../pages/Profile'))

const LazyFAQ = React.lazy(() => import('../pages/FAQ'))

const LazyPrivacy = React.lazy(() => import('../pages/Privacy'))


export const routerTraveloConfig = [
	{
		path: ROUTER_SOCIAL.event.search,
		element: <LazyPost />,
	},
	{
		path: `${ROUTER_SOCIAL.event.detail}`,
		element: <LazyPostDetail />,
	},
	{
		path: ROUTER_SOCIAL.event.favorite,
		element: <LazyListLike />,
	},
	{
		path: ROUTER_SOCIAL.event.event_top,
		element: <LazyHome />
	},
	{
		path: ROUTER_SOCIAL.user.profile,
		element: <LazyProfile />,
	},
	{
		path: ROUTER_SOCIAL.chat,
		element: <LazyChat />,
	},
	{
		path: ROUTER_SOCIAL.faq,
		element: <LazyFAQ />,
	},
	{
		path: ROUTER_SOCIAL.privacy,
		element: <LazyPrivacy />,
	},
]

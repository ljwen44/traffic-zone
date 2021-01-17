export const routes = [
    // {path: '*', redirect: '/login'},
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        name: '主页',
        component: () => import('@/views/index.vue'),
        redirect: '/heatMap',
        children: [
            {
                path: '/heatMap',
                name: 'heatMap',
                component: () => import('_c/heatMap.vue'),
                meta: {
                    title: '热力图',
                    isLogin: true
                }
            },
            {
                path: '/scatterMap',
                name: 'scatterMap',
                component: () => import('_c/scatterMap.vue'),
                meta: {
                    title: '散点图',
                    isLogin: true
                }
            },
            {
                path: '/lineMap',
                name: 'lineMap',
                component: () => import('_c/lineMap.vue'),
                meta: {
                    title: '线路图',
                    isLogin: true
                }
            }
        ],
        meta: {
            isLogin: true
        }
    },
    {
        path: '/error',
        component: () => import('@/views/error.vue'),
        name: 'errorPage',
        meta: {
            title: '错误页',
        }
    },
]
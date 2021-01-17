import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router.js'
import store from '@/store/index.js'
import { getCookie } from '@/lib/cookie.js'
Vue.use(Router)
// const VueRouterPush = Router.prototype.push 
// Router.prototype.push = function push (to) {
//     return VueRouterPush.call(this, to).catch(err => console.log(err))
// }
const router = new Router({
    linkActiveClass: 'rou-active',
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched[0].meta.isLogin){
        const user = getCookie('username')
        if(user){
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})// 全局守卫，判断权限

export default router
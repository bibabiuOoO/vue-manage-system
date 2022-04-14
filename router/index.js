import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import Mall from '../pages/Mall.vue'
import PageOne from '../pages/PageOne.vue'
import PageTwo from '../pages/PageTwo.vue'
import Login from '../pages/Login.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
        path: '/main',
        // 注意对应
        name: 'Main',
        component: Main,
        redirect:'/home',
        // 此处子路由为何可以写全路径
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: Home
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: User
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: Mall
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: PageOne
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: PageTwo
            // }
        ]
    },
    {
        path:'/',
        name:'login',
        component:Login
    }
]
})

export default router
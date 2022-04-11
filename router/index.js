import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import Mall from '../pages/Mall.vue'
import PageOne from '../pages/PageOne.vue'
import PageTwo from '../pages/PageTwo.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            component: Main,
            children: [{
                    path: 'home',
                    name: 'home',
                    component: Home
                },
                {
                    path: 'user',
                    name: 'user',
                    component: User
                },
                {
                    path:'/mall',
                    name:'mall',
                    component:Mall
                },
                {
                    path: '/page1',
                    name: 'page1',
                    component: PageOne
                },
                {
                    path: '/page2',
                    name: 'page2',
                    component: PageTwo
                }
            ]
        }
    ]
})

export default router
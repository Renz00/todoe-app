import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/auth-store"

import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue"
import HomePage from "../pages/HomePage.vue"
import TasksPage from "../pages/TasksPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import RegisterPage from "../pages/RegisterPage.vue"
import SummaryPage from "../pages/SummaryPage.vue"

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home'
    },
    {
        path: '/tasks',
        component: TasksPage,
        name: 'tasks',
        meta: {
            auth: true
        }
    },
    {
        path: '/summary',
        component: SummaryPage,
        name: 'summary',
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'login'
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register'
    },
    {
        path: '/:notFound(.*)',
        component: NotFoundErrorPage,
        name: 'error.404'
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
    //Set what css class to add for act ive links
    linkActiveClass: 'active'
})

//creating a navigation guard
router.beforeEach((to, from) => {
    const store = useAuthStore()
    //checking auth value in the meta object for the routes
    //Also checking if user variable (isLoggedIn) in task-store is empty (false)
    //added query object for redirection, will redirect to login page
    if (to.meta.auth && !store.isLoggedIn){
        return {
            name: "login",
            query: {
                redirect: to.fullPath
            }
        }
    }
    // switch(to.meta.auth){
    //     case true:
    //         return {
    //                 name: "login",
    //                 query: {
    //                     redirect: to.fullPath
    //                 }
    //         }
    // }
})

export default router


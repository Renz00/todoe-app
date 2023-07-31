import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api"


export const useAuthStore = defineStore("authStore", () => {
    const user = ref(null)

    //if user.value is empty, return false. if not, return true
    const isLoggedIn = computed(() => !!user.value)

    const fetchUser = async() => {
        const { data } = await getUser()
        user.value = data
        console.log('fetch user:'+data);

    }

    const handleLogin = async(credentials) => {
        //initiate csrf protection
        await csrfCookie()
        await login(credentials)
        await fetchUser()
        isLoggedIn.value = true
    }

    const handleRegister = async(newUser) => {
        await register(newUser)
        await handleLogin({
            email: newUser.email,
            password: newUser.password
        })
    }

    const handleLogout = async() => {
       await logout()
       user.value = null
    }

    return {
        user,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleLogout,
        handleRegister
    }

})

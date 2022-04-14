import Cookie from 'js-cookie'
// 用于验证登录用户
export default {
    namespaced:true,
    state:{
        token:''
    },
    mutations:{
        setToken(state,val){
            state.token = val
            Cookie.set('token',val)
        },
        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state){
            state.token = state.token || Cookie.get('token')
        }
    }
}
import axios from './axios'
// 所有接口请求都写在这个文件内部
export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        methods: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}
import axios from 'axios'
import config from '../config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    // 拦截器
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些甚么
            return config;
        }, function (error) {
            // 对请求错误做什么
            return Promise.reject(error);
        });
        // 添加相应拦截器
        instance.interceptors.response.use(function (response) {
            // 在响应之前做些甚么
            return response;
        }, function (error) {
            // 对响应错误做什么
            return Promise.reject(error);
        });
    }
    request(options) {
        const instance = axios.create()
        options = {
            ...this.getInsideConfig(),
            ...options
        }
        this.interceptors(instance)
        return instance(options)

    }
}

export default new HttpRequest(baseUrl)
// 通过mock模拟后端动作
import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'

// 设置拦截器
Mock.mock('/user/getUser','get',userApi.getUserList)
// 通过正则匹配
// Mock.mock(/home\/getData/,homeApi.getStatisticalData)

// 下面这种不使用正则的话,此路径配置错误,为啥,
// Mock.mock('/api/home/getData',homeApi.getStatisticalData)
// Mock.mock('api/home/getData',homeApi.getStatisticalData)
// Mock.mock('home/getData',homeApi.getStatisticalData)
Mock.mock('/home/getData','get',homeApi.getStatisticalData)
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)
// 为何下面的不需要在datajs当中暴露
Mock.mock('/user/add','post',userApi.createUser)
Mock.mock('/user/edit','post',userApi.updateUser)
Mock.mock('/user/delete/','post',userApi.deleteUser)
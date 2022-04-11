// 通过mock模拟后端动作
import Mock from 'mockjs'
import homeApi from './mockServeData/home'

Mock.mock('/home/getData',homeApi.getStatisticalData)

import Mock from 'mockjs'
import { UserInfo } from './response/user.js'
import { pieInfo, pieInfo2, getLevelInfo, getAnalyze, getHeatMap, getBarData, getTableData } from './response/data.js'

// 模拟用户信息获取
Mock.mock('/topic/login', 'post', UserInfo)

// 模拟后台数据获取
Mock.mock('/topic/pieInfo', 'get', pieInfo)
Mock.mock('/topic/pieInfo2', 'get', pieInfo2)
Mock.mock('/topic/levelInfo', 'get', getLevelInfo)
Mock.mock('/topic/userRouteInfo', 'get', getAnalyze)
Mock.mock('/topic/getHeatMap', 'get', getHeatMap)
Mock.mock('/topic/getBarData', 'get', getBarData)
Mock.mock('/topic/getTableData', 'get', getTableData)

export default Mock
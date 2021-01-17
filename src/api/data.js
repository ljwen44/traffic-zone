import axios from './index'

// 获取饼图信息
export const getPieData = () => {
    return axios.request({
        url: '/topic/pieInfo',
        method: 'get'
    })
}
export const getPieData2 = () => {
    return axios.request({
        url: '/topic/pieInfo2',
        method: 'get'
    })
}

// 获取各个经纬度的聚集程度
export const getLevel = () => {
    return axios.request({
        url: '/topic/levelInfo',
        method: 'get'
    })
}

// 用户个人分析预测
export const getAnalyze = () => {
    return axios.request({
        url: '/topic/userRouteInfo',
        method: 'get'
    })
}

// 热力图数据
export const getHeatMap = () => {
    return axios.request({
        url: '/topic/getHeatMap',
        method: 'get'
    })
}

// 各时段人数
export const getBarData = () => {
    return axios.request({
        url: '/topic/getBarData',
        method: 'get'
    })
}

// 获取表格内容
export const getTableData = () => {
    return axios.request({
        url: '/topic/getTableData',
        method: 'get'
    })
}
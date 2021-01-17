import { doCustomTimes } from '@/lib/tools.js'
import { subwayMap, busPoints } from '@/lib/map.js'
import { changeCoords } from '@/lib/util.js'

var subway = changeCoords(subwayMap)
var bus = changeCoords(busPoints)

// 获取饼图信息
export const pieInfo = () => {
    return {
        code: 200, // 请求码
        data: {
            "bus_rate": 0.9508196721311475,
            "sub_rate": 0.04918032786885246
        }
    }
}

export const pieInfo2 = () => {
    return {
        code: 200,
        data: {
            "early_rate": 0.06557377049180328, 
            "noon_rate": 0.22950819672131148, 
            "night_rate": 0.7049180327868853
        }
    }
}

// 获取各个经纬度的聚集程度
export const getLevelInfo = () => {
    // 数据格式： [ 经度，纬度，值 ]
    let data = []
    let allSite = Object.assign(subway, bus)
    let i = 1
    for(let key in allSite){
        let value = Math.ceil(Math.random() * 100)
        let gether_level
        if(value <= 20){
            gether_level = 1
        } else if(value <= 40){
            gether_level = 2
        } else if(value <= 60){
            gether_level = 3
        } else if(value <= 80){
            gether_level = 4
        } else {
            gether_level = 5
        }
        data.push({
            mode_name: key,  // 站名
            lon_lat: allSite[key],  // [经纬],
            gether_level: gether_level,    // 聚集程度
            stay_rate: Math.random(),   // 驻留率
            is_abnormal: Math.ceil(Math.random() * 10) > 5 ? 1 : 0, // 是否异常聚集
            value: value,
            index: i++
        })
    }
    return {
        code: 200,
        data: data
    }
}

// 用户个人分析预测
// 返回数据有经纬度起始点，起始点，目的地，出行方式，用户id
export const getAnalyze = () => {
    // 返回个人出行方式数据
    let data = []
    // 获取对象的长度
    let arr = Object.keys(subway)
    let arrLength = arr.length
    let cirNum = Math.floor(Math.random() * 50)
    if(cirNum < 30){
        cirNum += Math.floor(Math.random() * 30)
    }
    for(let i = 0; i < cirNum; i++){
        let fromName = arr[Math.floor(Math.random() * arrLength)]
        let toName = arr[Math.floor(Math.random() * arrLength)]
        data.push({
            value: Math.floor(Math.random() * 100),      // 人数
            st_lon_lat: subway[fromName], // 起点
            end_lon_lat: subway[toName], // 终点
            path_name: fromName + '-' + toName,
            index: i
        })
    }
    return {
        code: 200,
        data: data
    }
}

// 热力图数据
export const getHeatMap = () => {
    // 数据格式： [ 经度，纬度，值 ]
    let data = []
    let allSite = Object.assign(subway, bus)
    let i = 0
    for(let key in allSite){
        data.push({
            // name: key,
            // value: allSite[key].concat(),
            "lng": allSite[key][0],  // 经度
            "lat": allSite[key][1],  // 纬度
            "count": Math.ceil(Math.random() * 100), // 人数
            index: i++
        })
    }
    return {
        code: 200,
        data: data
    }
}

// 各时段流动人数
export const getBarData = () => {
    let data = []
    doCustomTimes(24, () => {
        let value = Math.ceil(Math.random() * 100)
        if (value > 50){
            data.push({
                value: value,
                is_peak: true,
                times_interval: "01:00-02:00"
            })
        } else {
            data.push({
                value: value,
                is_peak: false,
                times_interval: "01:00-02:00"
            })
        }
    })
    return {
        code: 200,
        data: data
    }
}

// 获取表格内容
export const getTableData = () => {
    let data = []
    // 获取对象的长度
    let arr = Object.keys(subway)
    let arrLength = arr.length
    // 随机存取10个用户的信息
    for(let i = 0; i < 100; i++){
        let station = arr[Math.floor(Math.random() * arrLength)]
        let rate = Math.floor(Math.random() * 10) / 10
        data.push({
            imsi: Math.ceil(Math.random() * 100000) * 10000,
            prefer_trans: "地铁",
            acti_time: "夜间",
            index: i
        })
    }
    return {
        code: 200,
        data: data
    }
}
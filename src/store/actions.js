/*
    1、这里存放数据请求函数，针对 state 中的数据请求
    2、对数据进行相应的逻辑处理
*/
import { getPieData,getPieData2, getLevel, getAnalyze, getHeatMap, getBarData, getTableData } from '@/api/data.js'

const actions = {
    // 获取出行方式比较的数据
    getPieData(){
        return new Promise((resolve, reject) => {
            getPieData().then(res => {
                if (res.code === 200){
                    resolve(res)
                } else {
                    reject(new Error('获取数据异常'))
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    getPieData2(){
        return new Promise((resolve, reject) => {
            getPieData2().then(res => {
                if (res.code === 200){
                    resolve(res)
                } else {
                    reject(new Error('获取数据异常'))
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 获取站点聚集程度
    getLevel(){
        return new Promise((resolve, reject) => {
            getLevel().then(res => {
                if(res.code === 200){
                    resolve(res)
                } else {
                    reject(new Error('获取数据异常'))
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 个人出行方式数据
    getUserRouteData(){
        return new Promise((resolve, reject) => {
            getAnalyze().then(res => {
                if(res.code === 200){
                    resolve(res)
                } else {
                    reject(new Error('获取数据异常'))
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 热力图数据
    getHeatMapData(){
        return new Promise((resolve, reject) => {
            getHeatMap().then(res => {
                if(res.code === 200){
                    resolve(res)
                } else {
                    reject(new Error('获取数据异常'))
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 各时段人数
    getBarData() {
        return new Promise((resolve, reject) => {
            getBarData().then(res => {
                if(res.code === 200){
                    resolve(res)
                } else {
                    reject(new Error('获取数据异常'))
                }
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 表格数据
    getTableData() {
        return new Promise((resolve, reject) => {
            getTableData().then(res => {
                if(res.code === 200){
                    resolve(res)
                } else {
                    reject(new Error('获取数据异常'))
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default actions
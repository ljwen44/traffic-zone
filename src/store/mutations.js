/*
    1、这里只存放对 state 中定义的数据进行监听的方法
    2、格式为 方法名(state, val){ 方法体 }
*/
const mutations = {
    showLoading(state){
        state.loading = true
    },
    hideLoading(state){
        state.loading = false
    },

    // 某某饼状图数据修改方法
    SET_PIEDATA(state, pieData){
        state.pieData = pieData
    },

    // 某某折线图数据修改方法
    SET_LINEDATA(state, lineData){
        state.lineData = lineData
    },

    // 站点聚集程度修改方法
    SET_LEVELDATA(state, levelData){
        state.levelData = levelData
    },

    // 个人出行方式修改方法
    SET_USERROUTEDATA(state, userRouteData){
        state.userRouteData = userRouteData
    },

    // 热力图数据修改方法
    SET_HEATMAP(state, heatMapData){
        state.heatMapData = heatMapData
    },

    // 某某柱状图数据修改方法
    SET_BARDATA(state, barData){
        state.barData = barData
    },

    // 某某散点图数据修改方法
    SET_SCATTERDATA(state, scatterData){
        state.scatterData = scatterData
    },

    // 表格数据修改方法
    SET_TABLEDATA(state, tableData){
        state.tableData = tableData
    },

    // 取消请求方法
    pushToken (state, payload) {
        state.cancelTokenArr.push(payload.cancelToken)
    },
    clearToken ({ cancelTokenArr }) {
        cancelTokenArr.forEach(item => {
            item('路由跳转取消请求')
        })
        cancelTokenArr = []
    }
    
}

export default mutations
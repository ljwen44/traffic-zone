/*
    1、这里存放需要进行全局进行监听和渲染的数据；
    2、这里只存放数据类型，不包括其他内容
*/
const state = {
    // loading
    loading: false,
    // 圆饼图数据
    pieData: [],
    // 折线图数据
    lineData: [],
    // 站点聚集程度
    levelData: [],
    // 某某柱状图数据
    barData: [],
    // 某某散点图数据
    scatterData: [],
    // 个人出行方式数据
    userRouteData: [],
    // 热力图数据
    heatMapData: [],
    // 表格数据
    tableData: [],
    // 取消请求列表
    cancelTokenArr: []
}
  
export default state
  
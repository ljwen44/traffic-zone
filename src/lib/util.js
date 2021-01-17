import Cookies from 'js-cookie'
import { subwayMap, subwayMapVal, map1, map2, map3, busPoints } from '@/lib/map.js'
import { GPS } from '@/lib/tools.js'

// 存取 token
export const setToken = (tokenName) => {
    return Cookies.set(tokenName)
}

// 获取 token
export const getToken = (tokenName) => {
    return Cookies.get(tokenName)
}

// 合并地铁数据，将对应经纬度的值拼接在一起
var convertData = () => {
    var res = [];
    for (var i = 0; i < subwayMapVal.length; i++) {
        var geoCoord = subwayMap[subwayMapVal[i].name];    //首先根据data中的name作为键值读入地理坐标
        if (geoCoord) {
            res.push({
                name: subwayMapVal[i].name,
                value: geoCoord.concat(subwayMapVal[i].value)   //随后将地理坐标与对应信息值衔接起来
                //成为了 [name 经度 纬度 value]的形式
            });
        }
    }
    return res;
};
var DataConver = (data) => {
    // fromName, toName, coords
    var res = [];
    var startArr = [],
        endArr = []
    for(let i=0; i < data.length; i++){
        startArr.push({
            name: data[i].fromName,
            value: data[i].coords[0]
        })
        endArr.push({
            name: data[i].toName,
            value: data[i].coords[1]
        })
    }
    res.push(startArr)
    res.push(endArr)
    return res
}

// 将公交车数据转化为特定格式的数据
var convertBusData = () => {
    var res = [];
    for(var key in busPoints){
        res.push({
            name: key,
            value: busPoints[key]
        })
    }
    return res
}

// 获取地图连线的点
var getCoords = (map) => {
    var line = []
    for(let i = 0; i < map.length; i++){
        // 根据站点名称拿到经纬度
        line.push(subwayMap[map[i].name])
    }
    return line
}
var getLines = () => {
    var lineData = []
    var line = []
    var lineColor = ['red', 'yellow', 'lightblue']
    line.push(getCoords(map1))
    line.push(getCoords(map2))
    line.push(getCoords(map3))
    for (let index = 0; index < line.length; index++) {
        lineData.push({
            "coords": line[index],
            lineStyle: {
                normal: {
                    color: lineColor[index]
                }
            }
        })
    }
    return lineData
};

// 将 WBS84 --> GCJ-02
var changeCoords = (obj) => {
    var objResult = {}
    for(let key in obj){
        // 将 WGS-84 --> GCJ-02
        let GCJ = GPS.gcj_encrypt(obj[key][0], obj[key][1])
        objResult[key] = [GCJ['lat'], GCJ['lon']]
    }
    return objResult
}
export { convertData, getLines, convertBusData, DataConver, changeCoords }

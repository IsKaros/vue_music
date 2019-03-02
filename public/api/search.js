import axios from 'axios'
import {config} from "./config";

export function searchHot() {
  return axios.get('/search/hot',{config})
}
// 必选参数 : keywords : 关键词
//
// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
export function search(keywords, type, limit,offset) {
  return axios.get('/search',{params:{keywords,type,limit,offset},...config})
}
//搜索建议
export function searchSuggest(keywords,type) {
  return axios.get('/search/suggest',{params:{keywords,type},...config})
}
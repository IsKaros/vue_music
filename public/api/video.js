import axios from 'axios'
import {config} from "./config";

export function videoUrl(id) {
  return axios.get('/video/url', {params: {id}, ...config})
}

export function videoDetail(id) {
  return axios.get('/video/detail', {params: {id}, ...config})
}

export function videoComment(id,limit,offset=20) {
  return axios.get('/comment/video',{params:{id,limit,offset},...config})
}

export function relatedVideo(id) {
  return axios.get('/related/allvideo',{params:{id},...config})
}
// 0: 歌曲
//
// 1: mv
//
// 2: 歌单
//
// 3: 专辑
//
// 4: 电台
//
// 5: 视频
export function hotComment(id,type) {
  return axios.get('/comment/hot',{params:{id,type},...config})
}
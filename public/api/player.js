import axios from 'axios'
import {config} from "./config";

export function song(id) {
  return axios.get('/song/url',{params:{id},...config})
}
export function checkSong(id) {
  return axios.get('/check/music',{params:{id},...config})
}
export function lyric(id) {
  return axios.get('/lyric',{params:{id},...config})
}
export function album(id) {
  return axios.get('/album',{params:{id},...config})
}
export function songDetail(ids) {
  return axios.get('/song/detail',{params:{ids},...config})
}
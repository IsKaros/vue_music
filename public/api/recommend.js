import axios from 'axios'
import {config} from './config'
export function Banner() {
   return axios.get('/banner',config)
}

export function RecommendSongList() {
  return axios.get(`/personalized`, config)
}
export function RecommendDailyList() {
  return axios.get(`/recommend/resource`, config)
}
export function RefreshLogin() {
  return axios.get(`/refresh`)
}
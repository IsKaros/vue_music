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
<<<<<<< HEAD
}
export function RecommendMusic() {
  return axios.get('/personalized/newsong', config)
=======
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
}
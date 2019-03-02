import axios from 'axios'
import {HOST,config} from './config'
export function UserDetail(id) {
  return axios.get(`/user/detail?uid=${id}`, config)
}

export function subCount() {
  axios.get('/user/subcount', config)
}
export function userPlaylist() {
  axios.get('/user/playlist', config)
}
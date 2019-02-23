import axios from 'axios'
import {config} from "./config";

const baseUrl = '/login'
export function ByEmail (email, password) {
  return axios.get(`${baseUrl}`,{...config,params:{
  email,password}
  })
}
export function Refresh() {
  return axios.get(`${baseUrl}/refresh`, config)
}
export function Status() {
  return axios.get(`${baseUrl}/status`, config)
}

import axios from 'axios'
import {config} from "./config";

const baseUrl = '/login'
export function ByEmail (email, password) {
  return axios.get(`${baseUrl}`,{...config,params:{
  email,password}
  })
}
<<<<<<< HEAD
export function ByPhone(phone, password) {
  return axios.get(`${baseUrl}`,{...config,params:{
      phone,password}
  })
}
=======
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
export function Refresh() {
  return axios.get(`${baseUrl}/refresh`, config)
}
export function Status() {
  return axios.get(`${baseUrl}/status`, config)
}

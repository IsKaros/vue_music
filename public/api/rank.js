import axios from 'axios'
import {config} from "./config";

export function topListDetail() {
  return axios.get('/toplist/detail',{config})
}
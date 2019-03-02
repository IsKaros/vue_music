import axios from "axios";
import {config} from "./config";

export function listDetail(id) {
  return axios.get('/playlist/detail', {params:{id},...config})
}
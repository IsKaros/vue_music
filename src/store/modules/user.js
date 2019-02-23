import {ByEmail} from '../../../public/api/login'
import * as types from '../mutation_types'
const state = {
  user: {}
}
const getters = {
  getUser: state => state.user
}

const mutations = {
  [types.INIT_USER](state, user){
    state.user = user
  }
}
const actions = {
  loginByEmail({commit,state},{email,password}) {
    ByEmail(email,password).then(res => commit(types.INIT_USER,res))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

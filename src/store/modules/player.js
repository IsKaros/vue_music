import * as types from '../mutation_types'
import {song, songDetail, lyric} from "../../../public/api/player";
import {listDetail} from "../../../public/api/songList";
import {deepClone} from "../../../public/js/tools";

const state = {
  playList: [],
  playModes: ['列表循环', '单曲循环', '随机播放'],
  currentPlayMode: '列表循环',
  currentSong: {},
  currentIndex: 0,
  currentTime: 0,
  showPlayer: false,
  pause: false,
  currentUrl: ''
}

const getters = {
  getPlayList: (state) => state.playList,
  getCurrentSong: (state) => state.currentSong,
  getCurrentIndex: (state) => state.currentIndex,
  getCurrentTime: (state) => state.currentTime,
  getCurrentPlayMode: (state) => state.currentPlayMode,
  getShowPlayer: (state) => state.showPlayer,
  getPause: (state) => state.pause,
  getCurrentUrl: (state) => state.currentUrl
}
const mutations = {
  [types.ADD_SONG](state, song) {
    console.log(222)
    state.playList.push(song)
  },
  [types.ADD_LIST](state, list) {
    list.forEach((item) => {
      state.playList.push(item)
    })
  },
  [types.REMOVE_SONG](state, index) {
    state.playList.splice(index, 1)
  },
  [types.SET_PAUSE](state, flag) {
    state.pause = flag
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_CURRENT_SONG](state, index) {
    console.log(111)
    state.currentSong = state.playList[index]
  },
  [types.SET_CURRENT_TIME](state, time) {
    state.currentTime = time
  },
  [types.CHANGE_PLAY_MODE](state) {
    for (var i = 0; i < state.playModes.length; i++) {
      console.log(state.currentPlayMode, state.playModes[i])
      if (state.currentPlayMode === state.playModes[i]) {
        i >= state.playModes.length - 1 ? state.currentPlayMode = state.playModes[0] : state.currentPlayMode = state.playModes[i + 1]
        return
      }
    }
  },
  [types.SET_CURRENT_URL](state, url) {
    state.currentUrl = url
  },
  [types.CLEAR_LIST](state) {
    state.playList = []
  },
  [types.SET_SHOW_PLAYER](state, flag) {
    state.showPlayer = flag
  }
}
const actions = {
  addSong({commit, state}, id) {
    console.log(3333)
    var songId = id
    var albumCover = ''
    var alias = ''
    var albumId = ''
    var songCover = ''
    var songLyric = ''
    var songName = ''
    var artistName = ''
    var duration = 0
    songDetail(id).then(res => {
      console.log(res)
      songName = res.data.songs[0].name
      duration = res.data.songs[0].dt
      albumId = res.data.songs[0].al.id
      albumCover = res.data.songs[0].al.picUrl
      alias = res.data.songs[0].alia.name
      res.data.songs[0].ar.forEach((item, index) => {
        if (index !== 0) {
          artistName += '/'
        }
        artistName += item.name
      })
      songCover = res.data.songs[0].al.picUrl
      var song = {songId, songCover, songLyric, songName, duration, artistName, albumCover, albumId,}
      commit('ADD_SONG', song)
      console.log(state.playList)
    }).catch(e => {
      console.log(e)
    })

  },

  async addList({state, commit, dispatch}, {id, flag}) {
    commit('CLEAR_LIST')
    if (flag) {
      return
    }
    var tracks;
    // var list = [];
    var index = state.playList.length
    let result = await listDetail(id).then(res => {
      tracks = res.data.playlist.tracks
    }).then(() => {
      for (let item of tracks) {
        dispatch('addSong', item.id)
      }
    })
    commit('SET_CURRENT_SONG', index)
    commit('SET_SHOW_PLAYER', true)
    commit('SET_PAUSE', false)
    // console.log(111)
    // console.log(state.playList)
    //

  },
  setList({state, commit, dispatch}, {id, flag}) {
    var index = state.playList.length
    dispatch('addList', {id, flag}).then(() => {
      commit('SET_CURRENT_SONG', index)
      commit('SET_SHOW_PLAYER', true)
      commit('SET_PAUSE', false)
    })

    // console.log(state.playList)
    // await commit('SET_CURRENT_SONG', index)
    // commit('SET_SHOW_PLAYER', true)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
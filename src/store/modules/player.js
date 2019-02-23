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
  pause: true,
}

const getters = {
  getPlayList: (state) => state.playList,
  getCurrentSong: (state) => state.currentSong,
  getCurrentIndex: (state) => state.currentIndex,
  getCurrentTime: (state) => state.currentTime,
  getCurrentPlayMode: (state) => state.currentPlayMode,
  getShowPlayer: (state) => state.showPlayer,
  getPause: (state) => state.pause
}
const mutations = {
  [types.ADD_SONG](state, song) {
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
    state.currentSong = state.playList[index]
  },
  [types.SET_CURRENT_TIME](state, time) {
    state.currentTime = time
  },
  [types.CHANGE_PLAY_MODE](state) {
    for (var i = 0; i < state.playModes.length; i++) {
      console.log(state.currentPlayMode, state.playModes[i])
      if (state.currentPlayMode === state.playModes[i]) {
        i >= state.playModes.length-1 ? state.currentPlayMode = state.playModes[0] : state.currentPlayMode = state.playModes[i + 1]
        return
      }
    }
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
    var songId = id
    var url = ''
    var albumCover = ''
    var alias = ''
    var albumId = ''
    var songCover = ''
    var songLyric = ''
    var songName = ''
    var artistName = ''
    var duration = 0
    var promise1 = song(id)
    var promise2 = songDetail(id)
    var promise3 = lyric(id)
    var p = Promise.all([promise1, promise2, promise3]).then(res => {
      console.log(res)
      url = res[0].data.data[0].url
      songName = res[1].data.songs[0].name
      duration = res[1].data.songs[0].dt
      albumId = res[1].data.songs[0].al.id
      albumCover = res[1].data.songs[0].al.picUrl
      alias = res[1].data.songs[0].alia.name
      res[1].data.songs[0].ar.forEach((item, index) => {
        if (index !== 0) {
          artistName += '/'
        }
        artistName += item.name
      })
      songLyric = res[2].data.lrc.lyric || ''
      songCover = res[1].data.songs[0].al.picUrl
      commit('ADD_SONG', {songId, url, songCover, songLyric, songName,duration, artistName, albumCover, albumId,})
    }).catch(e => {
      console.log(e)
    })

  },
  getUrl({},id){

  },
  async addList({state, commit, dispatch}, {id, flag}) {
    if (flag) {
      return
    }
    var tracks
    var promiseA =[]
    listDetail(id).then(res => {
      res.data.playlist.tracks.forEach((item, index) => {
        tracks = res.data.playlist.tracks
      })
    }).then(res => {
      tracks.forEach((item, index) => {
        // promiseA.push(dispatch('addSong', item.id))
        dispatch('addSong', item.id)
        if (index === tracks.length - 1) {

          commit('SET_SHOW_PLAYER', true)
        }
      })
    }).then(() => {
      commit('SET_CURRENT_SONG', 0)
      commit('SET_CURRENT_INDEX', 0)
    })
    // new Promise.all(promiseA).then(res)
    await setTimeout(() => {
      commit('SET_CURRENT_SONG', 0)
      commit('SET_CURRENT_INDEX', 0)
    },500)
  },

}

export default {
  state,
  getters,
  mutations,
  actions
}
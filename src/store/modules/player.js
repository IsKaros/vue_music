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
<<<<<<< HEAD
  pause: false,
  currentUrl: ''
=======
  pause: true,
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
}

const getters = {
  getPlayList: (state) => state.playList,
  getCurrentSong: (state) => state.currentSong,
  getCurrentIndex: (state) => state.currentIndex,
  getCurrentTime: (state) => state.currentTime,
  getCurrentPlayMode: (state) => state.currentPlayMode,
  getShowPlayer: (state) => state.showPlayer,
<<<<<<< HEAD
  getPause: (state) => state.pause,
  getCurrentUrl: (state) => state.currentUrl
}
const mutations = {
  [types.ADD_SONG](state, song) {
    console.log(222)
=======
  getPause: (state) => state.pause
}
const mutations = {
  [types.ADD_SONG](state, song) {
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
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
<<<<<<< HEAD
    console.log(111)
=======
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
    state.currentSong = state.playList[index]
  },
  [types.SET_CURRENT_TIME](state, time) {
    state.currentTime = time
  },
  [types.CHANGE_PLAY_MODE](state) {
    for (var i = 0; i < state.playModes.length; i++) {
      console.log(state.currentPlayMode, state.playModes[i])
      if (state.currentPlayMode === state.playModes[i]) {
<<<<<<< HEAD
        i >= state.playModes.length - 1 ? state.currentPlayMode = state.playModes[0] : state.currentPlayMode = state.playModes[i + 1]
=======
        i >= state.playModes.length-1 ? state.currentPlayMode = state.playModes[0] : state.currentPlayMode = state.playModes[i + 1]
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
        return
      }
    }
  },
<<<<<<< HEAD
  [types.SET_CURRENT_URL](state, url) {
    state.currentUrl = url
  },
=======
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
  [types.CLEAR_LIST](state) {
    state.playList = []
  },
  [types.SET_SHOW_PLAYER](state, flag) {
    state.showPlayer = flag
  }
}
const actions = {
  addSong({commit, state}, id) {
<<<<<<< HEAD
    console.log(3333)
    var songId = id
=======
    var songId = id
    var url = ''
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
    var albumCover = ''
    var alias = ''
    var albumId = ''
    var songCover = ''
    var songLyric = ''
    var songName = ''
    var artistName = ''
    var duration = 0
<<<<<<< HEAD
    songDetail(id).then(res => {
      console.log(res)
      songName = res.data.songs[0].name
      duration = res.data.songs[0].dt
      albumId = res.data.songs[0].al.id
      albumCover = res.data.songs[0].al.picUrl
      alias = res.data.songs[0].alia.name
      res.data.songs[0].ar.forEach((item, index) => {
=======
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
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
        if (index !== 0) {
          artistName += '/'
        }
        artistName += item.name
      })
<<<<<<< HEAD
      songCover = res.data.songs[0].al.picUrl
      var song = {songId, songCover, songLyric, songName, duration, artistName, albumCover, albumId,}
      commit('ADD_SONG', song)
      console.log(state.playList)
=======
      songLyric = res[2].data.lrc.lyric || ''
      songCover = res[1].data.songs[0].al.picUrl
      commit('ADD_SONG', {songId, url, songCover, songLyric, songName,duration, artistName, albumCover, albumId,})
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
    }).catch(e => {
      console.log(e)
    })

  },
<<<<<<< HEAD

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
=======
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

>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
}

export default {
  state,
  getters,
  mutations,
  actions
}
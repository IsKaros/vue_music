<template>
  <div class="player" v-show="showPlayer" @click="goDetail">
    <audio :src="songUrl" ref="audio" autoplay></audio>
    <img :src="currentSong.songCover"  class="song-cover detail">
    <div class="song-detail detail">
      <div class="name">{{currentSong.name}}<span v-if="currentSong.alias">({{currentSong.alias}})</span></div>
      <div class="artist">{{currentSong.artistName}}</div>
    </div>
    <span class="mode " :class="state" @click="changeState"></span>
    <span class="menu icon-menu" @click="show(true)"></span>
    <div class="cover" @click="hideList(false)" v-show="showList"></div>
    <PlayList v-show="showList" :show="showList" @hideList="showList=false" @chooseSong="resetPlay" ></PlayList>
  </div>
  
</template>
<script>
  import PlayList from '../playList/PlayList'
  import {song} from '../../../public/api/player'
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name: 'Player',
    data(){
      return {
        selfShow: false,
        showList: false,
        songUrl: ''
      }
    },
    created(){
      console.log(this.pause)
      this.playEnd()
      this.timeUpdate()
    },
    computed:{
      ...mapGetters({mode:'getMode',pause:'getPause',playList:'getPlayList',currentSong:'getCurrentSong',showPlayer:'getShowPlayer',playMode: 'getCurrentPlayMode',currentIndex:'getCurrentIndex'}),
      state(){
        if(this.pause === false){
          return 'icon-pause'
        }else {
          return 'icon-music_play'
        }
      },
    },
    watch:{
      pause(newValue){
        console.log(newValue)
        if(newValue === true){
          this.$refs.audio.pause()
        }else {
          this.$refs.audio.play()
        }
      },
      currentIndex(newValue){
        this.$refs.audio.play()
      },
      currentSong(newValue){
        this.getUrl()
        if(newValue.id !== ''){
          this.getUrl()
        }
      }
    },
    methods:{
      ...mapMutations(['SET_CURRENT_SONG','SET_CURRENT_INDEX','REMOVE_SONG','SET_PAUSE','SET_CURRENT_TIME']),
      show(flag){
        this.showList = flag
      },
      hide(){
        this.showList = false
      },
      playEnd(){
        this.$nextTick(() => {
          this.$refs.audio.onended = async () => {
            this.$refs.audio.pause()
            if(this.playMode === '列表循环'){
              if(this.currentIndex >=this.playList.length -1){
                await this.getUrl(this.playList[this.currentIndex].songId)
                this.SET_CURRENT_INDEX(0)
                this.SET_CURRENT_SONG(0)

              }
              this.SET_CURRENT_INDEX(this.currentIndex+1)
              console.log(this.playList,this.currentIndex)
              await this.getUrl(this.playList[this.currentIndex].songId)
              this.SET_CURRENT_SONG(this.currentIndex)
            }else if(this.playMode === '随机播放'){
              this.SET_CURRENT_INDEX(parseInt(Math.random()*(this.playList.length-1)))
              console.log(this.playList[this.currentIndex].id)
              await this.getUrl(this.playList[this.currentIndex].songId)
              this.SET_CURRENT_SONG(this.currentIndex)
            }else if(this.playMode === '单曲循环') {
              this.$refs.audio.currentTime = 0
            }
            this.$refs.audio.play()
          }
        })

      },
      getUrl(){
        song(this.currentSong.id).then(res => {
          console.log(this.currentSong.id)
          this.songUrl = res.data.data[0].url
        })
      },
      hideList(flag){
        this.showList = flag
      },
      resetPlay(){
        this.$refs.audio.pause()
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      },
      changeState(){
        if(this.pause === false){
          this.SET_PAUSE(true)
          this.$refs.audio.pause()
        }else {
          this.SET_PAUSE(false)
          this.$refs.audio.play()
        }
      },
      goDetail(e){
        if(e.target.classList.contains('detail')){
          this.$router.push('/song')
        }
      },
      timeUpdate(){
        this.$nextTick(() => {
          this.$refs.audio.ontimeupdate = () => {
            this.SET_CURRENT_TIME(this.$refs.audio.currentTime)
          }
        })
      }
    },
    components: {
      PlayList
    }
  }
</script>
<style lang="scss" scoped>
  .player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 7.50vh;
    z-index: 101;
    background-color: #fff;
    .cover {
      position: fixed;
      left: 0;
      top:0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .song-cover {
      margin: 1.05vh 1.86vw;
      width: 9.6vw;
      height: 9.6vw;
      border-radius: 2%;
      vertical-align: middle;
    }
    .song-detail {
      display: inline-block;
      width: 62.13vw;
      height: 9.6vw;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .artist {
        font-size: 12px;
        color: #aaa;
      }
    }
    .menu {
      font-size: 24px;
      line-height: 24px;
      vertical-align: middle;
      margin-left: 2.8vw;
    }
    .mode {
      font-size: 24px;
      vertical-align: middle;
      margin-left: 2.8vw;
    }
  }
</style>
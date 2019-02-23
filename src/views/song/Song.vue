<template>
  <div class="song-page">
    <header>
      <span class="icon icon-arrow_back" @click="$router.go(-1)"></span>
      <div class="song-info">
        <div class="name">{{currentSong.songName}}<span v-if="currentSong.alias">({{currentSong.alias}})</span></div>
        <span class="artist">{{currentSong.artistName}} </span>
        <span class=" icon-navigate_next"></span>
      </div>
      <span class="share icon-share"></span>
    </header>
    <div class="record-wrapper">
      <div class="record">
        <transition name="play">
          <img class="disk-play" src="../../../public/images/disk.png" alt="" v-show="!pause">
        </transition>
        <transition name="pause">
          <img class="disk-pause" src="../../../public/images/disk.png" alt="" v-show="pause">
        </transition>
        <img src="../../../public/images/record.png" alt="" class="cover"
             :style="{backgroundImage:'url('+currentSong.songCover+')'}" ref="record">
        <!--<img :src="currentSong.imgCover" alt="" class="cover">-->
      </div>
      <div class="options">
        <span class="icon-like_negative"></span>
        <span class="icon-download"></span>
        <span class="icon-comments"></span>
        <span class="icon-more_vert"></span>
      </div>
    </div>
    <div class="duration">
      <span class="current-time">{{currentTime|current}}</span>
      <mu-slider class="duration-bar" color="secondary" v-model="durationBar" @change="setSlider"></mu-slider>
      <span class="duration-time">{{currentSong.duration|duration}}</span>
    </div>
    <div class="modes">
      <span class="play-mode " :class="playModeIcon" @click="changePlayMode"></span>
      <div class="modes-options">
        <img class="prev" src="../../../public/images/pre_song.png" @click="prevSong" alt="">
        <div class="mode">
          <img class="pause" src="../../../public/images/pause_song.png" alt="" ref="mode" @click="changeMode" v-show="pause">
          <img class="play" src="../../../public/images/play_song.png" alt="" ref="mode" @click="changeMode" v-show="!pause">
        </div>
        <img class="next" src="../../../public/images/next_song.png" @click="nextSong"  alt="">
      </div>
      <span class="icon icon-menu" @click="isShow
= true"></span>
    </div>
    <div class="list-cover" v-show="isShow" @click="isShow=false"></div>
    <transition name="slideUp">
      <PlayList v-show="isShow" ref="lists" @hidden="hide"></PlayList>
    </transition>
  </div>
</template>
<script>
  import {filterDuration} from "../../../public/js/tools";
  import {mapGetters, mapMutations} from 'vuex'
  import PlayList from '../../components/playList/PlayList'
  export default {
    name: 'Song',
    data() {
      return {
        durationBar: 0,
        isShow: false
      }
    },
    created(){
      console.log(this.currentTime)
    },
    computed: {
      ...mapGetters({
        currentSong: 'getCurrentSong',
        currentIndex: 'getCurrentIndex',
        playList: 'getPlayList',
        pause: 'getPause',
        currentTime: 'getCurrentTime',
        currentPlayMode: 'getCurrentPlayMode',
      }),
      playModeIcon() {
        if (this.currentPlayMode === '列表循环') {
          return 'icon-list_loop'
        } else if (this.currentPlayMode === '单曲循环') {
          return 'icon-singal_loop'
        } else if (this.currentPlayMode === '随机播放') {
          return 'icon-random_loop'
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.pause === true) {
          this.$refs.record.style.animation = ''
        } else {
          this.$refs.record.style.animation = 'infiniteRotate 8s infinite linear'
        }
      })
    },
    watch: {
      currentTime(newValue) {
        this.durationBar = newValue / (this.currentSong.duration / 1000) * 100
      },
      pause(newValue) {
        console.log(newValue)
        if (newValue === true) {
          this.$refs.record.style.animation = ''
        } else {
          this.$refs.record.style.animation = 'infiniteRotate 8s infinite linear'
        }
      },
      currentPlayMode(newValue) {
        this.$toast.message({
          message: this.currentPlayMode,
          position: 'bottom',
          time: 3000,
          color: 'rgba(86,86,86,.6)',
          textColor: '#fff',
          close: false
        })
      }
    },
    methods: {
      ...mapMutations(['SET_CURRENT_TIME', 'CHANGE_PLAY_MODE', 'SET_PAUSE','SET_CURRENT_SONG','SET_CURRENT_INDEX']),
      setSlider(value) {
        this.durationBar = value
        this.$emit('changeTime', value)
      },
      changePlayMode() {
        this.CHANGE_PLAY_MODE()
      },
      changeMode() {
        if (this.pause) {
          this.SET_PAUSE(false)
          this.$emit('changeMode', true)
        } else {
          this.SET_PAUSE(true)
          this.$emit('changeMode', false)
        }
      },
      prevSong() {
        this.$emit('clear')
        if(this.currentIndex <= 0) {
          this.SET_CURRENT_SONG(this.playList.length - 1)
          this.SET_CURRENT_INDEX(this.playList.length - 1)
        } else {
          this.SET_CURRENT_SONG(this.currentIndex - 1)
          this.SET_CURRENT_INDEX(this.currentIndex - 1)
        }
      },
      nextSong() {
        this.$emit('clear')
        if(this.currentIndex >= this.playList.length - 1) {
          this.SET_CURRENT_SONG(0)
          this.SET_CURRENT_INDEX(0)
        }else {
          this.SET_CURRENT_SONG(this.currentIndex + 1)
          this.SET_CURRENT_INDEX(this.currentIndex + 1)
        }

      },
      hide() {
        this.isShow = false
      },
      _initScroll() {
        if (!this.listScroller) {
          this.listScroller = new BScroll(this.$refs.lists.$refs.songs, {
            click: true
          })
        } else {
          this.listScroller.refresh()
        }
      },
      playMusic(index) {
        if (index === this.currentIndex) {
          return
        }
        this.SET_PAUSE(false)
        this.$emit('play')
      }
    },
    filters: {
      current(time) {
        // console.log(time)
        return filterDuration(time * 1000)
      },
      duration(time) {
        // console.log(time)
        return filterDuration(time)
      }
    },
    components: {
      PlayList
    }
  }
</script>
<style lang="scss" >
  .mu-snackbar {
    display: inline-block;
    width: 25vw;
    height: 5vh;
    line-height: 4vh;
    transform: translateX(-50%);
    min-width: 0;
    min-height: 0;
    left: 50%;
    bottom: 9vh;
    border-radius: 12vw;
    transition: none;

  }
  .mu-snackbar-message {
    padding: 0;
    vertical-align: top;
  }
  .song-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    z-index: 120;
    background-color: #fff;
    overflow: hidden;
    header {
      position: relative;
      z-index: 20;
      height: 11.99vh;
      padding-top: 4.80vh;
      background: $color-theme;
      .icon {
        display: inline-block;
        width: 15.4vw;
        height: 7.19vh;
        line-height: 7.19vh;
        text-align: center;
        font-size: 24px;
        vertical-align: top;
        color: #fff;
      }
      .song-info {
        display: inline-block;
        width: 70.93vw;
        height: 7.19vh;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .name {
          font-size: 16px;
          color: #fff;
          span {
            font-size: 16px;
            color: #fff;
          }
        }
        .artist {
          /*margin-top: 1vh;*/
          font-size: 12px;
          color: rgb(177, 177, 177);
          vertical-align: middle;

        }
        span {
          font-size: 20px;
          vertical-align: middle;
          color: rgb(177, 177, 177);
        }

      }
      .share {
        display: inline-block;
        float: right;
        width: 12.8vw;
        height: 7.19vh;
        line-height: 7.19vh;
        font-size: 24px;
        color: #fff;
      }
    }
    .record-wrapper {
      margin: 0 6.4vw;
      @include border-t-1px(#f3f3f3);

      .record {
        width: 87.2vw;
        position: relative;
        z-index: 2;

        .play-enter,
        .play-leave-to {
          transform: rotate(-25deg);
          opacity: 0.7;
        }
        .play-enter-active,
        .play-leave-active {
          transition: all .2s linear;
        }
        .play-enter-to,
        .play-leave {
          transform: rotate(0);
          opacity: 0.7;
        }
        .pause-enter,
        .pause-leave-to {
          transform: rotate(0);
        }
        .pause-enter-active,
        .pause-leave-active {
          transition: all .2s linear;
        }
        .pause-enter-to,
        .pause-leave {
          transform: rotate(-25deg);
        }
        @keyframes infiniteRotate {
          0% {
            transform: rotate(0)
          }
          25% {
            transform: rotate(90deg)
          }
          50% {
            transform: rotate(180deg)
          }
          75% {
            transform: rotate(270deg)
          }
          100% {
            transform: rotate(360deg)
          }
        }
        .disk-play {
          width: 22.4vw;
          position: absolute;
          left: 45%;
          top: -4%;
          z-index: 5;
          transform-origin: 15% 9.5%;
        }
        .disk-pause {
          width: 22.4vw;
          position: absolute;
          left: 45%;
          top: -4%;
          transform-origin: 15% 9.5%;
          transform: rotate(-25deg);
        }
        .cover {
          margin: 9.6vh 8vw 0 8vw;
          width: 71.2vw;
          border-radius: 50%;
          background: no-repeat center center;
          -webkit-background-size: 50vw;
          background-size: 50vw;
          overflow: hidden;
        }

      }
    }
    .options {
      margin-top: 11.99vh;
      height: 8.40vh;
      display: flex;
      span {
        flex: 1;
        text-align: center;
        line-height: 8.40vh;
        font-size: 24px;
        color: #cbc6c2;
      }
    }
    .current-time {
      font-size: 12px;
      color: #8b8581;
    }
    .duration-bar {
      position: relative;
      display: inline-block;
      width: 71vw;
      height: 0.5vh;
      margin: 0 1.6vw;
      background-color: #8e837f;
      color: $color-theme;
      vertical-align: middle;
    }
    .duration {
      padding: 0 4.5vw;
    }
    .duration-time {
      display: inline-block;
      font-size: 12px;
      color: #776b66;
    }
    .modes {
      height: 11.2vh;
      padding: 0 5.86vw;
      margin-top: 4.80vh;
      background-color: #ccc;
      .modes-options {
        display: inline-block;
        margin: 0 10vw;
      }
      .play-mode {
        display: inline-block;
        width: 8vw;
        font-size: 24px;
        vertical-align: middle;
        color: #adacab;
      }
      .prev {
        width: 8.5vw;
      }

      .mode {
        display: inline-block;
        width: 14.93vw;
        margin: 0 9.6vw;
      }
      .pause,
      .play {
        width: 14.93vw;
      }
      .next {
        width: 8.5vw;
      }
      .icon {
        font-size: 24px;
        color: #adacab;
        vertical-align: middle;
      }
    }
    .list-cover {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 20;
      background-color: rgba(0,0,0,0.5);
    }
    .slideUp-enter,
    .slideUp-leave-to{
      transform: translateY(100%);
    }
    .slideUp-enter-active,
    .slideUp-leave-active {
      transition: all 0.5s linear;
    }
    .slideUp-enter-to,
    .slideUp-leave{
      transform: translateY(0);
    }
  }
</style>
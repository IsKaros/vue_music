<template>
  <transition name="slide">
    <div class="list" v-show="showList">
      <div class="list-head" @click="changePlayMode">
        <span class="mode" :class="playMode"></span>
        <span class="mode mode-desc ">{{currentPlayMode}} <span>({{playList.length}})</span>  </span>
        <div class="head-right">
          <span class="icon icon-collect"></span>
          <span class="collect">收藏全部</span>
          <span class="split">|</span>
          <span class="remove icon-delete" @click="CLEAR_LIST"></span>
        </div>
      </div>
      <ul class="list-content" ref="list">
        <div style="width: 100vw">
          <li class="list-item" v-for="(item,index) in playList" :class="{active:currentIndex===index}">
            <span class="playing icon-playing" v-show="currentIndex===index"></span>
            <div class="song-Info" @click="choose(index)">
               <span class="name">{{item.name}}</span>
            <span class="artist">&nbsp;-&nbsp;{{item.artistName}}</span>
            </div>
            <span class="delete icon-remove" @click="remove(index)"></span>
          </li>
        </div>
      </ul>
    </div>
  </transition>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'

  export default {
    name: 'PlayList',
    data() {
      return {
        showList: false
      }
    },
    props: {
      show: {
        type: Boolean,
      }
    },
    mounted() {
      console.log(this.$refs)
      this._initScroll()
    },
    computed: {
      ...mapGetters({currentPlayMode: 'getCurrentPlayMode', playList: 'getPlayList', currentIndex: 'getCurrentIndex'}),
      playMode() {
        if (this.currentPlayMode === '列表循环') {
          return 'icon-list_loop'
        } else if (this.currentPlayMode === '单曲循环') {
          return 'icon-singal_loop'
        } else if (this.currentPlayMode === '随机播放') {
          return 'icon-random_loop'
        }
      },

    },
    watch: {
      show(newValue) {
        if (newValue == true) {
          this.showList = this.show
        }
      }
    },
    methods: {
      ...mapMutations(['SET_CURRENT_SONG', 'SET_CURRENT_INDEX', 'CHANGE_PLAY_MODE', 'CLEAR_LIST']),
      hide() {
        this.showList = false
        setTimeout(() => {
          this.$emit('hideList', false)
        }, 500)

      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.listScroll) {
            this.listScroll = new BScroll(this.$refs.list, {
              click: true
            })
            console.log(this.listScroll)
          } else {
            this.listScroll.refresh()
          }
        })
      },
      remove(index) {
        this.REMOVE_SONG(index)
      },
      async choose(index) {
        this.SET_CURRENT_SONG(index)
        await this.SET_CURRENT_INDEX(index)
        this.$emit('chooseSong')
      },
      changePlayMode(e) {
        console.log(e.target)
        if (e.target.classList.contains('mode')) {
          console.log(111)
          this.CHANGE_PLAY_MODE()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .play-list {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 60vh;
    z-index: 201;
  }

  /*.cover {*/
  /*position: relative;*/
  /*height: 40vh;*/
  /*z-index: 205;*/
  /*background-color: rgba(0, 0, 0, 0.4);*/
  /*}*/
  .slide-enter,
  .slide-leave-to {
    transform: translateY(100%);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all .5s ease;
  }

  .slide-leave,
  .slide-enter-to {
    transform: translateY(0);
  }

  .list {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 60vh;
    z-index: 201;
    background-color: #fff;
    border-radius: 5% 5% 0 0;
    .list-head {
      height: 7.65vh;
      line-height: 7.65vh;
      @include border-b-1px(#e7e7e7)
    }
    .mode {
      margin: 0 2.9vw 0;
      font-size: 20px;
      color: #ccc;
      vertical-align: middle;
    }
    .mode-desc {
      vertical-align: middle;
      color: black;
      font-size: 16px;
      margin: 0;
    }
  }

  .head-right {
    float: right;
    width: 35.46vw;
    .icon {
      color: #ccc;
      font-size: 24px;
      vertical-align: middle;
    }

    .collect {
      margin-left: 2.1vw;
      vertical-align: middle;
    }
    .remove {

      font-size: 20px;
      vertical-align: middle;
      color: #9e9e9e;
    }
    .split {
      font-size: 16px;
      margin: 0 2.5vw;
    }
  }

  .list-content {
    width: 100vw;
    height: 52.35vh;
    overflow: hidden;
    .list-item {
      width: 96.8vw;
      height: 6.9vh;
      line-height: 6.9vh;
      margin-left: 3.2vw;
      &.active {
        color: $color-theme;
      }
      &.active .artist {
        color: $color-theme;
      }
      @include border-b-1px(#e7e7e7)
    }
    .playing {
      display: inline-block;
      height: 6.9vh;
      line-height: 6.9vh;
      margin-right: 2.13vw;
      font-size: 16px;
      vertical-align: top;
    }
    .song-Info {
      display: inline-block;
      width: 46.4vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .name {
      display: inline-block;

      height: 6.9vh;
      line-height: 6.9vh;
      font-size: 14px;
      text-align: center;
      vertical-align: top;
    }
    .artist {
      display: inline-block;

      height: 6.9vh;
      line-height: 6.9vh;
      margin-left: 1vw;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #bcbcbc;
    }
    .delete {
      display: inline-block;

      float: right;
      height: 6.9vh;
      line-height: 6.9vh;
      margin-right: 3.2vw;
      vertical-align: middle;
      font-size: 20px;
      color: #bcbcbc;
    }
  }
</style>
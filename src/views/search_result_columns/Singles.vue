<template>
  <div class="singles">
    <Loading v-if="!songs"></Loading>
    <div v-else>
      <div class="title">
        <div class="title-left" @click="playAll">
          <span class="icon icon-music_play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="title-right">
          <span class="icon icon-mutiple_options"></span>
          <span class="text">多选</span>
        </div>
      </div>
      <div style="height: 89.3vh;overflow: hidden" ref="wrapper">
        <ul>
          <li class="song" v-for="(item,index) in songs" :key="index">
            <div class="desc">
              <div class="song-title">
                <span class="name" :class="{keyword:keyWords===item.name}">{{item.name}}</span>
                <span class="alia">{{item.alias[0]}}</span>
              </div>
              <div class="album">
                <span class="singer">{{item.artists|artist}}</span>
                <span v-if="keyWords !== item.name" class="keyword">&nbsp;({{keyWords}})&nbsp;</span>
                <span>- </span>
                <span class="name">{{item.album.name}}</span>
              </div>
              <div class="alias" v-if="item.alias[0]">{{item.alias[0]}}</div>
            </div>
            <div class="icons">
              <span class="icon icon-video"></span>
              <span class="icon icon-more_vert"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  import {search} from "../../../public/api/search";
  import Loading from '../../components/loading/Loading'
  import BScroll from 'better-scroll'
  export default {
    name: 'Singles',
    props: {
      keyWords: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        songs: [],
        currentPage: 0,
      }
    },
    created() {
      console.log(this.keyWords)
      this.getSearchSingles(this.keyWords, 1, 100)
      this._initScroll()
    },
    watch: {
      keyWords(newValue, oldValue) {
        console.log(this.keyWords)
        this.getSearchSingles(newValue, 1, 100)
      }
    },
    methods: {
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      getSearchSingles(keyword, type = 1, limit = 100, offset = 0, pullUp=false) {
        if (keyword === '') {
          return
        }
        if(pullUp) {
          search(keyword, type, limit, offset).then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.songs = []
              this.songs = res.data.result.songs.splice(0, (this.currentPage + 1) * 20)
              console.log(this.songs)
            }
          })
          return
        }
          search(keyword, type, limit, offset).then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.songs = []
              this.songs = res.data.result.songs.splice(0, 20)
              console.log(this.songs)
            }
          })
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.songScroll) {
            this.songScroll = new BScroll(this.$refs.wrapper, {
              click: true,
              probeType: 2,
              pullUpLoad: {
                threshold: 50
              },
              pullDownRefresh: {
                threshold: 50,
                stop: 20
              }
            })
            this._pullUpLoad()
            this._pullDownRefresh()
          } else {
            this.songScroll.refresh()
          }
        })
      },
      _pullUpLoad() {
        this.songScroll.on('pullingUp',() => {
          this.currentPage++
          this.getSearchSingles(this.keyWords, 1, 100, 0, true)
          this.songScroll.refresh()
          this.songScroll.finishPullUp()
        })
      },
      _pullDownRefresh() {
        this.songScroll.on('pullingDown', () => {
          this.getSearchSingles(this.keyWords, 1, 100 )
          this.songScroll.refresh()
          this.songScroll.finishPullDown()
        })
      },
      playAll() {

      }
    },
    filters: {
      // 格式化歌手名
      artist(arr) {
        let result = ''
        for (let i in arr) {
          result += arr[i].name
          if (parseInt(i) === arr.length - 1) {
            return result
          } else {
            result += '/'
          }
        }
        return result
      },
    },
    components: {
      Loading
    }
  }
</script>
<style lang="scss" scoped>
  .singles {
    .title {
      height: 7.20vh;
      background-color: #fff;
      color: #000;
      @include border-b-1px(#f3f3f3);
      .title-left {
        display: inline-block;
        height: 7.20vh;
        line-height: 7.20vh;
        .icon {
          margin: 0 1.6vw;
          font-size: 20px;
          vertical-align: middle;
          color: #000;
        }
        .text {
          font-size: 18px;
          font-weight: 700;
          vertical-align: middle;
        }
      }
      .title-right {
        display: inline-block;
        float: right;
        height: 7.20vh;
        line-height: 7.20vh;
        .icon {
          font-size: 16px;
          vertical-align: middle;
          color: #6b6b6b;
        }
        .text {
          margin: 0 2.67vw 0 1.33vw;
          vertical-align: middle;
        }
      }
    }
    .song {
      width: 100%;
      margin-left: 2.13vw;
      box-sizing: border-box;
      @include border-b-1px(#f6f6f6);
      .desc {
        display: inline-block;
        width: 73.6vw;
        vertical-align: middle;
        .keyword {
          font-size: 12px;
          color: #507daf;
        }
        .song-title {
          display: inline-block;
          width: 74.4vw;
          margin-top: 1.5vh;
          font-size: 16px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          vertical-align: middle;
          .name {
            font-size: 16px;
            margin-right: 1.6vw;
            line-height: 2vh;
          }

          .alia {
            color: #939393;
          }
        }
        .album {
          display: inline-block;
          margin-top: 1vh;
          vertical-align: middle;
          .singer {
            font-size: 12px;
            line-height: 3.5vh;
            color: #939393;
          }

          .name {
            font-size: 12px;
            color: #939393;;
          }
        }
        .alias {
          display: inline-block;
          width: 74.4vw;
          font-size: 13px;
          line-height: 4vh;
          color: #939393;
        }
      }
      .icons {
        display: inline-block;
        width: 22.67vw;
        height: 100%;
        align-items: center;
        vertical-align: middle;
        .icon {
          font-size: 24px;
          color: #b3b3b3;
          &:first-child {
            margin-left: 4.27vw;
            margin-right: 2vw;
          }
          &:nth-child(2) {
            width: 12.8vw;
            text-align: center;
          }
        }
      }
    }

  }
</style>
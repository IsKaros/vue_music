<template>
  <div class="videos" ref="videos">
    <div >
      <ul>
        <li v-for="(item,index) in videos" :key="index" class="video" @click="goWatchVideo(item.vid)">
          <div class="picture-wrapper">
            <img :src="item.coverUrl" alt="" class="cover">
            <div class="count">
              <span class="icon icon-play_count"></span>
              <span class="num">{{item.playTime|count}}</span>
            </div>
          </div>
          <div class="desc">
            <div class="title">{{item.title}}</div>
            <div class="info">
              <span class="time">{{item.durationms|duration}}</span>
              <span>&nbsp;by&nbsp;</span>
              <span>{{item.creator[0].userName}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {search} from "../../../public/api/search";
  import {filterDuration, formateCount} from "../../../public/js/tools";
  import BScroll from 'better-scroll'
  export default {
    name: 'videos',
    props: {
      keyWords: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        videos: [],
        currentPage: 0
      }
    },
    created() {
      this.getSearchVideos(this.keyWords, 1014, 100)
    },
    mounted() {
      this._initScroll()
    },
    watch: {
      keyWords(newValue, oldValue) {
        console.log(this.keyWords)
        this.getSearchSingles(newValue, 1014, 100)
      }
    },
    methods: {
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      getSearchVideos(keywords, type=1, limit=30,offset=0, pullUp=false) {
        if(pullUp) {
          search(keywords, type, limit,offset).then(res => {
            if(res.data.code === 200) {
              this.videos = res.data.result.videos.splice(0, (this.currentPage + 1) * 20)
              console.log(this.videos)
            }
          })
        }
        search(keywords, type, limit,offset).then(res => {
          if(res.data.code === 200) {
            this.videos = res.data.result.videos.splice(0, 20)
            console.log(this.videos)
          }
        })
      },
      _initScroll() {
        this.$nextTick(() => {
          if(!this.videoScroll) {
            this.videoScroll = new BScroll(this.$refs.videos, {
              click: true,
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
            console.log(this.videoScroll)
          } else {
            this.videoScroll.refresh()
          }
        })
      },
      _pullUpLoad() {
        this.videoScroll.on('pullingUp',() => {
          this.currentPage++
          this.getSearchVideos(this.keyWords, 100, 100, 0, true)
          this.videoScroll.refresh()
          this.videoScroll.finishPullUp()
        })
      },
      _pullDownRefresh() {
        this.videoScroll.on('pullingDown', () => {
          this.getSearchVideos(this.keyWords, 100, 100 )
          this.videoScroll.refresh()
          this.videoScroll.finishPullDown()
        })
      },
      goWatchVideo(id) {
        console.log(id)
        this.$router.push({name: 'video', query: {id: id}})
      }
    },
    filters: {
      duration(time) {
        return filterDuration(time)
      },
      count(count) {
        return formateCount(count)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .videos {
    height: 86.5vh;
    overflow: hidden;
    .video {
      padding: 1.2vh 0 0 2.13vw;
      .picture-wrapper {
        display: inline-block;
        position: relative;
        width: 35.47vw;
        height: 11.9vh;
        vertical-align: middle;
        .cover {
          width: 35.47vw;
          border-radius: 4%;
        }
        .count {
          position: absolute;
          right: 1vw;
          top: 0.5vh;
          color: #fff;
          .icon {

            vertical-align: middle;
          }
          .num {
            vertical-align: middle;
          }
        }
      }
      .desc {
        display: inline-block;
        width: 60vw;
        height: 11.9vh;
        padding-bottom: 1vh;
        margin-left: 2vw;
        vertical-align: middle;
        @include border-b-1px(#f3f3f3);
        .title {
          margin-top: 2vh;
          line-height: 3vh;
        }
        .info {
          margin-top: 0.5vh;
          font-size: 12px;
          color: #a1a1a1;
        }
      }
    }
  }

</style>
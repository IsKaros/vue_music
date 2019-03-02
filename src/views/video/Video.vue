<template>
  <div class="video">
    <div class="video-wrapper" @click="toggleCover">
      <transition name="down">
        <div class="header" v-show="showCover">
<<<<<<< HEAD
          <span class="icon icon-arrow_back" @click="$router.go(-1)"></span>
=======
          <span class="icon icon-arrow_back"></span>
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
          <div class="title">{{videoDetail.title}}</div>
          <span class="share icon-share"></span>
          <span class="more icon-more_vert"></span>
        </div>
      </transition>
      <video :src="url" class="video" ref="video" autoplay></video>
      <div class="current-mode" v-show="showCover">
        <img src="../../../public/images/pause.png" alt="" class="mode" v-show="!pause" @click="pauseVideo">
        <img src="../../../public/images/play.png" alt="" class="mode" v-show="pause" @click="playVideo">
      </div>
      <transition name="up">
        <div class="footer" v-show="showCover">
          <span class="current-time" v-if="url" @click="changeCurrentTime($event)">{{currentTime|currentTime}}</span>
          <span class="duration" @click="changeCurrentTime($event)">/{{videoDetail.durationms|duration}}</span>
          <span class="full-screen icon-full_screen"></span>
        </div>
      </transition>
      <progress class="progress" value="0" max="100" @click="setProgress"></progress>
      <div class="curr-progress" :style="{width:progress+'vw'}" @click="setProgress"></div>
    </div>
    <div ref="contentWrapper" style="height: 68.22vh;overflow: hidden">
      <Loading v-if="!videoDetail"></Loading>
      <div class="content" v-if="videoDetail">
        <header class="header">
          <div class="title">{{videoDetail.title}}</div>
          <span class="icon icon-arrow_down"></span>
        </header>
        <div class="info">
          <div class="publish">
            <span>发布</span>
            <span>&nbsp;:&nbsp;</span>
            <span>{{videoDetail.publishTime|date}}</span>
          </div>
          <div class="split">|</div>
          <div class="play-count">
            <span>播放</span>
            <span>&nbsp;:&nbsp;</span>
            <span>{{videoDetail.playTime|count}}</span>
          </div>
        </div>
        <div class="desc">{{videoDetail.description}}</div>
        <div class="tags">
          <ul>
            <li class="tag" v-for="(item,index) in videoDetail.videoGroup" :key="index">
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="choices">
          <div class="choice">
            <span class="icon icon-thumbs_up"></span>
            <span class="count">{{videoDetail.praisedCount}}</span>
          </div>
          <div class="choice">
            <span class="icon icon-collect"></span>
            <span class="count">{{videoDetail.subscribeCount}}</span>
          </div>
          <div class="choice">
            <span class="icon icon-comments"></span>
            <span class="count">{{videoDetail.commentCount}}</span>
          </div>
          <div class="choice">
            <span class="icon icon-share"></span>
            <span class="count">{{videoDetail.shareCount}}</span>
          </div>
        </div>
        <div class="creator" v-if="videoDetail.creator" ref="creator" >
          <img :src="videoDetail.avatarUrl" alt="" class="avatar">
          <span class="name">{{videoDetail.creator.nickname}}</span>
          <span class="follow">+&nbsp;关 注</span>
        </div>
        <div class="related">
          <header>相关推荐</header>
          <ul>
            <li v-for="(item,index) in relatedVideos" :key="index" class="video" @click="goWatchVideo(item.vid)">
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
        <div class="hot-comments">
          <header>精彩评论</header>
          <Comment :comments="hotComments" v-if="hotComments"></Comment>
        </div>
        <div class="latest-comments">
          <header>最新评论</header>
          <Comment :comments="latestComments" v-if="latestComments"></Comment>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {videoUrl, videoDetail, videoComment, relatedVideo, hotComment} from "../../../public/api/video";
  import {filterDuration, formateCount,doubleDuration} from "../../../public/js/tools";
  import BScroll from 'better-scroll'
  import Comment from '../../components/comment/Comment'
  import Loading from '../../components/loading/Loading'
  export default {
    name: 'Video',
    data() {
      return {
        url: '',
        videoDetail: {},
        showCover: false,
        currentTime: 0,
        pause: false,
        progress: null,
        relatedVideos: null,
        hotComments: null,
        latestComments: null,
        currentPage: 0,
        clientHeight: 0,
      }
    },
    created() {
      this.getVideo(this.$route.query.id)
      this.getRelatedVideo(this.$route.query.id)
      this.getHotComment(this.$route.query.id, 5)
      this.getVideoComment(this.$route.query.id, 100, 0)
      // this.getVideoDetai(this.$route.query.id)
    },
    mounted() {
      this.currentTime = this.$refs.video.currentTime
      this.getTimeUpdate()
      this._initScroll()
      this.clientHeight = document.documentElement.clientHeight
      window.onresize = function temp() {
        this.clientHeight = document.documentElement.clientHeight
      }
      console.log(this.$refs)
    },
    methods: {
      getVideo(id) {
        videoUrl(id).then(res => {
          if (res.data.code === 200) {
            console.log(res.data)
            this.url = res.data.urls[0].url
          }
        })
        videoDetail(id).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            this.videoDetail = res.data.data
          }
        })
      },
      getTimeUpdate() {
        this.$refs.video.ontimeupdate = () => {
          this.currentTime = this.$refs.video.currentTime.toFixed(0)
          this.progress = this.currentTime / (this.videoDetail.durationms / 1000) * 100
          // this.currentTime = this.filterDuration(this.currentTime)
        }
      },
      getRelatedVideo(id) {
        relatedVideo(id).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            this.relatedVideos = res.data.data
          }
        })
      },
      getHotComment(id, type) {
        hotComment(id, type).then(res => {
          if (res.data.code === 200) {
            this.hotComments = res.data.hotComments
            console.log(this.hotComments)

          }
        })
      },
      getVideoComment(id, limit = 100, offset = 0, pullUp = false) {
        if (pullUp) {
          videoComment(id, limit, offset).then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.latestComments = this.sortByTime(res.data.comments).splice(0, (this.currentPage + 1) * 20)
              console.log(this.latestComments)
            }
          })
          return
        }
        videoComment(id, limit, offset).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            this.latestComments = this.sortByTime(res.data.comments).splice(0, 20)
            console.log(this.latestComments)
          }
        })
      },
      sortByTime(arr, key) {
        return arr.sort((a, b) => {
          let x = a[key]
          let y = b[key]
          return ((x > y) ? 1 : (x < y ? -1 : 0))
        })
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.videoScroll) {
            this.videoScroll = new BScroll(this.$refs.contentWrapper, {
              click: true,
              pullUpLoad: {
                threshold: 50
              },
            })
            this._pullUpLoad()
            this._scroll()
          } else {
            this.videoScroll.refresh()
          }
        })
      },
      _pullUpLoad() {
        this.videoScroll.on('pullingUp', () => {
          this.currentPage++
          this.getVideoComment(this.keyWords, 100, 0, true)
          this.videoScroll.refresh()
          this.videoScroll.finishPullUp()
        })
      },
      _scroll() {
        this.videoScroll.on('scroll', () => {
          // console.log(this.videoScroll)
          if (Math.abs(this.videoScroll.y) / this.clientHeight >= 298 / 667) {
            console.log()
            this.$refs.creator.style.position = 'fixed'
            this.$refs.creator.style.left = '0px'
            this.$refs.creator.style.top = `${(Math.abs(this.videoScroll.y) / this.clientHeight  )*100 }vh`
            this.$refs.creator.style.zIndex =10
            this.$refs.creator.style.backgroundColor ='#f3f3f3'
          } else {
            this.$refs.creator.style.position = null
            this.$refs.creator.style.backgroundColor = '#fff'
          }
        })
      },
      toggleCover() {
        this.showCover = !this.showCover
        setTimeout(() => {
          this.showCover = false
        }, 3000)
      },
      pauseVideo() {
        this.pause = true
        this.$refs.video.pause()
      },
      playVideo() {
        this.pause = false
        this.$refs.video.play()
      },
      changeCurrentTime($event) {
        console.log($event)
      },
      setProgress(e){
        console.log(e.clientX/window.outerWidth*100,)
        this.progress = e.clientX / window.outerWidth * 100
        this.$refs.video.currentTime = e.clientX / window.outerWidth *this.$refs.video.duration
      }
    },
    filters: {
      date(time) {
        let date = new Date(time)
        let template = 'yyyy-MM-dd'
        template = template.replace(/y+/g, date.getFullYear())
        let obj = {
          '(M+)': date.getMonth() + 1,
          '(d+)': date.getDate() + ''
        }
        for (let key in obj) {
          let reg = new RegExp(key)
          if (reg.test(template)) {
            let str = RegExp.$1.length === 1 ? doubleDuration(obj[key]) : obj[key]
            template = template.replace(reg, str)
          }
        }
        return template
      },
      duration(duration) {
        return filterDuration(duration)
      },
      currentTime(time) {
        return filterDuration(time * 1000)
      },
      count(count) {
        return formateCount(count)
      }
    },
    components: {
      Comment,
      Loading
    }
  }
</script>
<style lang="scss" scoped>
  .video {
    .video-wrapper {
      position: relative;
      width: 100vw;
      height: 31.78vh;
      .down-enter,
      .down-leave-to {
        transform: translateY(-100%);
      }
      .down-enter-active,
      .down-leave-active {
        transition: all .5s linear;
      }
      .down-enter-to,
      .down-leave {
        transform: translateY(0%);
      }
      .up-enter,
      .up-leave-to {
        transform: translateY(100%);
      }
      .up-enter-active,
      .up-leave-active {
        transition: all .5s linear;
      }
      .up-enter,
      .up-leave-to {
        transform: translateY(0%);
      }
      .video {
        width: 100vw;
        height: 31.78vh;
      }
      .header {
        position: absolute;
<<<<<<< HEAD
        z-index: 10;
=======
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
        left: 0;
        top: 3.3vh;
        width: 100vw;
        height: 4.5vh;
        color: #fff;

        .icon {
          display: inline-block;
          vertical-align: middle;
          width: 12.6vw;
          height: 4.5vh;
          line-height: 4.5vh;
          font-size: 20px;
          text-align: center;

        }
        .title {
          display: inline-block;
          width: 62.13vw;
          height: 4.5vh;
          line-height: 4.5vh;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          vertical-align: middle;
        }
        .share {
          display: inline-block;
          padding: 0 3vw;
          height: 4.5vh;
          line-height: 4.5vh;
          font-size: 20px;
          text-align: center;
          vertical-align: middle;
        }
        .more {
          display: inline-block;
          height: 4.5vh;
          line-height: 4.5vh;
          padding: 0 2vw;
          margin-right: 2vw;
          font-size: 20px;
          text-align: center;
          vertical-align: middle;
        }
      }
      .mode {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 13.33vw;
      }
      .footer {
        position: absolute;
        left: 0;
        bottom: 2vh;
        width: 100vw;
        height: 3.60vh;
        .current-time {
          display: inline-block;
          height: 3.60vh;
          line-height: 5vh;
          margin-left: 2.66vw;
          color: #fff;
        }
        .duration {
          display: inline-block;
          height: 3.60vh;
          line-height: 5vh;
          color: #9d9ca5;
        }
        .full-screen {
          float: right;
          margin-right: 4.26vw;
          color: #fff;
          font-size: 24px;
        }
      }
      .progress {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 0.45vh;
      }
      .curr-progress {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0.45vh;
        background-color: $color-theme;
      }
    }
    .content {
      position: relative;
      z-index: 1;
      .header {
        padding: 2.40vh 3.2vw 0 3.2vw;
        .title {
          display: inline-block;
          width: 85vw;
          line-height: 4vh;
          font-size: 20px;
          font-weight: 700;
        }
        .icon {
          display: inline-block;
          font-size: 24px;
          vertical-align: top;
          margin-left: 1vw;
        }
      }
      .info {
        padding: 0 3.2vw;
        margin-top: 1.5vh;
        color: #9c9c9c;
        .publish {
          display: inline-block;
        }
        .split,
        .play-count {
          display: inline-block;
        }
        .split {
          margin: 0 5.86vw;
          font-size: 18px;

        }

      }
      .desc {
        width: 85vw;
        height: 5.40vh;
        padding: 0 3.2vw;
        line-height: 5.40vh;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #8d8d8d;
      }
      .tags {
        padding: 0 3.2vw;
        .tag {
          display: inline-block;
          padding: 0 2vw;
          margin: 1.8vh 3.2vw 0 0;
          line-height: 4vh;
          font-size: 12px;
          border: 1px solid #cdcdcd;
          border-radius: 2vh;
          color: #8b8b8b;
        }

      }
      .choices {
        display: flex;
        height: 10.19vh;
        margin-top: 1.8vh;
        @include border-b-1px(#f3f3f3);
        .choice {
          flex: 1;
          text-align: center;
          span {
            display: inline-block;
            width: 100%;

          }
          .icon {
            margin-top: 2vh;
            font-size: 24px;
            color: #4d4d4d;
          }
          .count {
            font-size: 12px;
            color: #888;
          }
        }
      }
      .creator {
        width: 100vw;
        height: 7.80vh;
        padding: 0 3.2vw;
        background-color: #fff;
        .avatar {
          width: 8.53vw;
          border-radius: 50%;
          vertical-align: middle;
        }
        .name {
          margin-left: 3.2vw;
          line-height: 7.80vh;
          vertical-align: middle;
        }
        .follow {
          float: right;
          display: inline-block;
          height: 3.60vh;
          line-height: 3.6vh;
          margin-top: 2.25vh;
          padding: 0 3.2vw;
          border-radius: 1.8vh;
          color: #fff;
          background: linear-gradient(to right, #ff594a, #d83e34);
        }
      }
      .related {
        header {
          height: 4.05vh;
          line-height: 4.05vh;
          padding-left: 2.93vw;
          background-color: #f3f3f3;
          color: #808080;
        }
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
            width: 60.26vw;
            height: 11.9vh;
            padding: 0;
            padding-bottom: 1vh;
            margin-left: 2vw;
            vertical-align: middle;
            @include border-b-1px(#f3f3f3);
            .title {
              margin-top: 2vh;
              line-height: 3vh;
              font-size: 16px;
              color: black;
              white-space: normal;
            }
            .info {
              margin-top: 0.5vh;
              padding: 0;
              line-height: 2.5vh;
              font-size: 12px;
              color: #a1a1a1;
            }
          }
        }
      }
      .hot-comments {
        header {
          height: 4.05vh;
          line-height: 4.05vh;
          padding-left: 2.93vw;
          background-color: #f3f3f3;
          color: #808080;
        }
      }
      .latest-comments {
        header {
          height: 4.05vh;
          line-height: 4.05vh;
          padding-left: 2.93vw;
          background-color: #f3f3f3;
          color: #808080;
        }
      }
    }
  }
</style>
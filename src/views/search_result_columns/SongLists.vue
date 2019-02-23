<template>
  <div class="song-lists" ref="lists">
    <ul>
      <li class="list" v-for="(item,index) in songLists" :key="index" @click="goListDetail(item)">
        <img :src="item.coverImgUrl" alt="" class="cover" >
        <div class="desc">
          <div class="name">{{item.name}}</div>
          <div class="info">
            <span class="count">{{item.trackCount}}首&nbsp;</span>
            <span class="creator">&nbsp;by{{item.creator.nickname}},&nbsp;</span>
            <span class="playCount">播放{{item.playCount|count}}次</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {search} from "../../../public/api/search";
  import {formateCount} from "../../../public/js/tools";
  import BScroll from 'better-scroll'
  export default {
    name: 'SongLists',
    props: {
      keyWords: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        songLists: [],
        currentPage: 0
      }
    },
    created() {
      this.getSearchLists(this.keyWords, 1000, 100)
    },
    mounted() {
      this._initScroll()
    },
    methods: {
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      getSearchLists(keywords, type=1, limit=30,offset=0, pullUp=false) {
        if(pullUp) {
          search(keywords, type, limit,offset).then( res => {
            if(res.data.code === 200) {
              console.log(res.data.result)
              this.songLists = res.data.result.playlists.splice(0, (this.currentPage + 1) * 20)
            }
          })
        }
        search(keywords, type, limit,offset).then(res => {
          if(res.data.code === 200) {
            console.log(res.data.result)
            this.songLists = res.data.result.playlists.splice(0,20)
          }
        })
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.listScroll) {
            this.listScroll = new BScroll(this.$refs.lists, {
              click: true,
              // probeType: 2,
              pullUpLoad: {
                threshold: 50
              },
              pullDownRefresh: {
                threshold: 50,
                stop: 20
              }
            })
            console.log(this.listScroll)
            this._pullUpLoad()
            this._pullDownRefresh()
          } else {
            this.listScroll.refresh()
          }
        })
      },
      _pullUpLoad() {
        this.listScroll.on('pullingUp',() => {
          this.currentPage++
          this.getSearchAlbums(this.keyWords, 100, 100, 0, true)
          this.listScroll.refresh()
          this.listScroll.finishPullUp()
        })
      },
      _pullDownRefresh() {
        this.listScroll.on('pullingDown', () => {
          this.getSearchAlbums(this.keyWords, 100, 100 )
          this.listScroll.refresh()
          this.listScroll.finishPullDown()
        })
      }
    },
    filters: {
      count(count) {
        return formateCount(count, 1)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .song-lists {
    height: 86.5vh;
    margin-top: 0.75vh;
    padding-left: 2.13vw;
    overflow: hidden;
    .list {
      display: flex;
      height:  14.93vw;
      padding-top: 1px;
      align-items: center;
      margin-bottom: 1vh;
      .cover {
        width: 14.93vw;
        height:  14.93vw;
        border-radius: 4%;
        vertical-align: middle;
      }
      .desc {
        flex: 1;
        width: 81.07vw;
        height:  14.93vw;
        margin: 0 0 0 2.67vw;
        padding-bottom: 1vh;
        box-sizing: content-box;
        vertical-align: middle;
        overflow: hidden;
        @include border-b-1px(#f3f3f3);
        .name {
          font-size: 16px;
          line-height: 5.24vh;
          margin-top: 1vh;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .info {
          font-size: 12px;
          width: 81.07vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #b1b1b1;
        }
      }
    }
  }
</style>

<template>
  <div class="albums" ref="albums">
    <ul>
      <li class="album" v-for="(item,index) in albums" :key="index">
        <div class="picture">
          <img :src="item.picUrl" alt="" class="cover">
          <img src="@/../public/images/album.png" alt="" class="disk">
        </div>
        <div class="desc">
          <div class="name">{{item.name}}</div>
          <div class="info">
            <span class="artist">{{item.artist.name}}&nbsp;</span>
            <span class="trans" v-if="item.artist.trans">({{item.artist.trans}})&nbsp;&nbsp;</span>
            <span class="time">{{item.publishTime|date}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {search} from "../../../public/api/search";
  import {filterDate} from "../../../public/js/tools";
  import BScroll from 'better-scroll'
  export default {
    name: 'Albums',
    props: {
      keyWords: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        albums: [],
        currentPage: 0
      }
    },
    created() {
      this.getSearchAlbums(this.keyWords, 10,100)
    },
    mounted() {
      this._initScroll()
    },
    watch: {
      keyWords(newValue, oldValue) {
        // this.getSearchArtists(newValue, 100)
      }
    },
    methods: {
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      getSearchAlbums(keywords, type=1, limit=30,offset=0,pullUp=false) {
        if (pullUp) {
          search(keywords, type, limit,offset).then(res => {
            if (res.data.code === 200) {
              this.albums = res.data.result.albums.splice(0, (this.currentPage + 1)* 20)
              console.log(this.albums)
            }
          })
          return
        }
        search(keywords, type, limit,offset).then(res => {
          if (res.data.code === 200) {
            this.albums = res.data.result.albums.splice(0, 20)
            console.log(this.albums)
          }
        })

      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.albumScroll) {
            this.albumScroll = new BScroll(this.$refs.albums, {
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
            this._pullUpLoad()
            this._pullDownRefresh()
          } else {
            this.albumScroll.refresh()
          }
        })
      },
      _pullUpLoad() {
        this.albumScroll.on('pullingUp',() => {
          this.currentPage++
          this.getSearchAlbums(this.keyWords, 100, 100, 0, true)
          this.albumScroll.refresh()
          this.albumScroll.finishPullUp()
        })
      },
      _pullDownRefresh() {
        this.albumScroll.on('pullingDown', () => {
          this.getSearchAlbums(this.keyWords, 100, 100 )
          this.albumScroll.refresh()
          this.albumScroll.finishPullDown()
        })
      }
    },
    filters: {
      date(time) {
        return filterDate(time)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .albums {
    height: 86.5vh;
    margin-top: 0.75vh;
    overflow: hidden;
    .album {
      margin-top: 0.75vh;
      margin-left: 2.13vw;
      .picture {
        display: inline-block;
        position: relative;
        width: 14.93vw;
        height: 14.93vw;
        vertical-align: middle;
        .cover {
          width: 14.93vw;
          height: 14.93vw;
          border-radius: 4%;
        }
        .disk {
          position: absolute;
          left: 0;
          top: 0;
          height: 14.93vw;
        }
      }
      .desc {
        width: 77vw;
        height: 14.93vw;
        display: inline-block;
        margin-left: 5.6vw;
        vertical-align: middle;
        @include border-b-1px(#f3f3f3);
        .name {
          font-size: 16px;
          line-height: 5.25vh;
          vertical-align: middle;
        }
        .info {
          font-size: 12px;
          color: #8d8d8d;
        }
      }
    }
  }
</style>
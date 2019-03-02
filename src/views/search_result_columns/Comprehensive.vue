<template>
  <div class="comprehensive">
    <div class="column-single ">
      <div class="title">单曲
        <div class="play-all" @click="playAll">
          <span class="icon icon-music_play"></span>
          <span class="text">播放全部</span>
        </div>
      </div>
      <Loading v-if="!singles"></Loading>
      <ul v-if="singles">
        <li class="single" v-for="(item,index) in singles" :key="index"  >
          <div class="desc">
            <div style="display: inline-block;width: 74.4vw;">
              <div class="single-title">
                <span class="name">{{item.name}}</span>
                <span class="alia">{{item.alias[0]}}</span>
              </div>
              <div class="album">
                <span class="singer" >{{item.artists|artist}} </span>
                <span>- </span>
                <span class="name">{{item.album.name}}</span>
              </div>
              <div class="alias" >{{item.alias[0]}}</div>
            </div>
            <div class="icons" >
              <span class="icon icon-video"></span>
              <span class="icon icon-more_vert"></span>
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="more">全部单曲结果 </div>
    <div class="column-list">
      <div class="title">
        歌单
      </div>
      <ul>
        <li class="list" v-for="(item,index) in lists" :key="index" @click="goListDetail(item)">
          <img v-lazy="item.coverImgUrl" alt="" class="cover" >
          <div class="desc">
            <div class="name">{{item.name}}</div>
            <div class="info">
              <span class="count">{{item.trackCount}}首&nbsp;</span>
              <span class="creator">by{{item.creator.nickname}},</span>
              <span class="playCount">播放{{item.playCount|count}}次</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="more">全部歌单结果 </div>
    <div class="column-video">
      <div class="title">视频</div>
      <ul>
        <li class="video" v-for="(item,index) in videos" :key="index" @click="goVideo(item)">
          <div class="pic-wrapper">
            <img v-lazy="item.coverUrl" alt="" class="pic">
            <div class="count">
              <span class="icon-play_count"></span>
              <span class="play-count" style="float: right">{{item.playTime|count}}</span>
            </div>
          </div>
          <div class="desc">
            <div class="title">{{item.title}}</div>
            <div class="detail">
              <span class="time">{{item.durationms|duration}}</span>
              <span> by </span>
              <span class="name">{{item.creator[0].userName}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="more">全部视频结果 </div>
    <div class="column-artist">
      <div class="title">歌手</div>
      <ul>
        <li class="artist" v-for="(item,index) in artists" :key="index">
          <img v-lazy="item.img1v1Url" alt="" class="cover">
          <div class="desc">
            <div class="name">
              <span>{{item.name}}</span>
              <span v-if="item.trans" class="trans">&nbsp;({{item.trans}})</span> </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="column-album">
      <div class="title">专辑</div>
      <ul>
        <li class="album" v-for="(item,index) in albums" :key="index">
          <div class="picture">
            <img v-lazy="item.picUrl" alt="" class="cover">
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
    <div class="more">全部专辑结果</div>
    <div class="column-radio">
      <div class="title">电台</div>
      <ul>
        <li class="radio" v-for="(item,index) in radios" :key="index">
          <img v-lazy="item.picUrl" alt="" class="cover">
          <div class="desc">
            <div class="name">{{item.name}}</div>
            <div class="creator">{{item.dj.nickname}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="column-user">
      <div class="title">用户</div>
      <ul>
        <li v-for="(item,index) in users" :key="index" class="user">
          <img v-lazy="item.avatarUrl" alt="" class="cover">
          <div class="info">
            <div class="name">{{item.nickname}}</div>
            <div class="signature">{{item.signature}}</div>
          </div>
          <div class="follow"></div>
        </li>
      </ul>
    </div>
    <div class="more" style="padding-bottom: 3.90vh;box-sizing: content-box">全部用户结果</div>
  </div>

</template>
<script>
  import {search} from "../../../public/api/search";
  import {filterDuration,filterDate,formateCount} from "../../../public/js/tools";
  import {mapActions} from 'vuex'
  import Loading from '../../components/loading/Loading'
  export default {
    name: 'Comprehensive',
    props: {
      keyWords: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        singles: [],
        lists: [],
        videos: [],
        artists: [],
        albums: [],
        radios: [],
        users: [],
        isAdd: false,
      }
    },
    created() {
      this.getSearchSingle(this.keyWords,1)
      this.getSearchList(this.keyWords,1000)
      this.getSearchVideo(this.keyWords, 1014)
      this.getSearchArtist(this.keyWords, 100)
      this.getSearchAlbum(this.keyWords, 10)
      this.getSearchRadio(this.keyWords, 1009 )
      this.getSearchUser(this.keyWords, 1002 )
    },
    methods: {
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      getSearchSingle(keywords, type=1, limit=30,offset=0) {
        search(keywords, type, limit, offset).then(res => {
          if (res.data.code === 200) {
            this.singles = res.data.result.songs.splice(0, 5)
          }
        })
      },
      getSearchList(keywords, type=1, limit=30,offset=0) {
          search(keywords, type, limit, offset).then(res => {
            if (res.data.code === 200) {
              this.lists = res.data.result.playlists
              this.sortByCount(this.lists, 'bookCount')
              this.lists = this.lists.splice(2, 5).reverse()
            }
          })
      },
      getSearchVideo(keywords, type=1, limit=30,offset=0) {
        search(keywords, type, limit, offset).then( res => {
          if (res.data.code === 200) {
            console.log(res)
            this.videos = res.data.result.videos.splice(0,5)
            console.log(this.videos)
            this.videos = this.sortByTypes(this.videos, 'markTypes', 0)
            console.log(this.videos)
          }
        })
      },
      getSearchArtist(keywords, type=1, limit=30,offset=0) {
        search(keywords, type, limit,offset).then(res => {
          if (res.data.code === 200) {
            this.artists = res.data.result.artists
          }
        })
      },
      getSearchAlbum(keywords, type=1, limit=30,offset=0) {
          search(keywords, type, limit,offset).then(res => {
            if (res.data.code === 200) {
              this.albums = res.data.result.albums.splice(0, 3)
              console.log(this.albums)
            }
          })

      },
      getSearchRadio(keywords, type=1, limit=30,offset=0) {
        search(keywords, type, limit,offset).then(res => {
          if (res.data.code === 200) {
            this.radios = res.data.result.djRadios
          }
        })
      },
      getSearchUser(keywords, type=1, limit=30,offset=0) {
        search(keywords, type, limit,offset).then(res => {
          if (res.data.code === 200) {
            this.users = res.data.result.userprofiles.splice(0, 1)
            console.log(this.users)
          }

        })
      },
      // 按照播放数排序
      sortByCount(arr, key) {
         return arr.sort((a, b) => {
          let x = a[key]
          let y = b[key]
          return ((x > y) ? -1 : (x < y) ? 1 : 0)
        })
      },
      // 按照markTypes排序视频
      sortByTypes(arr, key, key2) {
          return arr.sort((a,b) => {
          let x = a[key][key2]
          let y = b[key][key2]
          return ((x > y) ? 1 : (x < y) ? -1 : 0)
        })
      },
      ...mapActions(['addList']),
      playAll() {
        this.addList(this.singles, this.isAdd)
      },
      goListDetail(item) {
        this.$router.push({name:'songListDetail', params:{id: item.id}})
      },
      goVideo(item){
        this.$router.push({path:'/video', query:{id: item.vid}})
      }
    },
    filters: {
      // 格式化歌手名
      artist(arr) {
        let result = ''
        for(let i in arr) {
          result += arr[i].name
          if (parseInt(i) === arr.length -1) {
            return result
          } else {
            result += '/'
          }
        }
        return result
      },
      // 格式化数量
      count(count) {
       return formateCount(count)
      },
      // 格式化视频时长
      duration(time) {
       return filterDuration(time)
      },
      // 格式化发售日期
      date(date) {
        return filterDate(date)
      }
    },
    components: {
      Loading
    }
  }
</script>
<style lang="scss" scoped>
  .comprehensive {
    .column-single {
      position: relative;
      margin-left: 1.6vw;
      .title {
        height: 8.25vh;
        line-height: 9vh;
        font-size: 18px;
        font-weight: 700;

        @include border-b-1px(#f3f3f3);
        .play-all {
          float: right;
          height: 8.25vh;
          margin-right: 2.67vw;
          .icon {
            vertical-align: text-bottom;
          }
          .text {
            margin-left: 1vw;
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
      .single {
        display: flex;
        width: 100%;
        height: auto;

        box-sizing: border-box;
        @include border-b-1px(#f6f6f6);
        .desc {
          display: inline-block;
          float: left;
          width: 100%;
          .single-title {
            display: inline-block;
            width: 74.4vw;
            margin-top: 1.5vh;
            font-size: 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .name {
              margin-right: 1.6vw;
              line-height: 2vh;
              color: #507daf;
            }
            .alia {
              color: #939393;
            }
          }
          .album {
            display: inline-block;
            .singer {
              width: 74.4vw;
              font-size: 12px;
              line-height: 3vh;
              color: #939393;
            }
            .name {
              font-size: 12px;
              color: #507daf;
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
          display: flex;
          float: right;
          width: 22.67vw;
          height: 100%;
          align-items: center;
          .icon {
            font-size: 24px;
            color: #b3b3b3;
            &:first-child {
              margin-left: 4.27vw;
            }
            &:nth-child(2) {
              display: inline-block;
              width: 12.8vw;
              text-align: center;
            }
          }
        }
      }
    }
    .more {
      height: 8.55vh;
      text-align: center;
      line-height: 8.55vh;
      font-size: 12px;
      color: #a6a6a6;
    }
    .column-list {
      margin-left: 1.6vw;
      .title {
        height: 8.25vh;
        line-height: 9vh;
        font-size: 18px;
        font-weight: 700;
        @include border-b-1px(#f3f3f3);
      }
      .list {
        display: flex;
        height: 22.13vw;
        padding-top: 1px;
        align-items: center;
        margin-bottom: 1vh;
        .cover {
          width: 22.13vw;
          height: 22.13vw;
          border-radius: 4%;
        }
<<<<<<< HEAD

      }
      .desc {
        flex: 1;
        height: 22.13vw;
        margin: 0 3.47vw 0 2.67vw;
        padding-bottom: 1vh;
        box-sizing: content-box;
        @include border-b-1px(#f3f3f3);

      }
      .name {
        margin-top: 3vh;
        font-size: 18px;
        line-height: 3vh;
      }
      .info {
        margin-top: 1.5vh;
        font-size: 12px;
        width: 70.13vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #b1b1b1;
=======
        .desc {
          flex: 1;
          height: 22.13vw;
          margin: 0 3.47vw 0 2.67vw;
          padding-bottom: 1vh;
          box-sizing: content-box;
          @include border-b-1px(#f3f3f3);
          .name {
            margin-top: 3vh;
            font-size: 18px;
            line-height: 3vh;
          }
          .info {
            margin-top: 1.5vh;
            font-size: 12px;
            width: 70.13vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #b1b1b1;
          }
        }
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
      }
    }
    .column-video {
      margin-left: 1.6vw;
      .title {
        height: 8.25vh;
        line-height: 9vh;
        font-size: 18px;
        font-weight: 700;
        @include border-b-1px(#f3f3f3);
      }
      .video {
        display: flex;
        margin-top: 0.75vh;
        padding-bottom: 0.45vh;
        box-sizing: content-box;
        .pic-wrapper {
          position: relative;
          width: 35.47vw;
          .pic {
            width: 35.47vw;
          }
          .count {
            position: absolute;
            right: 1vw;
            top: 0.75vh;
            font-size: 12px;
            color: #fff;
          }
        }
        .desc {
          flex: 1;
          margin: 2.40vh 0 -0.45vh 2.67vw;
          @include border-b-1px(#f3f3f3);
          .title {
            height: auto;
            line-height: 3vh;
            font-weight: 500;
            font-size: 14px;
            border: none;
          }
          .detail {
            font-size: 12px;
            color: #909090;
          }
        }
      }
    }
    .column-artist {
      margin-left: 1.6vw;
      .title {
        height: 8.25vh;
        line-height: 9vh;
        font-size: 18px;
        font-weight: 700;
        @include border-b-1px(#f3f3f3);
      }
      .artist {
        margin-top: 0.75vh;
        .cover {
          width: 21.87vw;
          height: 21.87vw;
          border-radius: 50%;
          vertical-align: center;
        }
        .desc {
          display: inline-block;
          box-sizing: content-box;
          width: 73.6vw;
          height: 21.87vw;
          line-height: 21.87vw;
          margin-left: 2.67vw;
          padding-bottom: 0.45vh;
          @include border-b-1px(#f3f3f3);
          .name {

          }
          .trans {
            color: #a2a2a2;
          }
        }
      }
    }
    .column-album {
      margin-left: 1.6vw;
      .title {
        height: 8.25vh;
        line-height: 9vh;
        font-size: 18px;
        font-weight: 700;
        @include border-b-1px(#f3f3f3);
      }
      .album {
        margin-top: 0.75vh;
        .picture {
          display: inline-block;
          position: relative;
          height: 12.44vh;
          vertical-align: top;
          .cover {
            height: 12.44vh;
            border-radius: 4%;
          }
          .disk {
            position: absolute;
            left: 0;
            top: 0;
            height: 12.44vh;
          }
        }
        .desc {
          width: 67.75vw;
          height: 12.44vh;
          display: inline-block;
          margin-left: 8.53vw;
          @include border-b-1px(#f3f3f3);
          .name {
            margin-top: 4.35vh;
            font-size: 16px;
          }
          .info {
            font-size: 12px;
            color: #8d8d8d;
          }
        }
      }
    }
    .column-radio {
      margin-left: 1.6vw;
      .title {
        height: 8.25vh;
        line-height: 9vh;
        font-size: 18px;
        font-weight: 700;
        @include border-b-1px(#f3f3f3);
      }
      .radio {
        padding-top: 0.75vh;
        .cover {
          width: 21.87vw;
          height: 21.87vw;
          border-radius: 4%;
          vertical-align: top;
        }
        .desc {
          display: inline-block;
          margin-left: 2.66vw;
          width: 73.6vw;
          height: 21.87vw;
          margin-bottom: 1.45vh;
          @include border-b-1px(#f3f3f3);
          .name {

            height: 3vh;
            line-height: 21.87vw;

          }
          .creator {
            height: 2vh;
            line-height: 21.87vw;
            font-size: 12px;
            color: #acacac;
          }
        }
      }
    }
    .column-user {
      margin-left: 1.6vw;
      .title {
        height: 8.25vh;
        line-height: 9vh;
        font-size: 18px;
        font-weight: 700;
        @include border-b-1px(#f3f3f3);
      }
      .user {
        margin-top: 0.75vh;
        .cover {
          width: 21.87vw;
          height: 21.87vw;
          border-radius: 50%;
          vertical-align: top;
        }
        .info {
          display: inline-block;
          width: 50.4vw;
          height: 21.87vw;
          margin-left: 2.66vw;
          .name {
            height: 3vh;
            margin-top: 3.89vh;
          }
          .signature {
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #909090;

          }
        }
      }
    }
  }
</style>
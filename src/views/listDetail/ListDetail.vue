<template>
  <div class="detail">
    <div class="desc" v-if="listInfo!=={}" :style="{backgroundImage:'url('+listInfo.coverImgUrl+')'}">
      <mu-appbar class="head">
        <mu-button icon slot="left" @click="$router.go(-1)">
          <span class="head-icon icon-arrow_back"></span>
        </mu-button>
        <div>歌单详情</div>
        <mu-button icon slot="right">
          <span class="head-icon icon-search"></span>
        </mu-button>
        <mu-button icon slot="right">
          <span class="head-icon icon-more_vert"></span>
        </mu-button>
      </mu-appbar>
      <!--<header >-->
      <!--<span class="back icon-arrow_back"></span>-->
      <!--<span class="title">歌单详情</span>-->
      <!--<span class="search icon-search"></span>-->
      <!--<span class="more icon-more_vert" ></span>-->
      <!--</header>-->
      <div class="big-wrapper">
        <div class="cover">
          <img :src="listInfo.coverImgUrl" alt="">
          <div class="hearer">
            <span class="icon icon-headphones"></span>
            <span class="count" v-show="listInfo.playCount">
            {{listInfo.playCount|count}}
          </span>
          </div>
        </div>
        <div class="about">
          <div class="name">{{listInfo.name}}</div>
          <div class="creator-info">
            <img :src="creator.avatarUrl" alt="" class="avatar">
            <span class="creator">{{creator.nickname}}</span>
            <span class="icon icon-navigate_next"></span>
          </div>
        </div>
      </div>
      <div class="choices">
        <div class="choice">
          <div class="icon icon-comments"></div>
          <div class="count">{{listInfo.commentCount}}</div>
        </div>
        <div class="choice">
          <div class="icon icon-share"></div>
          <div class="count">{{listInfo.shareCount}}</div>
        </div>
        <div class="choice">
          <div class="icon icon-download"></div>
          <div class="text">下载</div>
        </div>
        <div class="choice">
          <div class="icon icon-select"></div>
          <div class="text">多选</div>
        </div>
      </div>
    </div>
    <div class="song-list">
      <div class="header">
        <div class="header-left" @click="playAll">
          <span class="icon icon-music_play"></span>
          <span class="title">播放全部</span>
          <span class="count">(共{{listInfo.trackCount}}首)</span>
        </div>
        <div class="collect">
          <span class="icon icon-add"></span>
          <span>收藏&nbsp;({{listInfo.subscribedCount|count}})</span>
        </div>
      </div>
      <ul>
        <li v-for="(item,index) in songs" :key="index" class="song" @click="playSong(item.id)">
          <span class="sequence">{{index}}</span>
          <div class="song-info">
            <div class="name">{{item.name}} <span class="alia" v-if="item.alia[0]">({{item.alia[0]}})</span></div>
            <div class="singer">{{item.ar[0].name}}-{{item.al.name}}</div>
          </div>
          <div class="icons">
            <span class="icon icon-video" v-if="item.mv"></span>
            <span class="icon icon-more_vert" style="float: right"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {listDetail} from "../../../public/api/songList";
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {formateCount} from "../../../public/js/tools";

  export default {
    name: 'ListDetail',
    data() {
      return {
        listInfo: {},
        creator: {},
        songs: [],
        isAdd: false
      }
    },
    created() {
      listDetail(this.$route.params.id).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
          this.listInfo = res.data.playlist
          this.creator = this.listInfo.creator
          this.songs = this.listInfo.tracks
        }
      })
    },
    computed: {
      ...mapGetters({playList: 'getPlayList',currentSong:'getCurrentSong'})
    },
    filters: {
      count(count) {
        return formateCount(count)
      }
    },
    methods: {
      ...mapMutations(['SET_CURRENT_SONG', 'ADD_LIST','SET_CURRENT_INDEX', 'SET_PAUSE', 'SET_SHOW_PLAYER']),
      ...mapActions(['addList', 'addSong', 'setList']),
      playAll() {
        this.ADD_LIST(this.initializeSongs(this.songs))
        this.SET_CURRENT_SONG(0)
        this.SET_CURRENT_INDEX(0)
        this.SET_SHOW_PLAYER(true)
        console.log(this.currentSong)
        this.isAdd = true

      },
      async playSong(id) {
        var index = this.playList.length
        for (let i in this.playList) {
          if (this.playList[i].id === id) {
            this.SET_CURRENT_SONG(i)
            this.SET_CURRENT_INDEX(parseInt(i))
            return
          }
        }
        await this.addSong(id)
        this.SET_CURRENT_SONG(index)
        this.SET_CURRENT_INDEX(parseInt(index))

      }
    }
  }
</script>
<style lang="scss">
  .detail {
    position: relative;
    z-index: 3;
    .desc {
      position: relative;
      /*display: flex;*/
      padding: 0;
      height: 39.26vh;
      background-position: center center;
      .big-wrapper {
        display: flex;
      }
      .cover {
        position: relative;
        width: 34.13vw;
        height: 34.13vw;
        z-index: 4;
        margin: 5.1vw 0 0 5.1vw;
      }
      img {
        width: 34.13vw;
        height: 34.13vw;
        border-radius: 4%;
      }
      .hearer {
        position: absolute;
        top: 0.5vh;
        right: 0.5vw;
        .count {
          font-size: 12px;
          color: rgba(234, 234, 234, 0.72);
        }
      }
      .icon {
        font-size: 12px;
        color: rgba(234, 234, 234, 0.72);
      }
      .about {
        flex: 1;
        margin-left: 4.8vw;
        margin-top: 4vh;
        color: #fff;
        .name {
          line-height: 3.5vh;
          font-size: 16px;
          font-weight: 700;
          font-family: "Microsoft YaHei";
        }
        .creator-info {
          margin-top: 4.08vh;

        }
        .avatar {
          width: 6.52vw;
          height: 6.52vw;
          border-radius: 50%;
          margin-right: 2vw;
        }
        .icon {

        }
      }

    }
    .choices {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      width: 100%;
      height: 9.0vh;
      text-align: center;
      .choice {
        flex: 1;
        font-size: 20px;
        color: #98a2be;
        .icon {
          margin-top: 1vh;
          font-size: 20px;
          line-height: 4.5vh;
          color: #98a2be;
        }
        .count,
        .text {
          font-size: 12px;
          overflow: hidden;
        }
      }
    }
  }

  .head {
    width: 100vw !important;
    /*height: 7.2vh;*/
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
    .head-icon {
      color: #d2d2d2;
      font-size: 24px;
    }
  }

  .song-list {
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #fff;
    .header {
      background-color: #fff;
      border-radius: 2%;
      @include border-b-1px(#f9f9f9);
      .header-left {
        display: inline-block;
        width: 68vw;

      }
      .icon,
      .title,
      .count {
        display: inline-block;
        height: 5.98vh;
        line-height: 5.98vh;
        text-align: center;
        vertical-align: top;
      }
      .icon {
        width: 13.33vw;
        font-size: 20px;
      }
      .count {
        margin-left: 1vw;
        color: #999;
      }

      .collect {
        display: inline-block;
        float: right;
        width: 32vw;
        height: 5.98vh;
        line-height: 5.98vh;
        background: linear-gradient(to right, #ff5a4b 0% #d53b32 100%);
        color: #fff;
        .icon {
          width: 8.69vw;
          font-size: 12px;
          padding: 0 2.13vw 0 1.45vw;
          color: #fff;
        }
      }
    }
    .song {
      display: flex;
      .sequence {
        display: inline-block;
        width: 13.33vw;
        height: 8.25vh;
        line-height: 8.25vh;
        text-align: center;
        font-size: 16px;
        color: #999;
      }
      .song-info {
        position: relative;
        flex: 1;
        @include border-b-1px(#f4f4f4);
        .name {
          width: 63.2vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 4.80vh;
          font-size: 16px;
          .alia {
            color: #9b9b9b;
          }
        }
        .singer {
          display: inline-block;
          width: 61.87vw;
          font-size: 10px;
          color: #999;
          overflow: hidden;
          white-space: nowrap
        }

      }
      .icons {
        width: 23.47vw;
        @include border-b-1px(#f9f9f9);
        .icon {
          display: inline-block;
          width: 11.73vw;
          height: 8.25vh;
          line-height: 8.25vh;
          text-align: center;
          font-size: 18px;
          font-weight: 500;
          color: rgba(182, 182, 182, 0.8);
        }
        & > .icon {
          font-size: 24px;
        }
      }
    }
  }
</style>
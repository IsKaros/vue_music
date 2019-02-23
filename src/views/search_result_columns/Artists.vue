<template>
  <div class="artists">
    <ul>
      <li class="artist" v-for="(item,index) in artists" :key="index">
        <img :src="item.img1v1Url" alt="" class="cover">
        <div class="desc">
          <div class="name">
            <span>{{item.name}}</span>
            <span v-if="item.trans" class="trans">&nbsp;({{item.trans}})</span> </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {search} from "../../../public/api/search";

  export default {
    name: 'Artists',
    props: {
      keyWords: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        artists: []
      }
    },
    created() {
      this.getSearchArtists(this.keyWords, 100)
    },
    watch: {
      keyWords(newValue, oldValue) {
        this.getSearchArtists(newValue, 100)
      }
    },
    methods: {
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      getSearchArtists(keywords, type=1, limit=30,offset=0) {
        search(keywords, type, limit,offset).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            this.artists =  res.data.result.artists
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .artists {
    .artist {
      margin-top: 0.75vh;
      margin-left: 2.13vw;
      .cover {
        width: 14.93vw;
        height: 14.93vw;
        border-radius: 4%;
        vertical-align: middle;
      }
      .desc {
        display: inline-block;
        box-sizing: content-box;
        width: 80.2vw;
        height: 14.93vw;
        line-height: 14.93vw;
        margin-left: 2.67vw;
        padding-bottom: 0.45vh;
        vertical-align: middle;
        @include border-b-1px(#f3f3f3);
        .name {

        }
        .trans {
          color: #a2a2a2;
        }
      }
    }
  }
</style>
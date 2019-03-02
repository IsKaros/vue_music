<template>
  <div class="anchor-stations">
    <div class="title">电台</div>
    <ul>
      <li class="radio" v-for="(item,index) in radios" :key="index" >
        <img :src="item.picUrl" alt="" class="cover">
        <div class="desc">
          <div class="name">{{item.name}}</div>
          <div class="creator">{{item.dj.nickname}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {search} from "../../../public/api/search";

  export default {
    name: 'AnchorStation',
    props: {
      keyWords: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        radios: [],
        currentPage: 0
      }
    },
    created() {
      this.getSearchRadios(this.keyWords, 1009)
    },
    methods: {
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      getSearchRadios(keywords, type=1, limit=30,offset=0) {
        search(keywords, type, limit,offset).then(res => {
          if(res.data.code === 200) {
            this.radios = res.data.result.djRadios
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .anchor-stations {
    .title {
      height: 3.89vh;
      line-height: 3.89vh;
      padding-left: 3.2vw;
      background-color: #f3f3f3;
      color: #777;
    }
    .radio {
      padding-top: 0.75vh;
      margin-left: 1.87vw;
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
</style>
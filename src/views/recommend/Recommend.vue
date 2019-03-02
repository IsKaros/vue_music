<template>
  <div class="recommend">
    <div class="cover"></div>
    <Banner></Banner>
    <div class="options">
      <div class="option" v-for="(item,i) in options" :key="i" @click="$router.push(item.route)">
        <img :src="item.url" alt="" class="pics">
        <p class="title">{{item.title}}</p>
      </div>
    </div>
    <SongLists></SongLists>
<<<<<<< HEAD
    <!--<LatestMusic></LatestMusic>-->
=======
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
  </div>
</template>
<script>
  import Banner from '../../components/banner/Banner'
  import SongLists from './SongList'
<<<<<<< HEAD
  import LatestMusic from './LatestMusic'
=======
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
  export default {
    name: 'Recommend',
    data() {
      return {
        options: [{url: require('../../../public/images/r1.jpg'), title: '私人FM', route:'/personalFM'},{url: require('../../../public/images/r2.jpg'), title: '每日推荐', route:'/recommend/dailyRecommend'},{url: require('../../../public/images/r3.jpg'), title: '歌单', route:'/recommend/songList'},{url: require('../../../public/images/r4.jpg'), title: '排行榜', route:'/rank'}]
      }
    },
    components: {
      Banner,
<<<<<<< HEAD
      SongLists,
      LatestMusic
=======
      SongLists
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../public/scss/mixin";
  .recommend {
    position: relative;
    background-color: #fff;
    overflow: hidden;
    .cover {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 18vh;
      background-color: $color-theme;
    }
    .options {

      width: 100vw;
      height: 13.59vh;
      margin: 0;
      padding: 0;
      overflow: hidden;
      @include border-b-1px(#f3f3f3);
      .option {
        display: inline-block;
        width: 25vw;
        .pics {
          width: 11.35vw;
          height: 11.35vw;
          margin: 2.72vh 7vw 1vh 7vw;
        }
        p {
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
</style>
<template>
  <div class="song-lists">
    <div class="title">推荐歌单</div>
    <ul class="lists">
      <li v-for="(item,index) in songLists1" :key="index" class="list" @click="goDetail(item.id)">
        <img :src="item.picUrl" alt="" class="picture">
        <div class="desc">{{item.name}}</div>
        <div class="hearer">
          <span class="icon icon-headphones"></span>
          <span class="count">{{item.playCount|filterCount}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {RecommendSongList, RecommendDailyList, RefreshLogin} from "../../../public/api/recommend";
  import {Status} from '../../../public/api/login'
  import {mapGetters, mapMutations} from 'vuex'
  import {formateCount} from "../../../public/js/tools";

  export default {
    name: 'SongList',
    data() {
      return {
        songLists1: [],
      }
    },
    created() {
      RecommendSongList().then(res => {
        if (res.data.code === 200) {
          let data = res.data
          this.songLists1 = data.result.slice(0, 6)
          console.log(data.result)
        }
        console.log(res.data)
      })
      // Status().then(res => {
      //   if (res.data.code === 200) {
      //     // RefreshLogin()
      //     RecommendDailyList().then(res => {
      //       console.log(res.data)
      //     }).catch(error => {
      //       console.log(error)
      //     })
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
      // //   .catch(error => {
      // //   console.log(error)
      // // })
      // console.log(this.user)

    },
    computed: {
      ...mapGetters({user: 'getUser'})
    },
    methods: {
      ...mapMutations(['SET_LIST_TITLE']),
      getSongLists() {
        if (this.user.profile !== {}) {
          RecommendSongList().then(res => {
            if (res.data.code === 200) {
              let data = res.data
              this.dailyLists = data.result.slice(3, 6)
              this.songLists1 = data.result.slice(0, 6)
              console.log(data.result)
            }
          })

        }
      },
      goDetail(id) {
        this.$router.push({name: 'songListDetail', params: {id: id}})
      }
    },
    filters: {
      filterCount(count) {
        return formateCount(count)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .song-lists {
    .title {
      padding: 2.85vh 1.20vw 1.90vh 1.20vw;
      font-size: 15px;
      font-weight: 900;
    }
    .lists {
      width: 100vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .list {
        display: inline-block;
        position: relative;
        margin: 0 0.5vw;
        flex: 1;
        vertical-align: top;
        &:nth-of-type(3n+2) {
          margin: 0 0.5vw;
        }
        .picture {
          width: 31.80vw;
          height: 17.66vh;
          border-radius: 2%;
        }
        .desc {
          width: 31.89vw;
          padding: 0 1vw;
          line-height: 28px;
        }
        .hearer {
          position: absolute;
          top: 0.5vh;
          right: 0.5vw;
          .icon {
            color: rgba(234, 234, 234, 0.72);
            margin-right: 1vw;
          }
          .count {
            color: rgba(234, 234, 234, 0.72);
          }
        }
      }
    }

  }
</style>
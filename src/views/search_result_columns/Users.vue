<template>
  <div class="users" ref="users">
    <ul>
      <li v-for="(item,index) in users" :key="index" class="user">
        <img :src="item.avatarUrl" alt="" class="cover">
        <div class="info">
          <div class="name">{{item.nickname}}</div>
          <div class="signature">{{item.signature}}</div>
        </div>
        <div class="follow"></div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {search} from "../../../public/api/search";
  import BScroll from 'better-scroll'
  export default {
    name: 'User',
    props: {
      keyWords: {
        type: String,
        required: true

      }
    },
    data() {
      return {
        users: [],
        currentPage: 0
      }
    },
    created() {
      this.getSearchUsers(this.keyWords, 1002, 100)
    },
    mounted() {
      this._initScroll()
    },
    methods: {
      // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      getSearchUsers(keywords, type=1, limit=30,offset=0,pullUp=false) {
        if(pullUp) {
          search(keywords, type, limit,offset).then(res => {
            if(res.data.code === 200) {
              console.log(res.data)
              this.users = res.data.result.userprofiles.splice(0, (this.currentPage + 1) * 20)
              console.log(this.users)
            }
          })
        }
        search(keywords, type, limit,offset).then(res => {
          if(res.data.code === 200) {
            console.log(res.data)
            this.users = res.data.result.userprofiles.splice(0, 20)
            console.log(this.users)
          }
        })
      },
      _initScroll() {
        this.$nextTick(() => {
          if(!this.userScroll) {
            this.userScroll = new BScroll(this.$refs.users, {
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
            this.userScroll.refresh()
          }
        })
      },
      _pullUpLoad() {
        this.userScroll.on('pullingUp',() => {
          this.currentPage++
          this.getSearchUsers(this.keyWords, 1002, 100, 0, true)
          this.userScroll.refresh()
          this.userScroll.finishPullUp()
        })
      },
      _pullDownRefresh() {
        this.userScroll.on('pullingDown', () => {
          this.getSearchUsers(this.keyWords, 1002, 100 )
          this.userScroll.refresh()
          this.userScroll.finishPullDown()
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .users {
    height: 86.5vh;
    overflow: hidden;
    margin-top: 1.20vh;
    .user {
      margin-top: 1.20vh;
      margin-left: 3.2vw;
      .cover {
        width: 12.27vw;
        height: 12.27vw;
        border-radius: 50%;
        vertical-align: top;
      }
      .info {
        display: inline-block;
        width: 81.6vw;
        height: 12.27vw;
        margin-left: 2.66vw;
        @include border-b-1px(#f3f3f3);
        .name {
          width: 59.73vw;
          height: 3vh;
          margin-top: 1vh;
        }
        .signature {
          width: 59.73vw;
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #909090;

        }
      }
    }
  }
</style>
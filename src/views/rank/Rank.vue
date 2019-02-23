<template>
  <div class="rank">
    <div class="header">
      <span class="icon icon-arrow_back" @click="$router.go(-1)"></span>
      <span class="title">排行榜</span>
    </div>
    <div ref="content" class="content">
      <div>
        <div class="rank-title">官方榜</div>
        <ul>
          <li v-for="(item,index) in officialRank" :key="index" class="official-rank" @click="goDetail(item)">
            <div class="pic-wrapper">
              <img :src="item.coverImgUrl" alt="" class="pic">
              <span class="update">{{item.updateFrequency}}</span>
            </div>
            <div class="songs">
              <div v-for="(item,index) in item.tracks" class="song">{{index + 1}}.{{item.first}}-{{item.second}}</div>
            </div>
          </li>
        </ul>
        <div class="rank-title">推荐榜</div>
        <ul class="recommend-ranks">
          <li v-for="(item,index) in recommendRanks" :key="index" class="rank">
            <div class="pic-wrapper">
              <img :src="item.coverImgUrl" alt="" class="pic">
              <span class="update">{{item.updateFrequency}}</span>
            </div>
            <div class="desc">{{item.name}}</div>
          </li>
        </ul>
        <div class="rank-title">全球榜</div>
        <ul class="global-ranks">
          <li v-for="(item,index) in globalRanks" :key="index" class="rank">
            <div class="pic-wrapper">
              <img :src="item.coverImgUrl" alt="" class="pic">
              <span class="update">{{item.updateFrequency}}</span>
            </div>
            <div class="desc">{{item.name}}</div>
          </li>
        </ul>
        <div class="rank-title">更多榜单</div>
        <ul class="more-ranks">
          <li v-for="(item,index) in moreRanks" :key="index" class="rank">
            <div class="pic-wrapper">
              <img :src="item.coverImgUrl||item.coverUrl" alt="" class="pic">
              <span class="update">{{item.updateFrequency}}</span>
            </div>
            <div class="desc">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  import {topListDetail, topList} from '../../../public/api/rank'
  import BScroll from 'better-scroll'
  export default {
    name: 'Rank',
    data() {
      return {
        liveRank: {},
        officialRank: [],
        recommendRanks: [],
        globalRanks: [],
        moreRanks: []
      }
    },
    created() {
      this.getListDetail()
    },
    mounted() {
      this._initScroll()
    },
    methods: {
      getListDetail() {
        topListDetail().then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            let list = res.data.list
            for (let i = 0; i < 6; i++) {
              this.recommendRanks.push(list[i + 4])
            }
            this.liveRank = list.slice(list.length - 1)
            this.globalRanks = list.slice(15, list.length - 2)
            this.globalRanks.splice(3, 2)
            this.globalRanks.splice(5, 2)
            this.globalRanks.splice(0, 1, ...this.globalRanks.splice(1, 1,this.globalRanks[0]))
            this.moreRanks = list.slice(10, 15)
            console.log(this.globalRanks)
            this.moreRanks.push(list[19], list[22], list[23], res.data.rewardToplist, res.data.artistToplist)
            this.officialRank.push(list[0], list[1], list[3], list[2])
            console.log(this.moreRanks, this.officialRank)
            for (let i in this.moreRanks) {
              if(this.moreRanks[i].name === '云音乐赞赏榜') {
                this.moreRanks[i].updateFrequency = '每周四更新'
                return
              }
            }
          }
        })
      },
      _initScroll() {
        this.$nextTick(() => {
          if(!this.rankScroll) {
            this.rankScroll = new BScroll(this.$refs.content, {
              click: true
            })
            console.log(this.rankScroll)
          } else {
            this.rankScroll.refresh()
          }
        })
      },
      goDetail(item) {
        this.$router.push({path: '/rank/rankDetail', parmas:{id: item.id,name:item.name}})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .rank {
    .header {
      height: 11.84vh;
      padding-top: 3.6vh;
      line-height: 8.24vh;
      color: #fff;
      background-color: $color-theme;
      .icon {
        display: inline-block;
        width: 15.47vw;
        text-align: center;
        font-size: 30px;
        vertical-align: middle;
      }
      .title {
        font-size: 20px;
        vertical-align: middle;
      }
    }
    .content {
      height: 88.16vh;
      overflow: hidden;
    }
    .rank-title {
      height: 7.65vh;
      line-height: 7.65vh;
      padding-left: 2.13vw;
      font-size: 18px;
      font-weight: 700;
    }
    .official-rank {
      display: flex;
      &:last-child {
        margin-bottom: 3.15vh;
      }
      .pic-wrapper {
        position: relative;
        width: 32.53vw;
        margin-left: 2.13vw;
        .pic {
          width: 32.53vw;
          border-radius: 4%;
        }
        .update {
          position: absolute;
          left: 1vw;
          bottom: 2vh;
          font-size: 12px;
          color: #fff;
        }
      }
      .songs {
        flex: 1;
        margin-left: 2.93vw;
        padding-top: 3.45vh;
        color: #7f7f7f;
        @include border-b-1px(#f3f3f3);
        .song {
          margin-bottom: 3.2vh;
        }
      }
    }
    .recommend-ranks,
    .global-ranks,
    .more-ranks {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .rank {
        display: inline-block;
        &:nth-child(3n+1) {
          margin-left: 1.6vw;
        }
        &:nth-child(3n+3) {
          margin-right: 1.6vw;
        }
        .pic-wrapper {
          position: relative;
          width: 32vw;
        }
        .pic {
          width: 32vw;
          border-radius: 4%;
        }
        .update {
          position: absolute;
          left: 1vw;
          bottom: 1vh;
          font-size: 12px;
          color: #fff;
        }
        .desc {
          width: 32vw;
          height: 9.15vh;
          margin-top: 1vh;
          line-height: 3vh;
        }
      }
    }

  }

</style>
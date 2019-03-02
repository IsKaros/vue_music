<template>
  <div class="search-result">
    <div class="header">
      <mu-button icon @click="$router.go(-1)">
        <span class="icon icon-arrow_back" ></span>
      </mu-button>
      <mu-text-field  v-model="keyWord" color='#f3a19c' underline-color="white" placeholder="Bye Bye Bye - LoveStoned" @keydown.enter="goResult" type="search" @change="getSearchSuggest">
        <span class="remove icon-remove" v-show="keyWord" @click="value=''"></span>
      </mu-text-field>
    </div>
    <div class="tabs-wrapper" ref="tabs">
      <div class="tabs">
        <div class="tab" v-for="(item,index) in tabs"  :key="index"  @click.stop="goRoute(item, index,$event)" ref="tab" :class="{active:active===index}" style="transform: translateX(0)">{{item.name}}</div>
        <span class="highlight-link" ref="highlight" ></span>
      </div>
    </div>
    <transition name="slide">
      <router-view :keyWords="keyWord"></router-view>
    </transition>

  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {searchSuggest} from "../../../public/api/search";

  export default {
    name: 'SearchResult',
    data() {
      return {
        keyWord: '',
        active: 0,
        tabs: [{
          name: '综合',
          route: '/search/result/comprehensive'
        }, {
          name: '单曲',
          route: '/search/result/singles'
        }, {
          name: '视频',
          route: '/search/result/videos'
        }, {
          name: '歌手',
          route: '/search/result/artists'
        }, {
          name: '专辑',
          route: '/search/result/albums'
        }, {
          name: '歌单',
          route: '/search/result/songLists'
        }, {
          name: '主播电台',
          route: '/search/result/anchorStations'
        }, {
          name: '用户',
          route: '/search/result/users'
        }
        ],
        singles: []
      }
    },
    created() {
      this.keyWord = this.$route.query.keywords
    },
    mounted() {
      this._initScroll()
    },
    methods: {
      _initScroll() {
        this.$nextTick(() => {
          if(!this.tabScroll) {
            this.tabScroll = new BScroll(this.$refs.tabs, {
              click: true,
              scrollX: true,
            })
          } else {
            this.tabScroll.refresh()
          }
        })
      },
      goRoute(item, index, $event) {
        this.$refs.highlight.style.transform = `translateX(${$event.target.offsetLeft}px)`
        this.tabScroll.scrollToElement($event.target, 500, true, 0)
        this.active = index
        this.$router.push({path: item.route, query:{keywords:this.keyWord}})
      },
      goResult($event) {
        this.$router.push({name:'searchResult',query: {keywords:$event.target.value}})
      },
      getSearchSuggest(keyword){
        console.log(keyword)
        searchSuggest(keyword,'mobile').then(res => {
          console.log(res)
        })
      }
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`

      let tab = this.tabs.find(item => item.route === to.path)
      let index = null
      for (let i in this.tabs) {
        this.tabs[i] === tab ? index = i : ''
      }
      this.active = parseInt(index)
      this.$refs.highlight.style.transform = `translateX(${this.$refs.tab[index].offsetLeft}px)`
      next()
    },

  }
</script>
<style lang="scss" >
  .search-result {
    .header {
      width: 100vw;
      height: 7.80vh;
      background-color: $color-theme;
      .icon {
        width: 14.93vw;
        font-size: 24px;
        line-height: 7.80vh;
        text-align: center;
        color: #fff;
      }
      .remove {
        color: #fff;
        font-size: 20px;
      }
      .mu-input {
        width: 82.67vw;
        color: #e97a73;
        margin-bottom: 10px;
        padding-bottom: 0;
        .mu-input-line {
          background-color: #fff;

        }
      }
      .mu-text-field-input {
        color: #f3a19c;
      }
    }
    .tabs-wrapper {
      position: relative;
      width: 100vw;
      height: 5.70vh;
      overflow: hidden;
      .tabs {
        position: relative;
        width: 160vw;
        height: 5.70vh;
        background-color: $color-theme;
        .tab {
          display: inline-block;
          width: 20vw;
          height: 5.70vh;
          line-height: 5.70vh;
          text-align: center;
          color: #f3a19c;
          &.active {
            color: #fff;
            font-weight: 700;
          }
        }
        .highlight-link {
          position: absolute;
          left: 5.6vw;
          bottom: 1vh;
          display: inline-block;
          width: 8vw;
          height: 2px;
          background-color: #fff;
          transition: all .25s linear;
        }

      }

    }
    .slide-enter,
    .slide-leave-to {
      transform: translateX(-100%);
    }
    .slide-enter-to,
    .slide-leave {
      transform: translateX(0);
    }
    .slide-enter-active,
    .slide-leave-active{
      transition: all .2s;
    }
  }
</style>
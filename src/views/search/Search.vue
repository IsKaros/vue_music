<template>
  <div class="search">
    <div class="header">
      <mu-button icon @click="$router.go(-1)">
        <span class="icon icon-arrow_back" ></span>
      </mu-button>
      <mu-text-field  v-model="value" color='white' underline-color="white" placeholder="Bye Bye Bye - LoveStoned" @keydown.enter="goResult">
        <span class="remove icon-remove" v-show="value" @click="value=''"></span>
      </mu-text-field>
    </div>
    <div class="hot-search" v-show="hotWords">
      <div class="title">热门搜索</div>
      <div class="words">
        <mu-chip v-for="(item,index) in hotWords" :key="index" class="word" @click="searchByWord">{{item.first}}</mu-chip>
      </div>
    </div>
  </div>
</template>
<script>
  import {searchHot} from '../../../public/api/search'
  export default {
    name: 'Search',
    data() {
      return {
        hotWords: null,
        value: ''
      }
    },
    created() {
      searchHot().then(res => {
        console.log(res.data)
        if(res.data.code === 200) {
          this.hotWords = res.data.result.hots
        }
      })
    },
    methods: {
      goResult($event) {
        this.$router.push({name:'searchResult',query: {keywords:$event.target.value}})
      },
      searchByWord($event) {
        console.log($event)
        this.$router.push({name:'searchResult',query: {keywords:$event.target.textContent}})
      }
    }
  }
</script>
<style lang="scss" >
  .search {
    height: 100vh;
    background-color: #fff;
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
        color: #fff;
      }
    }
    .hot-search {
      margin: 3.26vh 2.67vw 0 2.67vw;
      .title {
        margin-bottom: 1.50vh;
        font-size: 16px;
        font-weight: 700;
      }
      .words {
        .word {
          margin: 1.19vh 2.13vw 0 0;
          font-size: 14px;
          background-color: #f3f3f3;
        }
      }
    }
  }
</style>
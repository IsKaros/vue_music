<template>
  <div class="song-lists">
    <div class="title">最新音乐</div>
    <ul class="lists">
      <li v-for="(item,index) in musicList" :key="index" class="list" @click="goDetail(item.id)">
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
  import {RecommendMusic} from "../../../public/api/recommend";

  export default {
    name: 'NewMusic',
    data(){
      return {
        musicList: []
      }
    },
    created(){
      this.getRecommendMusic()
    },
    methods:{
      getRecommendMusic(){
        RecommendMusic().then(res => {
          console.log(res)
        })
      }

    }
  }
</script>
<style lang="scss" scoped>
</style>
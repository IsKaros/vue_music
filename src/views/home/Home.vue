<template>
  <div class="home">
    <Header></Header>
    <mu-tabs  center class="tabs" full-width indicator-color="white">
      <mu-tab>
       推荐
      </mu-tab>
      <mu-tab>
        朋友
      </mu-tab>
      <mu-tab>
        电台
      </mu-tab>
    </mu-tabs>
    <Router-view></Router-view>

  </div>
</template>
<script>
  import Header from '../../components/header/Header'
  import Banner from '../../components/banner/Banner'
  import Player from '../../components/player/Player'
  import {ByEmail} from '../../../public/api/login'
  import {mapMutations} from 'vuex'
  export default {
    name: 'Home',
    created(){
      this.loginByEmail('abc819481291@163.com','nba2100158!!!')
    },
    methods: {
      ...mapMutations(['INIT_USER']),
      loginByEmail(email,password){
        ByEmail(email,password).then(res => {
          this.INIT_USER(res)
        })
      }
    },
    components: {
      Header,
      Banner,
      Player
    }
  }
</script>
<style lang="scss" >
  .home {
    position: relative;
    overflow-y: hidden;
    .tabs {
      position: fixed;
      left: 0;
      right: 0;
      top: 6.66vh;
      width: 100vw;
      height: 6.6vh;
      color: #f08a82;
      background-color: $color-theme;
    }
  }
  .mu-tab-link-highlight {
    position: absolute;
    left: 13vw!important;
    bottom: 1.5vh!important;
    width: 7vw!important;
  }
</style>
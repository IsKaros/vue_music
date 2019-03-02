<template>
    <mu-appbar style="width: 100%;" color="primary" class="header">
      <mu-button icon slot="left">
        <span class="icon-menu menu"></span>
      </mu-button>
      <div class="routes">
        <span class="route icon-music"></span>
        <span class="route icon-netease_music"></span>
        <span class="route icon-video"></span>
      </div>
      <mu-button flat slot="right" @click="goSearch">
        <span class="icon icon-search" @click="goSearch"></span>
      </mu-button>
    </mu-appbar>
</template>
<script>
  export default {
    name: 'Header',
    methods: {
      goSearch(){
        console.log(111)
        this.$router.push('/search')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    box-shadow: none;
    width: 100vw!important;
    height: 6.7vh;
    background-color: $color-theme;
    .menu {
      color: white;
    }
    .routes {
      display: flex;
      .route {
        flex: 1;
        color: #ec8e88;
        font-size: 24px;
        text-align: center;
      }
    }
    .icon {
      font-size: 24px;
      color: white;
    }
  }
</style>
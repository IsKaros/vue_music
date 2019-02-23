<template>
  <div class="loading">
    <img :src="img" alt="">
    <span class="text">正在加载中...</span>
  </div>
</template>
<script>
  export default {
    name: 'Loading',
    data() {
      return {
        img: require('../../../public/images/loading.gif')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    img {
      width: 20px;
      height: 20px;
    }
    .text {
      display: inline-block;
      height: 20px;
      line-height: 24px;
      margin-left: 1vw;
      vertical-align: middle;
    }
  }
</style>
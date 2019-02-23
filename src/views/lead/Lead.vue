<template>
  <transition name="page">
    <div class="lead">
      <img src="../../../public/images/lead_bg.png" alt="" class="background">
      <transition name="pic">
        <img src="../../../public/images/lead.png" alt="" class="music" v-show="showPic">
      </transition>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'Lead',
    data(){
      return {
        showPic: false
      }
    },
    mounted(){
       this.timer = setTimeout(() => {
        this.showPic = true
      }, 1000)
    },
    watch:{
      showPic(newValue,oldValue){
        if(newValue === true){
          clearTimeout(this.timer)
          setTimeout(() => {
            this.$router.push('/home')
          },1000)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-enter-active,
  .page-leave-active{
    transition: all 1s;
  }
  .page-enter,
  .page-enter-to,
  .page-leave {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(0 0);
  }
  .page-leave-to {
    opacity: 0.6;
    transform-origin: 50% 50%;
    transform: scale(0.5);
  }
  .lead {
    position: relative;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    .background {
      width: 100vw;
      height: 100vh;
    }
    .music {
      position: absolute;
      left: 20vw;
      top: 20vh;
      width: 60vw;
    }
    .pic-enter,
    .pic-leave-to {
      opacity: 0;
    }
    .pic-enter-active,
    .pic-leave-active{
      transition: all .5s;
    }
    .pic-enter-to,
    .pic-leave{
      opacity: 1;
    }
  }
</style>
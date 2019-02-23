<template>
  <div class="banner" @mouseenter="slideStop" @mouseleave="startSlider" >
    <ul>
      <transition-group name="slide">
        <li v-for="(item,i) in banner" :key="item.imageUrl" class="pics" v-show="i==index">
          <img :src="item.imageUrl" alt="">
        </li>
      </transition-group>
    </ul>
      <ul class="dotsWrap">
        <li class="dots">
          <span v-for="num in banner.length" :key='num' class="dot" :class="num-1==index?'active':''" @click="setPic(num - 1)">
          </span>
        </li>
      </ul>
  </div>
</template>
<script>
  import {Banner} from "../../../public/api/recommend";

  export default {
    name: 'Banner',
    data() {
      return {
        index: 0,
        banner: []
      }
    },
    created(){
      Banner().then(res => {
        if(res.status === 200){
          this.banner = res.data.banners
        }
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.startSlider()
      })
    },
    methods: {
      startSlider() {
        this.timer = setInterval(() => {
          this.slide()
        }, 4000)
      },
      slide() {
        if (this.index >= this.banner.length - 1) {
          this.index = 0
          return
        }
        this.index++
      },
      slideStop() {
        clearInterval(this.timer)
      },
      setPic(index){
        this.index = index
      }
    }
  }
</script>
<style lang="scss" scoped>
  .banner {
    position: relative;
    margin-left: 1vw;
    width: 98vw;
    height: 21.14vh;
    margin-top: 13.3vh;
    border-radius: 2%;
    font-size: 0;
    overflow: hidden;
    .slide-enter {
      opacity: 0.5;
      transform: translateX(100%);
    }
    .slide-leave, .slide-enter-to {
      transform: translateX(0);
    }
    .slide-enter-active, .slide-leave-active {
      transition: all 2s
    }
    .slide-leave-to {
      opacity: 0.5;
      transform: translateX(-100%);
    }
    .pics {
      width: 100%;
      height: 21.14vh;
      position: absolute;
      left: 0;
      right: 0;
      img {
        width: 100%;
        height: 21.14vh;
      }
    }
    .dotsWrap {
      width: 100%;
      .dots {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 2vh;
        margin: 0 auto;
        z-index: 20;

      }
      .dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 2px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.7;
        &.active {
          background-color: $color-theme;
        }
      }
    }
  }
</style>

<template>
  <div id="app">
    <router-view @changeTime="setCurrentTime"/>
    <Player ref="player"></Player>
  </div>
</template>
<script>
  import Player from './components/player/Player'
  import PlayList from './components/playList/PlayList'
  import {mapMutations,mapGetters} from 'vuex'
  export default {
    data(){
      return {
        showList:false
      }
    },
    computed:{
      ...mapGetters({currentSong:'getCurrentSong'})
    },
    methods:{
      ...mapMutations(['SET_CURRENT_TIME']),
      show(flag){
        this.showList = flag
      },
      setCurrentTime(value){
        this.$refs.player.$refs.audio.currentTime = parseInt(value/100*this.currentSong.duration/1000)
        this.SET_CURRENT_TIME(parseInt(value/100*this.currentSong.duration/1000))
      }
    },
    components:{
      Player,
      PlayList
    }
  }
</script>
<style lang="scss">
#app {
  position: relative;
  width: 100vw;
  /*overflow: hidden;*/
}
  .hide {
    opacity: 0;
  }
</style>

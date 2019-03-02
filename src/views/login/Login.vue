<template>
  <div class="login">
    <img src="../../../public/images/logo.png" alt="" class="logo">
    <div class="ways">
      <div class="phone" @click="$router.push('/login/phone')">手机号登录</div>
      <div class="email" @click="$router.push('/login/email')">网易邮箱登录</div>
    </div>
  </div>
</template>
<script>
  import {getCookie} from "../../../public/js/tools";
  import {ByEmail} from '../../../public/api/login'
  export default {
    name: 'Login',
    created(){
      console.log(getCookie('__csrf'));
      if(getCookie('__csrf') !== ''){
        this.$router.replace('/recommend')
      }
    },
    mounted(){
     // ByEmail('abc819481291@163.com','nba2100158!!!')
    }
  }
</script>
<style lang="scss" scoped>
  .login {
    width: 100vw;
    height: 100vh;
    background: url("../../../public/images/login.jpg") no-repeat 0px -10px / 100vw 100vh;
    position: relative;
    .logo {
      position: absolute;
      width: 24.26vw;
      left: 50%;
      top: 10vh;
      transform: translateX(-50%);
    }
    .ways {
      position: absolute;
      width: 82.4vw;
      left: 50%;
      top: 35vh;
      transform: translateX(-50%);
      .phone,
      .email {
        border: 1px solid $color-theme;
        text-align: center;
        height: 6.14vh;
        line-height: 6.14vh;
        color: $color-theme;
        border-radius: 3.67vh;
      }
      .email {
        margin-top: 2vh;
      }
    }
  }
</style>
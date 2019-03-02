<template>
  <div class="login-phone">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <span class="back icon-arrow_back" ></span>
      </mu-button>
      手机号码登录
    </mu-appbar>
    <div class="phone">
      <span class="icon icon-phone"></span>
      <span class="num">+86</span>
      <input type="text" v-model="phone" autocomplete="off" placeholder="请输入手机号">
    </div>
    <div class="password">
      <span class="icon lock icon-lock"></span>
      <input type="password" v-model="password" autocomplete="off" placeholder="请输入密码">
    </div>
    <div class="login-btn" @click="loginByPhone">{{text}}</div>
  </div>
</template>
<script>
  import {ByPhone} from "../../../public/api/login";

  export default {
    name: 'Phone',
    data(){
      return {
        phone: '',
        password: '',
        text:'登录'
      }
    },
    methods:{
      loginByPhone(){
        this.text = '登录中...'
        const loading = this.$loading({
          overlayColor: 'transparent',
          text:'登录中...',
          color:'#e54343'
        });
        ByPhone(this.phone,this.password).then(res => {
          this.INIT_USER(res.data)
          this.mail = ''
          this.password = ''
          setTimeout(() => {
            loading.close()
            this.$router.replace('/recommend')
          },1000)
        }).catch(e => {
          this.text = '登录'
          loading.close()
          this.$toast.message({
            message: '手机号或密码错误',
            position: 'bottom',
            time: 100000,
            color: 'rgb(101,101,101)',
            textColor: '#fff',
            close: false
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login-phone {
    background-color: #fff;
    .back {
      font-size: 32px;
    }
    header {
      background-color: $color-theme;
      box-shadow: none;
      color: #fff;
    }
    .phone,
    .password {
      display: flex;
      font-size: 24px;
      margin: 0 4.8vw;
      @include border-b-1px(#ccc)
    }
    .icon {
      vertical-align: middle;
      margin-right: 1.5vw;
      color: #ccc;
      &.lock {
        padding-bottom: 0.5vh;
      }
    }
    .phone {
      margin-top: 7.5vh;
      .icon {

        vertical-align: text-bottom;
      }
      .num {
        margin-right: 1vw;
        font-size: 18px;
        color: #ccc;
      }
    }
    .password {
      margin-top: 3.9vh;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #ccc;
      font-size: 16px;
    }

    input {
      flex: 1;
      width: 80vw;
      caret-color: $color-theme;
      font-size: 16px;
    }
    .login-btn {
      width: 93vw;
      height: 6vh;
      margin: 4.8vh auto 0 auto;
      line-height: 6vh;
      border-radius: 3vh;
      text-align: center;
      color: white;
      background: linear-gradient(to right, #ff5d4f, #d43f36);
    }
  }
</style>
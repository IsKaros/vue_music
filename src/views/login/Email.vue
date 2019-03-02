<template>
  <div class="email">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <span class="back icon-arrow_back" ></span>
      </mu-button>
      网易邮箱登录
    </mu-appbar>
    <form action="">
      <div class="mail">
        <span class="icon icon-mail"></span>
        <input type="text" v-model="mail" autocomplete="off" placeholder="请输入邮箱账号">
      </div>
      <div class="password">
        <span class="icon lock icon-lock"></span>
        <input type="password" v-model="password" autocomplete="off" placeholder="请输入密码">
      </div>
    </form>

    <div class="login-btn" @click="loginByEmail">{{text}}</div>
  </div>
</template>
<script>
  import {ByEmail} from "../../../public/api/login";
  import {mapMutations} from 'vuex'

  export default {
    name: 'Email',
    data() {
      return {
        mail: '',
        password: '',
        text: '登录'
      }
    },
    methods: {
      ...mapMutations(['INIT_USER']),
      loginByEmail() {
        this.text = '登录中...'
        const loading = this.$loading({
          overlayColor: 'transparent',
          text:'登录中...',
          color:'#e54343'
        });
        ByEmail(this.mail, this.password).then(res => {
          this.INIT_USER(res.data)
          this.mail = ''
          this.password = ''
          setTimeout(() => {
            loading.close()
            this.$router.replace('/recommend')
          },1000)
          console.log(res)
        }).catch(e => {
          this.text = '登录'
          loading.close()
          this.$toast.message({
            message: '邮箱或密码错误',
            position: 'bottom',
            time: 100000,
            color: 'rgb(101,101,101)',
            textColor: '#fff',
            close: false
          })
          if (e.response.status === 501) {

            console.log('请输入正确的邮箱')
          } else if (e.response.status === 502) {
            console.log('密码错误')
          }
        })
      }
    }
  }
</script>
<style lang="scss" >
  .mu-snackbar {
    display: inline-block;
    width: 36vw;
    height: 5vh;
    line-height: 4vh;
    transform: translateX(-50%);
    min-width: 0;
    min-height: 0;
    left: 50%;
    bottom: 9vh;
    text-align: center;
    border-radius: 12vw;
    transition: none;

  }
  .mu-snackbar-message {
    padding: 0;
    vertical-align: top;
  }
  .email {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    .back {
      font-size: 32px;
    }
    header {
      background-color: $color-theme;
      box-shadow: none;
      color: #fff;
    }
    .mail,
    .password {
      display: flex;
      font-size: 24px;
      margin: 0 4.8vw;
      @include border-b-1px(#ccc)
    }
    .mail {
      margin-top: 7.5vh;
    }
    .password {
      margin-top: 3.9vh;
    }
    .icon {
      vertical-align: middle;
      margin-right: 1.5vw;
      &.lock {
        padding-bottom: 0.5vh;
      }
    }
    input {
      flex: 1;
      width: 80vw;
      caret-color: $color-theme;
      font-size: 16px;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
      color: #c1c1c1;
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
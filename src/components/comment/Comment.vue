<template>
<<<<<<< HEAD
  <ul>
    <li v-for="(item,index) in comments " :key="index" class="comment">
      <div class="avatar-wrapper">
        <img :src="item.user.avatarUrl" alt="" class="avatar">
      </div>
      <div class="comment-body">
        <div class="top">
          <span class="name">{{item.user.nickname}}</span>
          <span class="like icon-thumbs_up"></span>
          <span class="count">{{item.likedCount}}</span>
        </div>
        <div class="time">{{item.time|Date}}</div>
        <div class="comment-content">{{item.content}}</div>
      </div>
    </li>
  </ul>
</template>
<script>
  import {filterDate} from "../../../public/js/tools";

  export default {
    name: 'Comment',
    props: {
      comments: {
        type: Array,
        required: true
      }
    },
    filters: {
      Date(time) {
        var date = new Date(time)
        var month = date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0'+ (date.getMonth()+1)
        var day = date.getDate() >=10 ? date.getDate() : '0' + date.getDate()
        if (date.getFullYear() === new Date().getFullYear()) {
          return `${month}月${day}日`
        }
        return filterDate(time)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .comment {
    display: flex;
    margin-top: 3.2vw;

    .avatar-wrapper {
      width: 14.4vw;

    }
    .avatar {
      width: 8.26vw;
      border-radius: 50%;
      padding: 0 3.2vw;
      box-sizing: content-box;
    }
    .comment-body {
      flex: 1;
      @include border-b-1px(#ccc);
      .like,
      .count {
        float: right;
        color: #a4a4a4;
        vertical-align: middle;
      }
      .like {
        font-size: 18px;
        margin: 0 1.5vw;
      }
      .time {
        font-size: 12px;
        color: #ccc;
      }
      .comment-content {
        line-height: 4vh;
        margin-top: 1vh;
        margin-bottom: 1vh;
      }
      &:last-of-type {
       @include border-none
      }
    }
  }
=======
  <div class="comment"></div>
</template>
<script>
  export default {
    name: 'Comment'
  }
</script>
<style lang="scss" scoped>
>>>>>>> 5d50508479b1b4623bdd1bc06468e3029a6a8a2f
</style>
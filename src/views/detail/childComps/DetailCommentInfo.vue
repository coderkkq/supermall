<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多&gt;
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key-="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(time) {
      const date = new Date(time*1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px  solid rgba(0,0,0,.1);
  }
  .header-title,
  .header-more {
    font-size: 16px;
    font-weight: 800;
  }
  .header-title {
    float: left;
    margin-left: 15px;
  }
  .header-more {
    float: right;
    margin-right: 15px;
  }
  .info-user {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .info-user span {
    margin-left: 10px;
    font-weight: 600;
  }
  .info-detail {
    margin-top: 10px;
    padding-left: 10px;
    height: 200px;
  }
  .info-detail p {
    font-size: 14px;
    color: #777;
  }
  .info-other {
    margin-top: 10px;
  }
  .info-other .date {
    margin-right: 15px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    padding: 0 3px;
  }
</style>

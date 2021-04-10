<template>
  <div id="live-play">
    <div class="live-title">
      <h1>{{lCourse.title}} <small style="font-size: 12px; color: #999999">当前热度: {{lCourse.views}}</small></h1>
    </div>
    <div class="live-desc">
      <div class="desc-title">
        <div class="gl-1"></div>
        <span style="font-size: 24px; color: #666666">直播简介</span>
      </div>
      <div style="font-size: 14px; color: #999; padding: 0 20px 10px 20px; white-space:normal; word-break:break-all; word-wrap:break-word; ">{{lCourse.liveCourseDesc}}</div>
    </div>
    <div class="video-content">
      <div v-if="lCourse.url" class="video">
        <live-video :live-src="lCourse.url"></live-video>
      </div>
      <div class="bab">
        <baberrage ref="baberrage"></baberrage>
      </div>
    </div>
    <div class="chat">
      <div class="chat-content">
        <div class="infinite-list" ref="scroll" v-infinite-scroll="loadMore" style="overflow:auto; height: 100%">
            <div style="padding: 8px" v-for="msg in messageList" class="infinite-list-item">
              <barrage-item :msg="msg"></barrage-item>
            </div>
        </div>
      </div>
      <div class="message-input">
        <el-input style="width: 270px" v-model="message" placeholder="发送弹幕"></el-input>
        <el-button style="width: 70px; margin-left: 10px" type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
    <web-socket v-if="typeof(lCourse.liveCourseId) !== 'undefined' && typeof(userInfo.userId) !== 'undefined'" ref="webSocket" :live-id="lCourse.liveCourseId" :user-id="userInfo.userId" @onMessage="receiveMessage"></web-socket>
  </div>
</template>

<script>
import LiveVideo from "@/components/common/LiveVideo";
import Baberrage from "@/components/common/Baberrage";
import WebSocket from "@/components/common/WebSocket";
import Avatar from "@/components/common/Avatar";
import BarrageItem from "@/components/common/BarrageItem";

export default {
  name: "LivePlay",
  components: {
    BarrageItem,
    Avatar,
    WebSocket,
    LiveVideo,
    Baberrage,
  },
  data() {
    return {
      chatLoop: {
        isDisabled: false
      },
      message: "",
      messageList: [],
      userInfo: {},
      lCourse: {},
    }
  },
  methods: {
    receiveMessage(message) {
      this.$refs.baberrage.addToList({
        avatar: message.user.userAvatar,
        msg: message.msg,
        time: new Date().getDate(),
      })
      this.messageList.push(message)
    },
    sendMessage() {
      if (this.message === "") {
        this.$message.error("发送内容不能为空")
      } else {
        this.$refs.webSocket.sendMessage(this.message)
        this.messageList.push({
          user: this.userInfo,
          msg: this.message,
          time: new Date().getDate(),
        })
        this.$refs.baberrage.addToList({
          avatar: this.userInfo.userAvatar,
          msg: this.message,
          time: new Date().getDate(),
        })
      }
      this.message = ""
    },
    loadMore() {

    },
    getUser() {
      this.$api.user.getByUser()
          .then(res => {
            this.userInfo = res.data
          })
    },
    getLCourse(lCourseId) {
      this.$api.liveCourse.getById(lCourseId)
      .then(res => {
        this.lCourse = res.data
      })
    }
  },
  created() {
    this.getUser()
    this.getLCourse(this.$route.params.lCourseId)
  }
}
</script>

<style scoped>
#live-play {
  margin: 0 auto;
  width: 1600px
}

.video-content {
  float: left;
}

.chat {
  border-radius: 8px;
  margin-left: 15px;
  float: left;
  width: 350px;
  height: 580px;
}

.video {
  width: 1000px;
}
.live-desc {
  float: left;
  width: 200px;
  height: 580px;
  margin-right: 15px;
  border-radius: 8px;
  background-color: #fff;
}

.bab {
  position: absolute;
  top: 150px;
  width: 1000px;
  height: 500px;
  z-index: 9;
}

.message-input {
  margin-top: 10px;
}

.gl-1 {
  width: 3px;
  height: 35px;
  margin-right: 10px;
  float: left;
  background-color: #00c558;
}

.live-title {
  font-size: 28px;
  margin-left: 215px;
}

.desc-title {
  margin: 20px 0 20px 10px;
}

.chat-content {
  height: 530px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  background-color: #e2e2e2;
}

.info {
  margin: 0 auto;
  width: 1200px;
  height: 100px;
  padding: 30px;
}

.d-avatar {
  border: white solid 3px;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  float: left;
}

.content {
  height: 100px;
  float: left;
  width: 500px;
  margin-left: 50px;
}

</style>

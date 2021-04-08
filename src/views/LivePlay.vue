<template>
  <div id="live-play">
    <web-socket ref="webSocket" live-id="1111" user-id="0" @onMessage="receiveMessage"></web-socket>
    <div class="live-title">
      直播标题
    </div>
    <div class="live-desc">
      <div class="desc-title">
        <div class="gl-1"></div>
        <span style="font-size: 24px; color: #666666">直播简介</span>
      </div>
      <div style="font-size: 14px; color: #999; padding: 10px">
        简介详细内容测试，简介详细内容测试，
        简介详细内容测试，简介详细内容测试，
        简介详细内容测试，简介详细内容测试，
        简介详细内容测试，简介详细内容测试，
        简介详细内容测试，简介详细内容测试，
      </div>
    </div>
    <div class="video-content">
      <div class="video">
        <live-video live-src="http://47.108.151.199:8080/hls/test.m3u8"/>
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
  </div>
</template>

<script>
import LiveVideo from "../components/common/LiveVideo";
import Baberrage from "../components/common/Baberrage";
import WebSocket from "../components/common/WebSocket";
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
      userInfo: {}
    }
  },
  methods: {
    receiveMessage(message) {
      let data = JSON.parse(message)
      this.$refs.baberrage.addToList({
        avatar: data.user.userAvatar,
        msg: data.message,
        time: data.sendTime,
      })
    },
    sendMessage() {
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
  },
  created() {
    this.getUser()
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
  top: 100px;
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
  margin-right: 3px;
  float: left;
  background-color: #00c558;
}

.live-title {
  font-size: 28px;
  margin-left: 215px;
}

.desc-title {
  margin: 15px 0 20px 30px;
}

.chat-content {
  height: 530px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  background-color: #e2e2e2;
}
</style>

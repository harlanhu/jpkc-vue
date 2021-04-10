<template>
  <div id="live-info">
    <el-dialog title="直播推流信息"
               center
               :visible.sync="liveInfoShow"
               width="30%">
      <h1>串流服务器地址：<span style="color: red">{{liveUrl}}</span></h1>
      <h1>串流密钥：<span style="color: red">{{lCourseId}}</span></h1>
      <h1 style="color: red">* 请使用三方串流软件，如OBS进行串流</h1>
      <div style="text-align: center">
        <el-button type="primary" @click="startPlay">设置完成</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LiveInfoDialog",
  data() {
    return {
      liveInfoShow: false,
      lCourseId: "",
      liveUrl: "rtmp://47.108.151.199:1935/live"
    }
  },
  methods: {
    startPlay() {
      this.$api.liveCourse.startLive(this.lCourseId)
      .then(res => {
        this.$message.info(res.mesage)
        this.liveInfoShow = false
      })
    },
    cancel() {
      this.liveInfoShow = false
    }
  },
  mounted() {
    this.$bus.$on("activeLiveInfoDialog", (isActive, lCourseId) => {
      this.liveInfoShow = isActive
      this.lCourseId = lCourseId
    })
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 20px 0;
}
</style>

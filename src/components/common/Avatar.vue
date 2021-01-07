<template>
  <div id="avatar">
    <el-avatar :size="size" :src="src"></el-avatar>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    size: {
      type: Number,
      default: 72
    },
    src: {
      type: String,
      default: "https://web-applications.oss-cn-chengdu.aliyuncs.com/jpck/user/default/avatar/user-default-avatar.png?Expires=1610008054&OSSAccessKeyId=TMP.3Ki7DbN7u74dGfs4gdiDR3ms3HtiS6USMB89gahX9rkbmfa4kL57jLcNgUJYgSm19qPDa8f5BkGtUJHqg2HM2AaDvHkmJr&Signature=CF1r0a767zmXP2jXwFtbYTOrJNY%3D&versionId=CAEQPRiBgIDjy_zuthciIDQ1OTQ4NzcxNmI2YzQzZGJiMmUyMjgwMDgyNDk5OGNk&response-content-type=application%2Foctet-stream"
    }
  }
}
</script>

<style scoped>

</style>

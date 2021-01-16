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
      default: "https://web-applications.oss-cn-chengdu.aliyuncs.com/jpck/user/default/avatar/user-default-avatar.png?Expires=1610800828&OSSAccessKeyId=TMP.3KeuTQQTj4gGDs155jD4pHx37ZZyNjDwrDh3B4MsZ9wfn1rsCFYs9L9Qkw89URJKnq5TNAqzzQcNxKafnrAkWnqgWbkS3y&Signature=ODsbvaXZznI81hKhQGlgNL1L%2BP4%3D&versionId=CAEQPRiBgIDjy_zuthciIDQ1OTQ4NzcxNmI2YzQzZGJiMmUyMjgwMDgyNDk5OGNk&response-content-type=application%2Foctet-stream"
    }
  }
}
</script>

<style scoped>

</style>

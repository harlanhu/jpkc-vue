<template>
  <div id="avatar">
    <el-avatar :size="size" :src="image"></el-avatar>
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
    image: {
      type: String,
      default: "https://web-applications.oss-cn-chengdu.aliyuncs.com/jpck/user/default/avatar/user-default-avatar.png?Expires=1611484497&OSSAccessKeyId=TMP.3KgudnC61CxX5eqfPGUHYSFAywBdUHkWfEKHnG7eoEjwX73KuywTebZuTqKoR93CKkTv1A5kH2CZbwnyFXKMrqXiDE4cMs&Signature=zZxwRb%2FvCXGCJ3A8D106pylnc5Q%3D&versionId=CAEQPRiBgIDjy_zuthciIDQ1OTQ4NzcxNmI2YzQzZGJiMmUyMjgwMDgyNDk5OGNk&response-content-type=application%2Foctet-stream"
    }
  }
}
</script>

<style scoped>

</style>

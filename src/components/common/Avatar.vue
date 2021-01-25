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
      default: "https://web-applications.oss-cn-chengdu.aliyuncs.com/jpck/user/default/avatar/user-default-avatar.png"
    }
  }
}
</script>

<style scoped>

</style>

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
      default: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  }
}
</script>

<style scoped>

</style>

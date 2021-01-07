<template>
  <div id="top-aside">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TopAside"
}
</script>

<style scoped>
#top-aside {
  border-radius: 4px;
  height: 360px;
  width: 200px;
  background-color: white;
}
</style>

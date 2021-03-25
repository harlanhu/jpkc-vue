<template>
  <div id="nav-menu">
    <el-menu class="el-menu-vertical-demo" :collapse="false" default-active="info" @select="handleSelect">
      <el-menu-item index="info">
        <i class="el-icon-user"/>
        <template #title>个人资料</template>
      </el-menu-item>
      <el-menu-item index="favorite">
        <i class="el-icon-star-off"/>
        <template #title>收藏夹</template>
      </el-menu-item>
      <el-menu-item index="qualification">
        <i class="el-icon-s-help"/>
        <template #title>教师资格</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  methods: {
    handleSelect(key, keyPath) {
      this.$emit("menuSelect", key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>

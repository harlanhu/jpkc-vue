<template>
  <div class="nav-menu">
    <el-menu class="el-menu-vertical-demo" :collapse="false" default-active="1" @open="handleOpen" @close="handleClose">
      <template #title>
        <i class="el-icon-document"/>
        <span>布局列表</span>
      </template>
      <el-submenu index="1">
        <el-menu-item-group>
          <el-menu-item index="1-1">主页编辑推荐</el-menu-item>
          <el-menu-item index="1-2">展示页编辑推荐</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div id="nav-menu">
    <el-menu default-active="all" @select="handleSelect" @open="handleOpen" @close="handleClose">
      <el-menu-item index="all">
        <i class="el-icon-menu"/>
        <span slot="title">所有课程</span>
      </el-menu-item>
      <el-menu-item index="add">
        <i class="el-icon-circle-plus-outline"/>
        <span slot="title">添加课程</span>
      </el-menu-item>
      <el-menu-item index="edit">
        <i class="el-icon-edit-outline"/>
        <span slot="title">修改课程</span>
      </el-menu-item>
      <el-menu-item index="data">
        <i class="el-icon-pie-chart"/>
        <span slot="title">课程数据</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    courseList: []
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      this.$router.push("/course-manage/" + key)
    }
  }
}
</script>

<style scoped>

</style>

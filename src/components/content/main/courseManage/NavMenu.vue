<template>
  <div id="nav-menu">
    <el-menu default-active="all" @select="handleSelect" @open="handleOpen" @close="handleClose">
      <el-menu-item index="all">
        <i class="el-icon-menu"/>
        <span slot="title">所有课程</span>
      </el-menu-item>
      <el-menu-item index="add">
        <i class="el-icon-circle-plus-outline"/>
        <span slot="title">课程创建</span>
      </el-menu-item>
      <el-menu-item index="live-order">
        <i class="el-icon-edit-outline"/>
        <span slot="title">直播预约</span>
      </el-menu-item>
      <el-menu-item index="data">
        <i class="el-icon-pie-chart"/>
        <span slot="title">数据统计</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    courseList: {
      type: Array
    }
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
#nav-menu {
  border-radius: 8px;
  height: 100%;
}
</style>

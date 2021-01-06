<template>
  <div id="main-header">
    <el-row :gutter="60">
      <el-col :span="6">
        <img src="~assets/images/logo.png" alt="logo">
      </el-col>
      <el-col :span="8">
        <div style="background-color:red; height: 64px"></div>
      </el-col>
      <el-col :span="6">
        <div style="background-color:red; height: 64px"></div>
      </el-col>
      <el-col :span="4">
        <div style="background-color:red; height: 64px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MainHeader"
}
</script>

<style scoped>
#main-header {
  left: 0;
  top: 0;
  width: 1200px;
  height: 64px;
  border-radius: 0;
  position: relative;
  clear: none;
  display: block;
  min-width: 0;
  color: black;
  font-size: 16px;
  background-color: white;
  margin: 0 auto;
  padding: 0;
}

#main-header img {
  width: 217px;
  height: 32px;
}
</style>

<template>
  <div id="school">
    <el-row type="flex" justify="space-around">
      <el-col :span="4">
        <el-button type="text">全部749所高校<i class="el-icon-school"/></el-button>
      </el-col>
      <el-col :span="4">
        123
      </el-col>
      <el-col :span="4">
        123
      </el-col>
      <el-col :span="4">
        123
      </el-col>
      <el-col :span="4">
        123
      </el-col>
      <el-col :span="4">
        123
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name: "School"
}
</script>

<style scoped>
#school {
  border-radius: 4px;
  width: 1200px;
  background-color: white;
}

.el-col {
  text-align: center;
}

.el-button {
  margin-top: 8px;
  color: black;
  text-align: center;
  font-size: 18px;
}
</style>

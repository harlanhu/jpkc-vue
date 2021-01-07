<template>
  <div id="drop-down">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{title}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in items">{{item}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: {
    title: {
      type: String,
      default() {
        return "暂无数据"
      }
    },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.el-dropdown {
  font-size: 16px;
  color: black;
}
</style>

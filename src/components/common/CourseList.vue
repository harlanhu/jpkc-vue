<template>
  <div id="course-list">
    <div class="school-class">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="menuSelect">
        <el-menu-item index="1">全部</el-menu-item>
        <el-menu-item index="2">人气</el-menu-item>
        <el-menu-item index="3">收藏</el-menu-item>
        <el-menu-item index="4">免费</el-menu-item>
        <el-menu-item index="5">付费</el-menu-item>
        <div class="search">
          <search-input/>
        </div>
        <div style="float: left">
          <slot name="category"/>
        </div>
      </el-menu>
    </div>
    <div class="school-class-item">
      <slot name="course"/>
    </div>
    <div class="page-control">
      <page-control
          :page-info="pageInfo"
          @prevPage="prevPage"
          @nextPage="nextPage"
          @currentChange="currentChange"/>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/common/SearchInput";
import PageControl from "@/components/common/PageControl";

export default {
  name: "CourseList",
  components: {
    PageControl,
    SearchInput
  },
  props: {
    activeIndex: {
      type: String,
      default: '1'
    },
    pageInfo: {
      type: Object,
      default() {
        return {
          current: 1,
          size: 25,
          total: 0,
          pages: 0,
        }
      }
    }
  },
  methods: {
    menuSelect(key, keyPath) {
      this.$emit("menuSelect", key, keyPath)
    },
    prevPage(val) {
      this.$emit("prevPage", val)
    },
    nextPage(val) {
      this.$emit("nextPage", val)
    },
    currentChange(val) {
      this.$emit("currentChange", val)
    }
  }
}
</script>

<style scoped>
#course-list {
  margin: 0 auto;
  width: 100%;
}

.school-class {
  margin: 0 auto;
  width: 100%;
}

.el-menu {
  border-radius: 8px 8px 8px 8px;
}

.search {
  position: relative;
  left: 620px;
  top: 13px;
}

.school-class-item {
  width: 1240px;
  margin: 20px auto 20px auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.page-control {
  text-align: center;
  margin-bottom: 20px;
}
</style>

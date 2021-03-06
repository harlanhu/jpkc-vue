<template>
  <div id="page-control">
    <el-pagination
        background
        layout="prev, pager, next"
        :total="pageInfo.total"
        :page-count="pageInfo.pages"
        :page-size="pageInfo.size"
        :current-page="pageInfo.currentPage"
        @prev-click="prevPage"
        @next-click="nextPage"
        @current-change="currentChange"
        :hide-on-single-page="true">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "PageControl",
  props: {
    pageInfo: {
      type: Object,
      default() {
        return {
          current: 1,
          size: 25,
          total: 0,
          pages: 0
        }
      }
    }
  },
  methods: {
    prevPage(val) {
      if (this.pageInfo.current <= 1) {
        console.log("不能往前翻页了!")
      } else {
        this.$emit("prevPage", val)
      }
    },
    nextPage(val) {
      if (this.pageInfo.current >= this.pageInfo.pages) {
        console.log("不能往后翻页了！")
      } else {
        this.$emit("nextPage", val)
      }
    },
    currentChange(val) {
      if (this.pageInfo.current < 1 || this.pageInfo.current > this.pageInfo.pages) {
        console.log("页面错乱了！")
      } else {
        this.$emit("currentChange", val)
      }
    }
  }
}
</script>

<style scoped>

</style>

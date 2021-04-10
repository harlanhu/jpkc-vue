<template>
  <div id="course-type">
    <div class="tag" v-for="category in categoryList">
      <el-tag type="info">{{category.categoryName}}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseType",
  data() {
    return {
      categoryList: []
    }
  },
  methods: {
    getAllCategory() {
      this.$api.category.getAllCategory()
      .then(res => {
        this.categoryList = res.data
      })
    }
  },
  created() {
    this.getAllCategory()
  }
}
</script>

<style scoped>
#course-type {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.tag {
  margin: 10px auto;
  border-radius: 20px;
  padding: 3px;
}

.el-tag {
  border-radius: 20px;
}
</style>

<template>
  <div class="layout-dialog">
    <el-dialog title="添加布局" :visible.sync="dialogVisible" center width="80%">
      <div class="content">
        <div class="card" @click="save(school.schoolId)" v-show="isSchool" v-for="school in resourceList">
          <el-card :body-style="{ padding: '0px'}">
            <img :src="school.schoolLogo" class="image"/>
          </el-card>
        </div>
        <div @click="save(course.courseId)" class="card" v-show="!isSchool" v-for="course in resourceList">
          <el-card :body-style="{ padding: '0px'}">
            <img :src="course.courseLogo" class="image"/>
          </el-card>
        </div>
        <div class="empty" style="visibility: hidden"></div>
        <div class="empty" style="visibility: hidden"></div>
        <div class="empty" style="visibility: hidden"></div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "layoutDialog",
  props: {
    isSchool: Boolean,
    activeLayout: ""
  },
  data() {
    return {
      resourceList: [],
      dialogVisible: false
    }
  },
  methods: {
    getSchool(current, size) {
      this.$api.school.getAllWithoutLayout('35ea0cd7f84a530a8306f39c0888f4ee',current, size)
      .then(res => {
        this.resourceList = res.data.list
      })
    },
    getCourse(layoutId, current, size) {
      this.$api.course.getWithoutLayout(layoutId, current, size)
      .then(res => {
        this.resourceList = res.data.list
      })
    },
    save(resourceId) {
      this.$emit("layoutBind", resourceId)
      this.dialogVisible = false
    }
  },
  created() {

  },
  mounted() {
    this.$bus.$on("layoutDialog", (isActive) => {
      this.dialogVisible = isActive
      if (this.isSchool) {
        this.getSchool(1,100)
      } else {
        this.getCourse(this.activeLayout, 1, 100)
      }
    })
  }
}
</script>

<style scoped>
.content {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  width: 350px;
  height: 150px;
  margin: 10px 0;
}

.image {
  width: 350px;
  height: 150px;
  display: block;
}

.empty {
  width: 350px;
  height: 0;
  background-color: #ededed;
}
</style>

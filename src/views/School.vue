<template>
  <div id="school">
    <h3 class="title">
      <div class="tittle-content">
        <p></p>
      </div>
    </h3>
    <div class="school-content">
      <a class="school-item" v-for="school in schoolList">
        <el-image :src="school.schoolLogo" @click="routeToSchoolOfOne(school.schoolName)">
          <div slot="placeholder">
            努力加载中...
          </div>
          <div slot="error">
            加载失败!
          </div>
        </el-image>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      schoolList: []
    }
  },
  methods: {
    getAllSchool() {
      this.$api.school.getAll()
      .then(res => {
        this.schoolList = res.data
      })
    },
    routeToSchoolOfOne(schoolName) {
      this.$router.push("/school/" + schoolName)
    }
  },
  created() {
    this.getAllSchool()
  }
}
</script>

<style scoped>
#school {
  width: 1232px;
  height: 100%;
  padding: 0;
  margin: 0 auto;
}

.title {
  padding: 50px 0 20px 0;
  border-bottom: 1px solid #ccc;
}

.tittle-content {
  height: 40px;
  background: url(//mc.stu.126.net/res/images/pages/spoc/idx_icon.png?113a3fd…) no-repeat -2px -752px;
}

.tittle-content p {
  left: 0;
  height: 0;
  bottom: -22px;
  width: 155px;
  border: 2px solid #8bb721;
  position: relative;
  top: 55px;
}

.el-image {
  top: 8px;
  width: 90%;
  height: 90%;
}

.school-item {
  text-align: center;
  width: 286px;
  height: 146px;
  margin: 20px 20px 0 0;
  border: 1px solid #ddd;
  background-color: #fff;
  float: left;
}
</style>

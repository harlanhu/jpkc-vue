<template>
  <div id="school">
    <el-row type="flex" justify="space-around">
      <el-col :span="4">
        <el-button type="text" @click="allSchoolClick">{{"全部" + schoolCount + "所高校"}}<i class="el-icon-school"/></el-button>
      </el-col>
      <el-col :span="4" v-for="(school, index) in schoolItems" :key="index">
        <a @click="linkToSchoolOfOne(school.resourceId)"><img style="border-radius: 8px" :src="school.resourcePath" alt="加载失败"></a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "School",
  props: {
    schoolItems: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      schoolCount: 0,
    }
  },
  methods: {
    allSchoolClick() {
      this.$router.push("/school")
    },
    getSchoolCount() {
      this.$api.school.getCount()
      .then(res => {
        this.schoolCount = res.data
      })
    },
    linkToSchoolOfOne(resourceId) {
      this.$api.school.getNameByResourceId(resourceId)
      .then(res => {
        this.$router.push("/school/" + res.data)
      })
    }
  },
  created() {
    this.getSchoolCount()
  }
}
</script>

<style scoped>
#school {
  border-radius: 4px;
  width: 1200px;
  background-color: white;
}

img {
  width: 45px;
  margin-top: 8px;
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

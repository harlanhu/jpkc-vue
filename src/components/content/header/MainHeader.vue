<template>
  <div id="main-header">
    <login-dialog/>
    <el-row :gutter="0">
      <el-col :span="4">
        <img @click="$router.push('/home')" src="~assets/images/logo.png" alt="logo">
      </el-col>
      <el-col :span="8" :offset="1">
        <div class="content">
          <drop-down id="drop-down" :title="dropdownTitle" :items="dropdownItems"/>
          <el-button type="text">学校</el-button>
          <el-button type="text">学校云</el-button>
          <el-button type="text">慕课堂</el-button>
          <el-button type="text">APP下载</el-button>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <search-input id="search-input" placeholder="请输入感兴趣的课程"/>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button v-if="$store.state.token === null" @click="activeLoginDialog" type="text">注册<el-divider direction="vertical"/>登录</el-button>
        <div v-else>
          <el-button @click="activeLoginDialog" type="text">个人中心</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DropDown from "@/components/common/DropDown";
import SearchInput from "@/components/common/SearchInput";
import LoginDialog from "@/components/content/dialog/login/LoginDialog";
import Avatar from "@/components/common/Avatar";

export default {
  name: "MainHeader",
  components: {
    Avatar,
    LoginDialog,
    SearchInput,
    DropDown
  },
  data() {
    return {
      dropdownTitle: "课程",
      dropdownItems: ["Java", "Vue", "Python", "C++", "C#", "PHP"]
    }
  },
  methods: {
    activeLoginDialog() {
      this.$bus.$emit("activeLoginDialog", true)
    },
    getAllCategory() {
      this.$api.category.getAllCategory()
      .then(res => {
        this.dropdownItems = res.data
      })
    }
  },
  computed: {
  },
  created() {
    this.getAllCategory()
  }
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
  margin-top: 15px;
  border-radius: 0;
  height: 32px;
  vertical-align: middle;
  border-style: none;
}

#drop-down {
  margin-top: 20px;
}

#search-input {
  margin-top: 13px;
}

.el-col {
  text-align: center;
}

.content {
  display: flex;
}

.el-button {
  margin-top: 11px;
  font-size: 16px;
  color: black;
  flex: 1;
}
</style>

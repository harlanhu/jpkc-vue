<template>
  <div id="profile">
    <el-container style="height: 100%">
      <el-aside style="width: 200px; border-radius: 8px">
        <nav-menu @menuSelect=""/>
      </el-aside>
      <el-main>
        <router-view name="profileContent"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@/components/content/main/profile/NavMenu";
export default {
  name: "Profile",
  components: {NavMenu},
  data() {
    return {
      activeMenu: '1'
    }
  },
  methods: {
    menuSelect(key, keyPath) {
      console.log(key)
    }
  }
}
</script>

<style scoped>
#profile {
  margin: 0 auto;
  width: 1200px;
}

.el-main {
  background-color: #fff;
  border-radius: 8px;
  margin-left: 10px;
}

.el-aside {
  border-radius: 8px;
  height: 100%;
}
</style>

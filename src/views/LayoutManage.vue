<template>
  <div class="layout-manage">
    <el-container style="height: 100%">
      <el-aside style="width: 300px; border-radius: 8px">
        <nav-menu :layout-list="layoutList"/>
      </el-aside>
      <el-main>
        <router-view name="layoutManage"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import NavMenu from "@/components/content/main/layoutManage/NavMenu";
export default {
  name: "LayoutManage",
  components: {NavMenu},
  data() {
    return {
      layoutList: []
    }
  },
  methods: {
    getLayout() {
      this.$api.layout.getAll()
      .then(res => {
        this.layoutList = res.data
      })
    }
  },
  created() {
    this.getLayout()
  }
}
</script>

<style scoped>
.el-main {
  margin-left: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.el-aside {
  border-radius: 8px;
  height: 100%;
}
</style>

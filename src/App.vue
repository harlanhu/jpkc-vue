<template>
  <div id="app">
    <el-container>
      <el-header height="64px">
        <main-header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer height="209px">
        <main-footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import MainHeader from "@/components/content/header/MainHeader";
import MainFooter from "@/components/content/footer/MainFooter";
import Home from "@/views/Home";

export default {
  name: 'App',
  components: {
    MainFooter,
    Home,
    MainHeader
  }
}
</script>

<style>
.el-header {
  background-color: white;
}

.el-footer {
  background-color: #272727;
}
</style>

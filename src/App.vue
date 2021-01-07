<template>
  <div id="app">
    <el-container>
      <el-header height="64px">
        <div id="header">
          <main-header/>
        </div>
      </el-header>
      <el-main>
        <home/>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import '@/assets/css/normalize.css';

import MainHeader from "@/components/content/header/MainHeader";
import Home from "@/views/Home";

export default {
  name: 'App',
  components: {
    Home,
    MainHeader
  }
}
</script>

<style>
#head {
  width: 1200px;
  margin: 0 auto;
}

#content {
  width: 1200px;
  margin: 0 auto;
}

.el-header {
  background-color: white;
}
</style>

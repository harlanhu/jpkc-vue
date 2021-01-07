<template>
  <div id="app">
    <el-container>
      <el-header height="64px">
        <div id="header">
          <main-header/>
        </div>
      </el-header>
      <el-main>
        <main-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import '@/assets/css/normalize.css';

import MainHeader from "@/components/content/header/MainHeader";
import MainView from "@/views/MainView";

export default {
  name: 'App',
  components: {MainView, MainHeader}
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

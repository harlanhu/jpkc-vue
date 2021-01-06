<template>
  <div id="app">
    <el-container>
      <el-header>
        <main-header></main-header>
      </el-header>
    </el-container>
  </div>
</template>

<script>
import '@/assets/css/normalize.css';

import MainHeader from "@/components/content/header/MainHeader";

export default {
  name: 'App',
  components: {MainHeader}
}
</script>

<style>

</style>

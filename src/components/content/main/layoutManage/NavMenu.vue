<template>
  <div class="nav-menu">
    <el-menu class="el-menu-vertical-demo" :collapse="false" default-active="35ea0cd7f84a530a8306f39c0888f4ee" @select="handleSelect">
      <el-menu-item :index="layout.layoutId" v-for="layout in layoutList">
        <i class="el-icon-menu"/>
        <template #title>{{layout.layoutName}}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    layoutList: Array
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>

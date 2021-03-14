<template>
  <div id="nav-menu" v-if="sectionList">
    <el-menu :default-active="sectionList[0].sectionId" @select="handleSelect">
      <el-menu-item :index="section.sectionId" v-for="section in sectionList">
        <el-tooltip slot="title" effect="dark" :content="section.resourceCount + '个文件'" placement="left">
          <span class="title">{{"No." + section.sectionNo + " - " + section.sectionName}}</span>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    sectionList: Array
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.el-menu {
  border-radius: 8px;
}
.title {
  font-size: 16px;
}
</style>

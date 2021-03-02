<template>
  <div id="tree">
    <h1>章节设置</h1>
    <el-tree :data="treeData"
             :props="defaultProps"
             node-key="id"
             default-expand-all
             :expand-on-click-node="false"
             @node-click="handleNodeClick"
             show-checkbox>
      <span slot-scope="{node, data}">
        <span>{{node.label}}</span>
        <span>
          <el-button type="text" @click="() => append(data)">添加章节</el-button>
          <el-button v-show="data.id !== 0" type="text" @click="() => remove(node, data)">删除章节</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let id = 1

export default {
  name: "Tree",
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      treeData: JSON.parse(JSON.stringify(this.data)),
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    append(data) {
      this.$bus.$emit("activeCourseAddDialog", true)
      const newChild = {
        id: id ++,
        label: 'testTree',
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>

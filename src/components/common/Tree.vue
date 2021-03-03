<template>
  <div id="tree">
    <span style="font-size: 20px;">章节设置</span>
    <div class="section-tree">
      <el-tree :data="treeData"
               :props="defaultProps"
               node-key="id"
               default-expand-all
               :expand-on-click-node="false"
               @node-click="handleNodeClick">
      <span slot-scope="{node, data}">
        <span style="font-size: 20px">{{ node.label }}</span>
        <span style="margin-left: 20px">
          <el-button type="text" @click="() => showDialog(data)">添加章节</el-button>
          <el-button v-show="data.id !== 0" type="text" @click="() => remove(node, data)">删除章节</el-button>
        </span>
      </span>
      </el-tree>
    </div>
    <course-add-dialog @createNewChild="append"/>
  </div>
</template>

<script>
import CourseAddDialog from "@/components/content/dialog/course/CourseAddDialog";

let id = 1

export default {
  name: "Tree",
  components: {
    CourseAddDialog
  },
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
    showDialog(data) {
      this.$bus.$emit("activeCourseAddDialog", true, data, id)
    },
    append(newChild, data) {
      id += 1
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
.section-tree {
  margin-top: 20px;
}
</style>

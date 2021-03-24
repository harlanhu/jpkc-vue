<template>
  <div class="layout-manage">
    <h1>布局信息</h1>
    <nav-menu/>
  </div>
</template>

<script>

import NavMenu from "@/components/content/layout/NavMenu";
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
        console.log(res.data)
      })
    }
  },
  created() {
    this.getLayout()
  }
}
</script>

<style scoped>

</style>

<template>
  <h1>布局信息</h1>

</template>

<script>

export default {
  name: "LayoutManage",
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

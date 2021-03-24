<template>
  <div id="search-input">
    <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        :placeholder="placeholder"
        size="medium"
        suffix-icon="el-icon-search"
        :trigger-on-focus="true"
        @input="getQueryData"
        @select="handleSelect">
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    }
  },
  data() {
    return {
      data: [],
      state: '',
      timeout: null
    };
  },
  methods: {
    getQueryData() {
      this.$api.course.getSearchData(this.state, 1, 5)
      .then(res => {
        this.data = res.data
      })
    },
    querySearchAsync(query, cb) {
      let result = []
      for (const item of this.data) {
        result.push({
          value: item.courseName
        })
      }
      cb(result)
    },
    handleSelect(item) {
      console.log(item);
    }
  }
}
</script>

<style scoped>

</style>

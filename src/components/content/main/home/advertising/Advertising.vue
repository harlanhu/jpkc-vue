<template>
 <div id="advertising">
   <div class="content" v-for="data in dataList">
     <strip-card :data="data"/>
   </div>
 </div>
</template>

<script>
import StripCard from "@/components/common/StripCard";
export default {
  name: "Advertising",
  components: {
    StripCard
  },
  data() {
    return {
      dataList: []
    }
  },
  methods: {
    getAdvertising() {
      this.$api.webResource.getWebResourceByLayoutName("home-advertising")
      .then(res => {
        this.dataList = res.data
      })
    }
  },
  created() {
    this.getAdvertising()
  }
}
</script>

<style scoped>
#advertising {
  display: flex;
}

.content {
  float: left;
  flex: 1;
}


</style>

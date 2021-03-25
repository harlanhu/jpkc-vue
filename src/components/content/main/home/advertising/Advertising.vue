<template>
 <div id="advertising">
   <div @click="linkToCourseDetail(data.courseId)" class="content" v-for="data in dataList">
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
      this.$api.layout.getAdvertising(1, -1)
      .then(res => {
        console.log(res.data.list)
        this.dataList = res.data.list
      })
    },
    linkToCourseDetail(courseId) {
      this.$router.push("/courseDetail/" + courseId)
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

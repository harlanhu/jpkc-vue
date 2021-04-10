<template>
  <div id="baberrage">
    <vue-baberrage
        :isShow="barrageIsShow"
        :barrageList="barrageList"
        :maxWordCount="maxWordCount"
        :throttleGap="throttleGap"
        :loop="barrageLoop"
        :boxHeight="boxHeight"
        :messageHeight="messageHeight">
    </vue-baberrage>
  </div>
</template>

<script>
import Vue from 'vue';
import { vueBaberrage, MESSAGE_TYPE } from 'vue-baberrage';

Vue.use(vueBaberrage)

export default {
  name: 'Barrages',
  data() {
    return {
      currentId: 0,
      barrageIsShow: true,
      messageHeight: 1,
      boxHeight: 550,
      barrageLoop: false,
      maxWordCount: 30,
      throttleGap: 2000,
      barrageList: []
    };
  },
  methods: {
    addToList(message) {
      this.barrageList.push({
        id: this.currentId,
        avatar: message.avatar,
        msg: message.msg,
        time: message.time,
        type: MESSAGE_TYPE.NORMAL,
      })
     this.currentId ++
    }
  }
}
</script>

<style scoped>

</style>

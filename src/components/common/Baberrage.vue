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
      msg: '弹幕测试弹幕测试',
      barrageIsShow: true,
      messageHeight: 1,
      boxHeight: 500,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
      barrageList: []
    };
  },
  mounted() {
    this.addToList();
  },
  methods: {
    addToList() {
      let list = [
        {
          id: 1,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 3,
          barrageStyle: 'red'
        },
        {
          id: 2,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 8,
          barrageStyle: 'green'
        },
        {
          id: 3,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 10,
          barrageStyle: 'normal'
        },
        {
          id: 4,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 5,
          barrageStyle: 'blue'
        },
        {
          id: 5,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 6,
          barrageStyle: 'red'
        },
        {
          id: 6,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 12,
          barrageStyle: 'normal'
        },
        {
          id: 7,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 5,
          barrageStyle: 'red'
        },
        {
          id: 8,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 5,
          barrageStyle: 'normal'
        },
        {
          id: 9,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 8,
          barrageStyle: 'red'
        },
        {
          id: 10,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 10,
          barrageStyle: 'yellow'
        }
      ];
      list.forEach((v) => {
        this.barrageList.push({
          id: v.id,
          avatar: v.avatar,
          msg: v.msg,
          time: v.time,
          type: MESSAGE_TYPE.NORMAL,
          barrageStyle: v.barrageStyle
        });
      });
    }
  }
}
</script>

<style scoped>

</style>

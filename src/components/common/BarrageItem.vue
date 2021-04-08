<template>
  <div id="barrage-item">
    <div style="float: left; width: 40px; height: 40px">
      <avatar :image="msg.user.userAvatar" :size="40"></avatar>
    </div>
    <div class="content">
      <span style="color: #00c558">{{msg.user.username}}</span>
      <span>{{": " + msg.msg}}</span>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar";

export default {
  name: "BarrageItem",
  components: {Avatar},
  props: {
    msg: {}
  }
}
</script>

<style scoped>
#barrage-item {
  height: 45px;
}
.avatar {
  float: left;
}

.content {
  position: relative;
  top: 8px;
  left: 3px;
}

.content span {
  float: left;
  font-size: 18px;
}
</style>

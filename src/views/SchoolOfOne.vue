<template>
  <div id="school-of-one">
    <div class="banner">
      <div class="banner-bg"></div>
      <div class="banner-avatar">
        <img src="https://nos.netease.com/edu-image/F78C41FA9703708FB193137A688F7195.png?imageView&thumbnail=150y150&quality=100" alt="加载失败">
      </div>
    </div>
    <div class="school-doc">
      <div class="b-20"></div>
      <div class="doc">
        <div class="doc-content">
          <h1>北京大学</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SchoolOfOne",
}
</script>

<style scoped>
.banner {
  background-color: #000;
  border-radius: 4px;
  width: 100%;
  height: 200px;
}

.banner-bg {
  margin-left: 70px;
  padding: 0;
  outline: none;
  width: 1280px;
  height: 100%;
  border-radius: 4px;
  background: url(https://img-ph-mirror.nosdn.127.net/SkD-CO-sd86gJDlfsRix0A==/6608230909190265551.jpg) no-repeat center center;
  box-shadow: inset 50px 0 120px -20px #000000, inset 50px 0 120px -40px #000000, inset -50px 0 120px -20px #000000, inset -50px 0 120px -40px #000000, inset 0 10px 10px -10px #000000, inset 0 -10px 10px -10px #000000;
}

.banner-avatar {
  position: relative;
  border: 6px solid white;
  border-radius: 81px;
  left: 150px;
  bottom: 75px;
  background-color: #fff;
  width: 150px;
  height: 150px;
}

.school-doc {
  width: 1205px;
  margin: 0 auto;
  outline: none;
  box-sizing: border-box;
}

.b-20 {
  height: 20px;
  clear: both;
  overflow: hidden;
  display: block;
}

.doc {
  height: 100px;
  width: 100%;
}

.doc-content {
  position: absolute;
  left: 400px;
  width: 900px;
  height: 100px;
}

.doc-content h1 {
  font-size: 20px;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0;
  color: rgba(0, 0, 0, .85);
  font-weight: 500;
}
</style>

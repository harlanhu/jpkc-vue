<template>
  <div id="school-of-one">
    <div class="bgc">
      <div class="banner">
        <div class="banner-bg"></div>
        <div class="banner-avatar">
          <img src="https://nos.netease.com/edu-image/F78C41FA9703708FB193137A688F7195.png?imageView&thumbnail=150y150&quality=100" alt="加载失败">
        </div>
      </div>
    </div>
    <div class="school-doc">
      <div class="b-20"></div>
      <div class="doc">
        <div class="doc-content">
          <h1>北京大学</h1>
          <p>北京大学创办于1898年，初名京师大学堂，是中国第一所国立综合性大学，也是当时中国最高教育行政机关。辛亥革命后，于1912年改为现名。 学校为教育部直属全国重点大学，国家“211工程”、“985工程”建设大学、C9联盟，以及东亚研究型大学协会、国际研究型大学联盟、环太平洋大学联盟、东亚四大学论坛的重要成员。</p>
        </div>
      </div>
    </div>
    <div class="b-30"></div>
    <div class="school-class">
      <p>课程</p>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">全部</el-menu-item>
        <el-menu-item index="2">正在进行</el-menu-item>
        <el-menu-item index="3">即将开始</el-menu-item>
        <el-menu-item index="4">已结束</el-menu-item>
        <div class="search">
          <search-input/>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/common/SearchInput";
export default {
  name: "SchoolOfOne",
  components: {SearchInput},
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
#school-of-one {
  margin: 0 auto;
  overflow: hidden;
}

.bgc {
  background-color: #000;
  border-radius: 4px;
}

.banner {
  margin: 0 auto;
  background-color: #000;
  border-radius: 4px;
  width: 1200px;
  height: 200px;
}

.banner-bg {
  padding: 0;
  outline: none;
  width: 100%;
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
  position: relative;
  left: 370px;
  width: 800px;
  height: 100px;
}

.doc-content h1 {
  font-size: 20px;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0;
  color: rgba(0, 0, 0, .85);
  font-weight: 600;
}
.doc-content p {
  font-size: 14px;
  padding-right: 55px;
  margin-top: 15px;
  color: #666;
}

.b-30 {
  height: 80px;
  clear: both;
}

.school-class {
  margin: 0 auto;
  width: 1205px;
}

.school-class p {
  font-size: 20px;
  margin-bottom: 20px;
}

.el-menu {
  border-radius: 4px;
}

.search {
  position: relative;
  left: 620px;
  top: 13px;
}
</style>

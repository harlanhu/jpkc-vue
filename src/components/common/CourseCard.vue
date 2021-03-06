<template>
  <div id="course-card">
    <el-card :body-style="{ padding: '0px'}" shadow="hover">
      <img class="class-logo" :src="courseLogo" alt="加载失败"/>
      <div class="class-info">
        <div class="class-title">
          <slot name="class-title">
            <span>加载失败...</span>
          </slot>
        </div>
        <div class="class-info1">
          <slot name="class-info1">
            <span>加载失败...</span>
          </slot>
        </div>
        <div class="class-info2">
          <slot name="class-info2"/>
        </div>
      </div>
      <div class="school-info">
        <div class="school-name">
          <slot name="infoA">
            <span>加载失败...</span>
          </slot>
        </div>
        <div class="follow">
          <slot name="infoB">
            <span>加载失败...</span>
          </slot>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    courseLogo: {
      type: String,
      default: "https://web-applications.oss-cn-chengdu.aliyuncs.com/jpck/course/default/logo/course-default-logo.png"
    }
  }
}
</script>

<style scoped>
#course-card {
  width: 228px;
  height: 100%;
  margin-left: 17px;
  margin-bottom: 20px;
}

.class-logo {
  transition: all 0.3s cubic-bezier(0, 0.5, 0.5, 1) 0s;
  width: 228px;
  height: 128px;
  vertical-align: middle;
}

.class-info {
  margin-top: 10px;
  margin-left: 10px;
}

.class-title {
  line-height: 24px;
  display: inline-block;
  width: 100%;
  font-family: 微软雅黑, 'Microsoft YaHei',serif;
  font-size: 14px;
  color: #000;
  font-weight: bold;
  text-align: left;
  vertical-align: middle;
}

.class-info1 {
  color: #00c758;
  box-sizing: border-box;
  font-family: 微软雅黑, 'Microsoft YaHei',serif;
  text-align: left;
  vertical-align: middle;
  width: 100%;
  display: inline-block;
  margin-top: 5px;
}

.class-info2 {
  color: #666;
  box-sizing: border-box;
  font-family: 微软雅黑, 'Microsoft YaHei',serif;
  text-align: left;
  vertical-align: middle;
  width: 100%;
  margin-top: 5px;
  display: inline-block;
}

.school-info {
  margin-top: 30px;
  margin-bottom: 10px;
}

.school-name {
  display: inline-block;
  width: 124px;
  font-family: 微软雅黑, "Microsoft YaHei",serif;
  font-size: 12px;
  color: #999;
  text-align: left;
  vertical-align: middle;
}

.follow {
  display: inline-block;
  width: 80px;
  font-size: 12px;
  color: #999;
  text-align: right;
  vertical-align: middle;
}
</style>

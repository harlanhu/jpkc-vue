<template>
  <div id="main-footer">
    <div id="content">
      <div id="info">
        <el-row>
          <el-col :span="12">
            <div class="logo"></div>
            <p>由高教社联手网易推出，让每一个有提升愿望的用户能够学到中国知名高校的课程，并获得认证。</p>
          </el-col>
          <el-col :span="3" :offset="3">
            <h4>关于我们</h4>
            <div class="detail">
              <span>
                <el-button size="small" type="text">关于我们</el-button>
                <el-button size="small" type="text">学校云</el-button>
              </span>
              <br/>
              <span>
                <el-button size="small" type="text">联系我们</el-button>
                <el-button size="small" type="text">常见问题</el-button>
              </span>
              <span>
                <el-button size="small" type="text">意见反馈</el-button>
                <el-button size="small" type="text">法律条款</el-button>
              </span>
            </div>
          </el-col>
          <el-col :span="3" :offset="1">
            <h4>关注我们</h4>
            <div class="detail">
              <span>

              </span>
            </div>
          </el-col>
          <el-col :span="2">
            <h4>友情链接</h4>
            <div class="detail">
              <span>
                <el-button size="small" type="text">网易云课堂</el-button>
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainFooter"
}
</script>

<style scoped>
#main-footer {
  width: 1200px;
  height: 100px;
  margin: 0 auto;
}

#info {
  margin-top: 30px;
}

h4 {
  font-size: 16px;
  color: #ccc;
}

p {
  margin-top: 12px;
  font-size: 12px;
  color: #999;
}

.logo {
  width: 100%;
  height: 37px;
  background: url(//edu-image.nosdn.127.net/f24bc450d3c643dd9fb61e4c77928acd.png?imageView&quality=100) no-repeat 0 0;
  background-size: contain;
}

.detail {
  margin-top: 10px;
  color: #999;
}
</style>

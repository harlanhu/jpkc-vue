<template>
  <div class="container">
    <form>
      <div class="col-sm-push-2 col-sm-8">
        <div class="asbdy" v-for="(item ,index) in pageData">
          <!-题干->
          <div class="question">
            <span class="num">{{(currentPage-1)*pageSize+index+1}}、</span>
            {{item.tiMu}}
            {{item.type==0?' (单选题)':' (多选题)'}}
          </div>
          <!-选项->
          <div class="anser">
            <ul>
              <li class="xuanXiang" v-for="(tiao,i) in item.xuanXiang" :class="{'double-line':false}">
                <div v-if="item.type==0">
                  <input
                      type="radio"
                      v-model="item.picked_radio"
                      :name="'pickedd_' +((currentPage-1)*pageSize+index)"
                      v-bind:value="haha[i]"
                      @change="doCheck(item,((currentPage-1)*pageSize+index))"
                  />
                  {{haha[i]}} {{tiao}}
                </div >

                <div  v-if="item.type==1">
                  <input
                      type="checkbox"
                      v-model="item.pickedMany"
                      :name="'pickedd_' +((currentPage-1)*pageSize+index)"
                      v-bind:value="haha[i]"
                      @change="doCheck(item,((currentPage-1)*pageSize+index))"
                  />
                  {{haha[i]}} {{tiao}}
                </div>


              </li>
            </ul>
          </div>


          <div class="clearfix"></div>
        </div>

        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;
                </button>
                <h4 class="modal-title" id="myModalLabel">答题情况</h4>
              </div>
              <!-- 内容 -->
              <div class="modal-body">
                <ul class="modal-u">
                  <li v-for="(item,index) in chengji">
									<span :class="{unselect:!item.isChose,is_right:item.isRight,is_error
									:(!item.isRight&&item.isRight!=undefined)}">
										第{{index+1}}题
									</span>
                  </li>

                </ul>
              </div>
              <div class="clearfix"></div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <!-- <button type="button" class="btn btn-primary saveBtn">确定</button> -->
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
        </div>
      </div>
      <div class="col-sm-offset-2 col-sm-8 dtbtn">
        <button type="button" class="btn btn-primary" style="width: 80px" @click="prev">上一题</button>
        <button type="button" class="btn btn-primary" style="width: 80px" @click="next">下一题</button>
        <button type="button" class="btn btn-primary" style="width: 80px" @click="detail"  data-toggle="modal"
                data-target="#myModal">答题状况</button>
      </div>
    </form>
  </div>

</template>

<script>
export default {
  name: "exam",
  data: {
    name: "zhangsan",
    currentPage: 1, //当前第几页
    pageSize: 2,  //每页显示几条数据
    haha: ["A", "B", "C", "D"],
    pageData: [],  //单页数据
    chengji: [
      {
        isRight: null,
        picked_radio: "",
        pickedMany:[],
        daan: ["C"],
        tiMu: "1*8=?",
        xuanXiang: ["2", "6", "8", "10"],
        type: 0
      },
      {
        isRight: null,
        picked_radio: "",
        pickedMany:[],
        daan: ["D"],
        tiMu: "2*5=?",
        xuanXiang: ["2", "6", "8", "10"],
        type: 0
      },
      {
        isRight: null,
        picked_radio: "",
        pickedMany:[],
        daan: ["A", "B", "D"],
        tiMu: "下面哪些城市属于河南？",
        xuanXiang: ["郑州", "开封", "阜阳", "信阳"],
        type: 1
      },
      {
        isRight: null,
        picked_radio: "",
        pickedMany:[],
        daan: ["D"],
        tiMu: "纽约是下面哪个国家的城市?",
        xuanXiang: ["中国", "日本", "韩国", "美国"],
        type: 0
      },
      {
        isRight: null,
        ppicked_radio: "",
        pickedMany:[],
        daan: ["A"],
        tiMu: "2*8=?",
        xuanXiang: ["16", "6", "8", "10"],
        type: 0
      },
      {
        isRight: null,
        picked_radio: "",
        pickedMany:[],
        daan: ["B", "D"],
        tiMu: "下面哪些属于植物?",
        xuanXiang: ["狗", "棉花", "猫", "水稻"],
        type: 1
      }
    ]
  },
  methods: {
    init() {
      var $this = this;

      this.pageData = this.chengji.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      this.pageData.forEach(function (item, i) {
        if(item.type==0){
          item.picked_radio = $this.$cookies.get('pickedd_' + (($this.currentPage - 1) * $this.pageSize + i));
        }else{
          if(JSON.parse($this.$cookies.get('pickedd_' + (($this.currentPage - 1) * $this.pageSize + i)))==null||
              JSON.parse($this.$cookies.get('pickedd_' + (($this.currentPage - 1) * $this.pageSize + i)))==undefined){
            item.pickedMany=[];
          }else{
            item.pickedMany = JSON.parse($this.$cookies.get('pickedd_' + (($this.currentPage - 1) * $this.pageSize + i)));
          }
        }
        item.isRight = this.$cookies.get('isRightt_' + (($this.currentPage - 1) * $this.pageSize + i));
      });
    },
    doCheck(item, index) {
      if(item.type==0){
        //单选
        if (item.picked_radio == item.daan[0]) {
          item.isRight = true;
        } else {
          item.isRight = false;
        }
      }else{
        //多选
        if (JSON.stringify(item.pickedMany.sort()) == JSON.stringify(item.daan.sort())) {
          item.isRight = true;
        } else {
          item.isRight = false;
        }
      }

      // 将结果放入缓存
      if(item.type==0){
        this.$cookies.set('pickedd_' + index, item.picked_radio);

      }else{
        this.$cookies.set('pickedd_' + index, JSON.stringify(item.pickedMany));
      }

      this.$cookies.set('isRightt_' + index, item.isRight);
      this.$cookies.set('isChose_' + index, true);

    },
    prev() {  //上一页
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.init();
      }
    },
    next() {  //下一页
      if (this.currentPage < this.allPageNum) {
        this.currentPage = this.currentPage + 1;
        this.init();
      }
    },
    detail() { //答题状况
      var $this = this;
      this.chengji.forEach(function (item, i) {
        item.isRight = JSON.parse($this.$cookies.get('isRightt_' + i));
        item.isChose = JSON.parse($this.$cookies.get('isChose_' + i));
      });
    }
  },
  computed: {
    allPageNum: {
      get: function () {
        return parseInt((this.chengji.length + this.pageSize - 1) / this.pageSize);
      }
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>

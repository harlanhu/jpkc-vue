<template>
  <section class="barrage-wrapper"
           ref="barrageWrapper"
           :style="{height:percent+'%'}">
    <div class="barrage-main">
      <div class="barrage-main-dm"
           :class="{'ani-pause':isPause,'ani-running':!isPause}"
           ref="barrageMainDm"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // 弹幕源数组
    arr: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 弹幕是否暂停状态
    isPause: {
      type: Boolean
    },
    // 弹幕占比
    percent: {
      type: Number,
      default: 80
    }
  },
  data () {
    return {
      // 每行弹幕数最大值
      MAX_DM_COUNT: 5,
      // 行数
      CHANNEL_COUNT: 8,
      // 弹幕数组
      barrages: [],
      // dom池
      domPool: [],
      // intervalDM
      intervalDM: null,
      // 取弹幕时间间隔
      interValTime: 500,
      // 滚动弹幕的通道
      hasPosition: [],
      // 顶部弹幕的通道
      hasTopPosition: [],
      // 弹幕容器
      barrageMainDm: null,
      // 弹幕容器宽度
      barMainWidth: 500,
      // 自定义弹幕样式属性列表
      dmStyles: [
        'color',
        'fontSize'
      ]
    };
  },
  computed: {
  },
  created () {

  },
  mounted () {
    this.barrageMainDm = this.$refs.barrageMainDm;
    // 缓存容器宽度
    this.barMainWidth = this.barrageMainDm.clientWidth;
    // 初始化弹幕dom组
    this.init();
    // 开始播放弹幕
    this.playDm();
    // 注册页面监听器
    document.addEventListener("visibilitychange", this.visibilitychangeFn);
  },
  watch: {
    arr (list) {
      this.barrages = list;
    },
    isPause (val) {
      if (val) {
        this.pauseDm();
      } else {
        this.playDm();
      }
    },
    percent (val) {
      this.CHANNEL_COUNT = val / 10;
    }
  },
  methods: {
    visibilitychangeFn () {
      if (!document.hidden) {
        //处于当前页面
        this.playDm();
        console.log('进入页面');
      } else {
        console.log('离开页面');
        clearInterval(this.intervalDM);
        this.intervalDM = null;
      }
    },
    init () {
      let wrapper = this.$refs.barrageMainDm;
      // 先new一些div 重复利用这些DOM
      for (let j = 0; j < this.CHANNEL_COUNT; j++) {
        let doms = [];
        for (let i = 0; i < this.MAX_DM_COUNT; i++) {
          // 初始化dom
          let dom = document.createElement('div');
          // 初始化dom的位置 通过设置className
          dom.className = 'barrage-item';
          dom.style.transform = `translate3d(${this.barMainWidth}px,0,0)`
          // DOM的通道是固定的 所以设置好top就不需要再改变了
          dom.style.top = j * (this.barrageMainDm.clientHeight / this.CHANNEL_COUNT) + 'px';
          console.log(dom.style.top)
          // 每次到animationend结束的时候 就是弹幕划出屏幕了 将DOM位置重置 再放回DOM池
          dom.addEventListener('animationend', (e) => {
            // 初始化dom样式
            dom.className = 'barrage-item';
            dom.style.transform = `translate3d(${this.barMainWidth}px,0,0)`
            dom.style.animation = null;
            // 清空自定义样式
            this.dmStyles.forEach(key => {
              dom.style[key] = null;
            })
            // this.domPool[j].push({ el: dom });
            // 动画结束后设置当前dom为空闲状态
            // console.log(i, j)
            if (this.domPool[i][j]) {
              this.domPool[i][j].isFree = false;
            }
            // console.log(dom)
          });
          // 放入该通道的DOM池
          doms.push({
            row: j,
            col: i,
            el: dom,
            isUse: false,
            isFree: false
          });
        }
        this.domPool.push(doms);
      }
      // hasPosition 标记每个通道目前是否有位置
      for (let i = 0; i < this.CHANNEL_COUNT; i++) {
        this.hasPosition[i] = true;
        this.hasTopPosition[i] = true;
      }
    },
    /**
     * 获取一个可以发射弹幕的通道 没有则返回-1
     */
    getChannel () {
      for (let i = 0; i < this.CHANNEL_COUNT; i++) {
        if (this.hasPosition[i] && this.domPool[i].length) return i;
      }
      return -1;
    },
    /**
    * 获取一个可以发射顶部弹幕的通道 没有则返回-1
    */
    getTopChannel () {
      for (let i = 0; i < this.CHANNEL_COUNT; i++) {
        if (this.hasTopPosition[i]) return i;
      }
      return -1;
    },
    /**
    * 根据DOM和弹幕信息 发射弹幕
    */
    shootDanmu (domItem, dmItem, channel) {
      // 设置当前通道为false
      this.hasPosition[channel] = false;
      //获取dom
      let dom = domItem.el;
      // 是否已经使用的dom
      if (!domItem.isUse && this.barrageMainDm) {
        domItem.isUse = true;
        this.barrageMainDm.appendChild(domItem.el);
      }
      // 判断是否有自定义样式
      if (dmItem.style) {
        let keys = Object.keys(dmItem.style);
        let self = this;
        keys.forEach(key => {
          // 检查样式属性是否合法
          let isStyle = self.dmStyles.includes(key)
          if (isStyle) {
            dom.style[key] = dmItem.style[key];
          }
        });
      }
      domItem.isFree = true;
      // console.log('biu~ [' + dmItem.content + ']');
      // dom.innerText = dmItem.content;
      // 判断是否是js弹幕
      if (dmItem.isJs) {
        dom.innerHTML = dmItem.content;
      } else {
        dom.innerText = dmItem.content;
      }
      // 设置弹幕的位置信息 性能优化 left -> transform
      // dom.style.transform = `translateX(${-dom.clientWidth}px)`;
      // dom.style.transform = `translate3d(${-dom.clientWidth}px,0,0)`; // css硬件加速
      dom.className = dmItem.isSelf ? 'barrage-item self-dm' : 'barrage-item';
      dom.style.animation = 'barrage-run 5s linear';
      // 弹幕全部显示之后 才能开始下一条弹幕
      // 大概 dom.clientWidth * 10 的时间 该条弹幕就从右边全部划出到可见区域 再加1秒保证弹幕之间距离
      setTimeout(() => {
        this.hasPosition[channel] = true;
      }, dom.clientWidth * 10 + 1000);
    },
    shootTopDanmu (dmItem, channel) {
      // 设置当前通道为false
      this.hasTopPosition[channel] = false;
      //获取dom
      let dom = document.createElement('div');
      dom.className = dmItem.isSelf ? 'barrage-item top-item self-dm' : 'barrage-item top-item';
      // 判断是否有自定义样式
      if (dmItem.style) {
        let keys = Object.keys(dmItem.style);
        let self = this;
        keys.forEach(key => {
          // 检查样式属性是否合法
          let isStyle = self.dmStyles.includes(key)
          if (isStyle) {
            dom.style[key] = dmItem.style[key];
          }
        });
      }
      // 判断是否是js弹幕
      if (dmItem.isJs) {
        dom.innerHTML = dmItem.content;
      } else {
        dom.innerText = dmItem.content;
      }
      dom.addEventListener('animationend', () => {
        this.barrageMainDm.removeChild(dom)
        this.hasTopPosition[channel] = true;
      })
      this.barrageMainDm.appendChild(dom); // 一定要在获取宽度和执行动画之前渲染dom
      dom.style.transform = `translate3d(${this.barMainWidth / 2 - (dom.clientWidth / 2)}px,${channel * dom.clientHeight}px,0)`
      dom.style.animation = 'barrage-fade 3s';
    },
    // 获取空闲通道中空闲的dom
    getFreeChannelDom (channel) {
      let item;
      item = this.domPool[channel].find(it => !it.isFree)
      return item
    },
    // 暂停弹幕
    pauseDm () {
      if (this.intervalDM) {
        clearInterval(this.intervalDM)
        this.intervalDM = null;
      }
    },
    // 播放弹幕
    playDm () {
      // 每隔1ms从弹幕池里获取弹幕（如果有的话）并发射
      let self = this; // 这里取一个self this 为了方便调试的时候看到this具体内容
      self.intervalDM = setInterval(() => {
        // let channel;
        // if (self.barrages.length && (channel = self.getChannel()) != -1) {
        //   let domItem = self.getFreeChannelDom(channel);
        //   // let domItem = self.domPool[channel].shift();
        //   if (domItem) {
        //     let danmu = self.barrages.shift();
        //     self.shootDanmu(domItem, danmu, channel);
        //   }
        // }
        // 更新逻辑
        if (self.barrages.length > 0) {
          let channel;
          let topChannel;
          let barrage = self.barrages.shift();
          if (barrage.direction == 'top' && (topChannel = self.getTopChannel()) != -1) {
            // top....
            self.shootTopDanmu(barrage, topChannel);
          }
          if (barrage.direction == 'default' && (channel = self.getChannel()) != -1) {
            // default....
            let domItem = self.getFreeChannelDom(channel);
            if (domItem) {
              // let danmu = self.barrages.shift();
              self.shootDanmu(domItem, barrage, channel);
            }
          }
        }
      }, self.interValTime);
    }
  },
  components: {

  },
};
</script>
<style  lang="scss">
.barrage-wrapper {
  * {
    margin: 0px;
    padding: 0px;
  }
  z-index: 1;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  .barrage-item {
    z-index: 99;
    position: absolute;
    // left: 0px;
    // top: 0px;
    // transform: translateX(-100%);
    // padding: 5px 0px;
    user-select: none; // 禁用选择文字
    position: absolute;
    white-space: pre;
    cursor: pointer;
    // pointer-events: none;
    // perspective: 500px;
    display: inline-block;
    will-change: transform;
    font-size: 25px;
    color: rgb(255, 255, 255);
    font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;
    font-weight: bold;
    line-height: 1.125;
    opacity: 1;
    text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px,
      rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
    &:hover {
      color: red;
      animation-play-state: paused !important;
      z-index: 150;
    }
  }
  .top-item {
    z-index: 100;
  }
  .barrage-main {
    /* border: 2px solid blue; */
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    // background: #000;
  }
  .barrage-main-dm {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
.self-dm {
  border: 2px solid #87ceeb;
  box-sizing: border-box;
}
@keyframes barrage-run {
  0% {
    // transform: translate3d(500px, 0, 0);
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes barrage-fade {
  0% {
    visibility: visible;
    // opacity: 1;
  }
  100% {
    visibility: hidden;
    // opacity: 0;
  }
}
.ani-pause {
  & div {
    animation-play-state: paused !important;
  }
}
.ani-running {
  & div {
    animation-play-state: running !important;
  }
}
</style>

<template>
  <div id="ranking">
    <p class="ranking-title">本周课程排行</p>
    <div class="content">
      <div class="content-item">
        <ranking-card ref="ranking" :list="rankingData.list" :pages="rankingData.pages" @changePage="changeRankingPage">
          热门排行TOP50
          <span>HOT</span>
        </ranking-card>
      </div>
      <div class="content-item">
        <ranking-card :list="newData.list" :pages="newData.pages" @changePage="changeNewPage">
          新课排行
          <span>NEW</span>
        </ranking-card>
      </div>
      <div class="content-item">
        <ranking-card :list="starData.list" :pages="starData.pages" @changePage="changeStarPage">
          最多收藏TOP50
          <span>STAR</span>
        </ranking-card>
      </div>
    </div>
  </div>
</template>

<script>
import MiniCard from "@/components/common/MiniCard";
import RankingCard from "@/components/content/main/home/ranking/RankingCard/RankingCard";

export default {
  name: "Ranking",
  components: {
    RankingCard,
    MiniCard
  },
  data() {
    return {
      rankingData: {
        pages: 0,
        list: []
      },
      newData: {
        pages: 0,
        list: []
      },
      starData: {
        pages: 0,
        list: []
      }
    }
  },
  methods: {
    getRanking(current, size) {
      this.$api.course.getRanking(current, size)
          .then(res => {
            this.rankingData.list = res.data.list
            this.rankingData.pages = res.data.pages
          })
    },
    getNew(current, size) {
      this.$api.course.getNew(current, size)
      .then(res => {
        this.newData.list = res.data.list
        this.newData.pages = res.data.pages
      })
    },
    getStar(current, size) {
      this.$api.course.getStar(current, size)
      .then(res => {
        this.starData.list = res.data.list
        this.starData.pages = res.data.pages
      })
    },
    changeRankingPage(current, size) {
      this.getRanking(current, size)
    },
    changeNewPage(current, size) {
      this.getNew(current, size)
    },
    changeStarPage(current, size) {
      this.getStar(current, size)
    }
  },
  created() {
    this.getRanking(1, 5)
    this.getNew(1, 5)
    this.getStar(1, 5)
  }
}
</script>

<style scoped>
#ranking {
  width: 1200px;
}

.ranking-title {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 5px;
}

.content {
  width: 1200px;
  display: flex;
}

.content-item{
  flex: 1;
}
</style>

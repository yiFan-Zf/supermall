<template>
  <div id="home">
    <nav-bar class="home-bar">
      <template v-slot:center> 购物车 </template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control1"
      @tabClick="tabClick"
      ref="TabControl1"
      :class="{ fixed: isTabFixed }"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      @scroll="contontScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="TabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 子组件
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 网络组件
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    // 先刷新图片，再滚动
    this.$refs.scroll.refresh();

    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  // deactivated() {
  //   this.saveY = this.$refs.scroll.getScrollY();
  // },
  beforeRouteLeave(to, from, next) {
    this.saveY = this.$refs.scroll.getScrollY();
    next();
  },
  mounted() {
    // 监听item图片加载完成 解决滚动卡顿bug 在每一次图片加载完成后调用refresh方法，更新scrollerHeight的值
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImageLoad", () => {
      //   // console.log(this.$refs.scroll);
      // this.$refs.scroll && this.$refs.scroll.refresh();
      refresh();
    });
    /*防抖函数起作用的过程：
    如果我们直接执行refresh，那么refresh函数会被执行30次
    可以将refresh函数传入到debounce函数中，生成一个新得函数
    之后再调用非常频繁的时候，就使用新生成的函数
    而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将撒谎给你一次取消掉
    */
  },
  methods: {
    /* 事件监听相关方法 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contontScroll(position) {
      // 1、判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000;
      // if (Math.abs(position.y) > 1000) {
      //   this.isShowBackTop = true;
      // } else {
      //   this.isShowBackTop = false;
      // }
      // 2、决定tabCcontrol是否吸顶
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },
    loadMore() {
      console.log("加载更多");
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop;
      console.log(this.$refs.TabControl2.$el.offsetTop);
    },

    /* 网络请求相关方法 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 请求轮播图数据
        this.banners = res.data.banner.list;
        // 请求推荐信息数据
        this.recommends = res.data.recommend.list;
        // for (let i of this.banners) {
        //   console.log(i.image);
        // }
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
        // this.$refs.scroll.scroll.refresh();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-bar {
  background-color: var(--color-tint);
  /* position: fixed;
  top: 0;
  right: 0;
  left: 0; */
  /* z-index: 9;
  position: sticky;
  top: 0px; */
}
/* 使用better-scroll后吸顶效果失效 */
/* .tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
} */
.tab-control1 {
  position: relative;
  z-index: 9;
}
.fixed {
  position: relative;
  z-index: 9;
}
.scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  height: calc(100vh - 93px);
  /* background-color: pink; */
  overflow: hidden;
}
</style>
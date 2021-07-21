<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-params-info
        ref="params"
        :params-info="paramsInfo"
      ></detail-params-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DeatilSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { itemListenerMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  // 组件名称
  name: "Detail",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
  },
  mixins: [itemListenerMixin],
  // 组件状态值
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    imageLoad() {
      // console.log("图片刷新了");
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // console.log(this.$route.params.iid);
    // console.log(this.$route.query);

    // 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取数据
      const data = res.result;
      // console.log(res);
      // 2.获取顶部的轮播数据
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 6.获取参数的信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.获取评论信息
      this.commentInfo = data.rate.list[0];
      // console.log(this.commentInfo);

      // 获取detail-nav-bar的offsetTopY数据
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM已经被渲染出来
      //   // 但是图片依然是没有加载
      //   // offsetTOP数据不对的时候，都是因为图片的问题
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });

    // 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },
  activated() {
    // 先刷新图片，再滚动
    this.$refs.scroll.refresh();
  },
  mounted() {},
  destroyed() {
    // 在离开的时候取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script> 

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px);
}
</style>

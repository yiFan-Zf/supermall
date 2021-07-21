<template>
  <div v-if="Object.keys(detailInfo).lenght != 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "DetailGoodsInfo",
  // 组件参数 接收来自父组件的数据
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  // 计算属性
  computed: {},
  // 组件方法
  methods: {
    imgLoad() {
      // 判断，所有的图片都加载完了，那么进行一次回调就可以了
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
};
</script> 

<style scoped>
.goods-info {
  padding: 20px 0;
}
.info-desc {
  font-size: 12px;
  padding: 0 8px;
}
.info-key {
  padding: 8px;
}
.info-list img {
  width: 100%;
}
</style>

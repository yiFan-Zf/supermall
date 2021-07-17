<template>
  <div v-if="Object.keys(goods).length != 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "DetailBaseInfo",
  // 组件参数 接收来自父组件的数据
  props: {
    goods: {
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
    return {};
  },
};
</script> 

<style scoped>
.base-info {
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
  font-weight: 700;
  padding: 15px 0;
}
.n-price {
  color: var(--color-high-text);
  font-size: 24px;
  font-weight: 700;
}
.o-price {
  font-size: 13px;
  text-decoration: line-through;
  margin: 0 5px;
}
.discount {
  font-size: 12px;
  position: relative;
  top: -10px;
  background-color: var(--color-high-text);
  border-radius: 10px;
  color: #fff;
  padding: 3px;
}
.info-other {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-service img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>

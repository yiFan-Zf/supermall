<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      if (this.$route.path.indexOf("/home") != -1) {
        this.$bus.$emit("itemImageLoad");
      } else if (this.$route.path.indexOf("/detail") != -1) {
        this.$bus.$emit("detailItemImgLoad");
      }
    },
    itemClick() {
      // this.$router.push({
      //   path: "/detail",
      //   query: this.goodsItem.iid,
      // });
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
};
</script>

<style scoped>
.goods-item {
  position: relative;
  width: 50%;
  box-sizing: border-box;
  padding: 5px 5px 40px 5px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
  padding: 0 5px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  /* background-position: 0; */
  /* background-size: 14px; */
  /* background-size: cover; */
}
</style>
import { debounce } from "common/utils.js";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    // 监听item图片加载完成 解决滚动卡顿bug 在每一次图片加载完成后调用refresh方法，更新scrollerHeight的值
    const refresh = debounce(this.$refs.scroll.refresh, 50);

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      //   // console.log(this.$refs.scroll);
      // this.$refs.scroll && this.$refs.scroll.refresh();
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    console.log('混进去啦');
  }
}

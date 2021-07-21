<template>
  <div class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>
    <div class="info-content" v-if="Object.keys(commentInfo).length != 0">
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="" />
        <span class="name">{{ commentInfo.user.uname }}</span>
      </div>
      <div class="comment-detail">
        <p>{{ commentInfo.content }}</p>
        <div class="info-other">
          <span class="date">{{ commentInfo.created | showDate }}</span>
          <span>{{ commentInfo.style }}</span>
        </div>
        <div class="info-imgs">
          <img
            :src="item"
            v-for="(item, index) in commentInfo.images"
            :key="index"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  // 组件名称
  name: "demo",
  // 组件参数 接收来自父组件的数据
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      // 1.将时间戳转为Date对象
      const date = new Date(value);

      // 2.将date进行格式化
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {};
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
};
</script> 

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.header-title {
  font-size: 15px;
}
.header-more {
  font-size: 13px;
}
.info-user {
  padding: 10px 0 5px;
}
.info-user img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  vertical-align: middle;
}
.info-user .name {
  /* position: relative;
  top: -15px; */
  font-size: 15px;
  margin-left: 10px;
}
.comment-detail {
  padding: 0 5px 15px;
}
.comment-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.comment-detail .date {
  margin-right: 8px;
}
.info-imgs {
  margin-top: 10px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>

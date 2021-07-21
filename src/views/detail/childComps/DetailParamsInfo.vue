<template>
  <div class="goods-params" v-if="Object.keys(paramsInfo).length">
    <div class="rules">
      <table v-if="paramsInfo.sizes && paramsInfo.sizes.length">
        <tr v-for="(tr, index) in paramsInfo.sizes[0]" :key="index">
          <td v-for="(td, index) in tr" :key="index">{{ td }}</td>
        </tr>
      </table>
    </div>
    <div class="params">
      <table>
        <tr v-for="(info, index) in paramsInfo.infos" :key="index">
          <td class="key">{{ info.key }}</td>
          <td class="value">{{ info.value }}</td>
        </tr>
      </table>
    </div>
    <div class="info-img" v-if="paramsInfo.image.length != 0">
      <img :src="paramsInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.goods-params {
  width: 100%;
  padding: 8px 8px 20px;
  border-bottom: solid 4px rgba(100, 100, 100, 0.1);
}
.rules table {
  width: 100%;
}
.rules table tr td,
.params table tr td {
  padding: 8px 16px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.params table {
  width: 100%;
}
.params table tr .key {
  width: 30%;
}
.params table tr .value {
  width: 70%;
  color: var(--color-high-text);
}
.info-img img {
  width: 100%;
}
</style>

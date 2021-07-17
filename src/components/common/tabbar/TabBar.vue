<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#tab-bar {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
  z-index: 99;
}
</style>
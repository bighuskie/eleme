<template>
  <div id="app">
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from './components/footer/tabbar/tabbar'
export default {
  name: "App",
  data() {
    return {
      seller: {}
    };
  },
  components: {
    tabbar
  }
};
</script>

<style lang="less" scoped>
</style>

<template>
  <div>
    <div class="index-wrapper">
      <router-link to="/business">Goods</router-link>
    <p>(点击查看商家详情)</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.index-wrapper {
  text-align: center;
  margin: 100px auto;
  a {
    font-size: 30px;
    font-weight: bolder;
  }
}
</style>

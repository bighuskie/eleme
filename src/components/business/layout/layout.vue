<template>
  <div id="layout">
    <top :seller="seller"></top>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/business/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/business/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/business/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script>
import top from "../../business/Header/header";
export default {
  name: "Layout",
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get("../../../../static/data.json").then(res => {
      this.seller = res.body.seller;
    });
  },
  components: {
    top
  }
};
</script>

<style lang="less" scoped>
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border: 1px solid rgba(7, 17, 27, 0.1);
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      color: rgb(77, 85, 93);
      font-size: 14px;
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>

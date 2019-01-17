<template>
  <div>
    <fixed></fixed>
    <div class="layout" ref="layoutWrapper">
      <div>
        <per-head></per-head>
        <money></money>
        <list></list>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Fixed from "../fixed/fixed";
import perHead from "../login/login";
import Money from "../money/money";
import List from "../menu/menu";
export default {
  data() {
    return {
    };
  },
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    /**
     * better-scroll插件
     */
    _initScroll() {
      this.layoutScroll = new BScroll(this.$refs.layoutWrapper, {
        click: true
      });
      this.layoutScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    }
  },
  components: {
    Fixed,
    perHead,
    Money,
    List
  }
};
</script>

<style lang="less" scoped>
body {
  .layout {
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 50px;
    width: 100%;
    background-color: rgb(250, 250, 250);
    overflow: hidden;
  }
}
</style>

<template>
    <div id="carcontrol">
        <div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCount"></div>
        <div class="count" v-show="food.count>0">{{food.count}}</div>
        <div class="add icon-add_circle" @click.stop="addCount"></div>
    </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    /**
     * 当前购买的食物（购物操作时）
     */
    food: {
      type: Object, //引用类型的props会改变原来的数据
      default() {
        return {};
      }
    }
  },
  methods: {
    addCount() {
      /**
       * better-scroll要初始化点击事件才可以运行此段代码
       */
      if (!this.food.count) {
        //直接赋值给count时，数据不是响应式的，所以相应逻辑不会发生，需要通过api设置响应式数据
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      //向父组件传递触发点击事件的元素
      this.$emit("carAdd", event.target);
    },
    decreaseCount() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/less/style.less");
#carcontrol {
  font-size: 0;
  .decrease,
  .add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    width: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
  .count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
}
</style>

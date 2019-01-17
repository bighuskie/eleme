<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" @click="select(2)" :class="{'active':sType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span> </span>
            <span class="block positive" @click="select(0)" :class="{'active':sType === 0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
            <span class="block negative" @click="select(1)" :class="{'active':sType === 1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
        </div>
        <div @click="toggleContent"  class="switch" :class="{'on':oContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
  </div>

    
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  data() {
    return {
      sType: this.selectType,
      oContent: this.onlyContent
    };
  },
  methods: {
    select(type) {
      this.sType = type;
      //向父组件传递数据
      this.$emit("incrementType", this.sType);
    },
    toggleContent() {
      this.oContent = !this.oContent;
      this.$emit("incrementContent", this.oContent);
    }
  },
  computed: {
    positive() {
      return this.ratings.filter(item => {
        return item.rateType === POSITIVE;
      });
    },
    negative() {
      return this.ratings.filter(item => {
        return item.rateType === NEGATIVE;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/less/style.less");
.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      line-height: 16px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      &.active {
        color: #fff;
      }
      .count {
        font-size: 8px;
        margin-left: 2px;
      }
      &.positive {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      &.negative {
        background-color: rgba(77, 85, 93, 0.2);
        &.active {
          background-color: rgb(77, 85, 93);
        }
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(157, 153, 159);
    &.on .icon-check_circle {
      color: #00c850;
    }
    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      margin-right: 4px;
      font-size: 24px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
    }
  }
}
</style>

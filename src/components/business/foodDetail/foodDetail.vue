<template>
  <!-- transition只能直接包围定义动画的容器，不可以包围定义动画的容器的父容器，否则无效果，巨坑 -->
  <transition name="fade">
    <div id="foodDetail" v-show="showFlag" ref="foodDetail">
      <div class="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="detailFood.image" alt="">
            <div class="back" @click="goBack">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{detailFood.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{detailFood.sellCount}}份</span>
              <span class="rating">好评率{{detailFood.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{detailFood.price}}</span>
              <span class="old" v-show="detailFood.oldPrice">￥{{detailFood.oldPrice}}</span>
            </div>
            <div class="carcontrol-wrapper">
              <car-control :food="detailFood"></car-control>
            </div>
            <transition name="fade">
              <div
                class="buy"
                v-show="detailFood.count === 0 || !detailFood.count"
                @click.stop.prevent="addShopCar"
              >加入购物车</div>
            </transition>
          </div>
        </div>
        <split v-show="detailFood.info"></split>
        <div class="info" v-show="detailFood.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{detailFood.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <!-- ratingselect组件 -->
          <rating-select
            :selectType="selectType"
            :onlyContent=" onlyContent"
            :desc="desc"
            :ratings="detailFood.ratings"
            @incrementType="incrementType"
            @incrementContent="incrementContent"
          ></rating-select>
          <!-- 评价列表-->
          <div class="rating-wrapper">
            <ul v-show="detailFood.ratings && detailFood.ratings.length">
              <li
                v-for="(rating,i) in detailFood.ratings"
                :key="i"
                class="rating-item"
                v-show="selectRating(rating.rateType,rating.text)"
              >
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" height="12" width="12" :src="rating.avatar" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span
                    :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"
                  ></span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="!detailFood.ratings || !detailFood.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import carControl from "../carcontrol/carcontrol";
import split from "../split/split";
import ratingSelect from "../ratingSelect/ratingselect";
import { formatDate } from "../../../assets/js/formatDate.js";
import Vue from "vue";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    //接收传入的food,此时的food是被选中点开详情页的那个food
    detailFood: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        //desc做了改变
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    //在goods组件中被调用
    showDetail() {
      this.showFlag = true;
      this.selectType = ALL;
      this.$nextTick(() => {
        if (!this.scroll) {
          /**
           * better-scroll坑很大，父元素的内容层必须只有一个，否则无效
           */
          this.scroll = new BScroll(this.$refs.foodDetail, { click: true });
        } else {
          this.scroll.refresh();
        }
      });
    },
    goBack() {
      this.showFlag = false;
    },
    //第一次加入购物车
    addShopCar(event) {
      this.$emit("carAdd", event.target);
      Vue.set(this.detailFood, "count", 1);
    },
    //给子组件ratingselect传递的函数进行父子通信
    incrementType(type) {
      this.selectType = type;
      this.$nextTick(() => {
        // 当我们改变数据的时候，DOM的更新是异步的
        this.scroll.refresh();
      });
    },
    incrementContent(content) {
      this.onlyContent = content;
      this.$nextTick(() => {
        // 当我们改变数据的时候，DOM的更新是异步的
        this.scroll.refresh();
      });
    },
    //选择查看评论类型
    selectRating(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  components: {
    carControl,
    split,
    ratingSelect
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/less/style.less");

#foodDetail {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  z-index: 30;
  background: #ffffff;
  overflow: hidden;
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.3s ease;
    transform: translate3d(0, 0, 0);
  }
  &.fade-enter,
  &.fade-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  .food {
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700px;
        color: rgb(7, 17, 27);
      }
      .detail {
        margin-bottom: 18px;
        height: 10px;
        line-height: 10px;
        font-size: 0;
        .sell-count,
        .rating {
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        line-height: 24px;
        font-weight: 700;
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          color: rgb(147, 153, 159);
          font-size: 10px;
        }
      }
      .carcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10; // 要盖住加减号组件
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 10px;
        border-radius: 10px;
        color: #ffffff;
        background: rgb(0, 160, 220);
        &.fade-enter-active,
        &.fade-leave-active {
          transition: all 0.2s;
          opacity: 1;
        }
        &.fade-enter,
        &fade-leave-active {
          opacity: 0;
        }
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 16px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        line-height: 24px;
        padding: 0 8px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .name {
              display: inline-block;
              vertical-align: top;
              font-size: 10px;
              color: rgb(147, 153, 159);
              margin-right: 6px;
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            .icon-thumb_up,
            .icon-thumb_down {
              margin-right: 4px;
              line-height: 16px;
              font-size: 12px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              color: rgb(147, 153, 159);
            }
          }
        }
        .no-ratings {
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>

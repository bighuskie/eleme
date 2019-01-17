<template>
  <div id="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt>
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <Star :size="48" :score="seller.score"></Star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,i) in seller.supports" :key="i">
              <span :class="classMap[seller.supports[i].type]" class="icon"></span>
              <span class="text">{{seller.supports[i].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="showDetail">
        <span class="icon-close"></span>
      </div>
    </div>
    <div class="back-wrapper" @click="goBack">
      <i class="icon-arrow_lift"></i>
    </div>
  </div>
</template>

<script>
import Star from "../../business/star/star";
export default {
  name: "App",
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = !this.detailShow;
    },
    goBack() {
      this.$router.push('/takeout');
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  components: {
    Star
  }
};
</script>

<style lang="less" scoped>
@import "../../../../src/assets/less/style";
@import "../../../../src/assets/less/mixin";

#header {
  position: relative;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      font-size: 14px;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          .bg-image("../../../assets/img/brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
      }
      .description {
        font-size: 12px;
        color: rgb(255, 255, 255);
        line-height: 12px;
        margin-bottom: 10px;
      }
      .support {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image("../../../assets/img/decrease_1");
          }
          &.discount {
            .bg-image("../../../assets/img/discount_1");
          }
          &.guarantee {
            .bg-image("../../../assets/img/guarantee_1");
          }
          &.invoice {
            .bg-image("../../../assets/img/invoice_1");
          }
          &.special {
            .bg-image("../../../assets/img/special_1");
          }
        }
        .text {
          vertical-align: top;
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      // line-height: 24px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        line-height: 24px;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        margin-left: 4px;
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7, 17, 27, 0.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      .bg-image("../../../assets/img/bulletin");
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      vertical-align: top;
      font-size: 10px;
      margin: 0 4px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      top: 10px;
      right: 12px;
      font-size: 10px;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, 0.8);
    overflow: auto;
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          padding: 2px 0;
          margin-top: 16px;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-right: 6px;
              vertical-align: top;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                .bg-image("../../../assets/img/decrease_2");
              }
              &.discount {
                .bg-image("../../../assets/img/discount_2");
              }
              &.guarantee {
                .bg-image("../../../assets/img/guarantee_2");
              }
              &.invoice {
                .bg-image("../../../assets/img/invoice_2");
              }
              &.special {
                .bg-image("../../../assets/img/special_2");
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }
    .clearfix {
      display: inline-block;
      &:after {
        content: ".";
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .back-wrapper {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    font-size: 12px;
    color: #fff;
  }
}
</style>


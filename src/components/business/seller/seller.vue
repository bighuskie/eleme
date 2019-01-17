<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="favorite">
          <i class="icon-favorite" :class="{'active':favorite}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic.id">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title">商家信息</div>
        <ul>
          <li class="info-item" v-for="info in seller.infos" :key="info.id">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import star from "../star/star";
import split from "../split/split";
export default {
  name: "seller",
  props: {
    seller: {
      //异步获取，需要检测它的存在才可以执行相应的逻辑
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      favorite: false
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  mounted() {
    this._initSellerScroll();
    this._initPics();
  },
  methods: {
    _initSellerScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, { click: true });
      } else {
        this.scroll.refresh();
      }
    },
    _initPics() {
      //通过给ul设置宽度使better-scorll初始化
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + "px";
        if (!this.picScroll) {
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true, //表示横向滚动
              eventPassthrough: "vertical" //横向滚动图片的时候就忽略垂直方向的滚动
            });
          });
        } else {
          this.picScroll.refresh();
        }
      }
    }
  },
  computed: {
    favoriteText() {
      return this.favorite === true ? "已收藏" : "未收藏";
    }
  },
  watch: {
    seller() {
      //监测seller的变化来初始化better-scroll
      this._initSellerScroll();
      this._initPics();
    }
  },
  components: {
    star,
    split
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/less/mixin.less");
@import url("../../../assets/less/style.less");
.seller {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    padding: 18px;
    position: relative;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .desc {
      padding-bottom: 18px;
      font-size: 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .star {
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        margin-right: 12px;
        line-height: 18px; // 不能为父元素设置line-heigth，要不然组件会被撑高
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child {
          border: none;
        }
        h2 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 149);
        }
        .content {
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);
          .stress {
            font-size: 24px;
          }
        }
      }
    }
    .favorite{
      position: absolute;
      right: 11px;
      top: 18px;
      width: 50px ;/* 设定宽度改变样式的时候就不会发生偏移*/
      text-align :center;
      .icon-favorite{
        display :block;
        margin-bottom: 4px;
        line-height :24px;
        font-size: 24px;
        width :50px;
        color: #d4d6d9;
        &.active{
          color: rgb(240,20,20);
        }
      }
      .text{
        line-height :10px;
        font-size :10px;
        color: rgb(77,85,93) ;
        }
      }

  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
    .supports{
      .support-item{
        padding: 16px 12px;
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child{
          border:none;
        }
        .icon{
          display :inline-block;
          width :16px;
          height :16px;
          vertical-align: top;
          margin-right :6px;
          background-size :16px 16px;
          background-repeat :no-repeat;
          &.decrease{
            .bg-image('../../../assets/img/decrease_4')}
          &.discount{
            .bg-image('../../../assets/img/discount_4')}
          &.guarantee{
            .bg-image('../../../assets/img/guarantee_4')}
          &.invoice{
            .bg-image('../../../assets/img/invoice_4')}
          &.special{
            .bg-image('../../../assets/img/special_4')}
        }
        .text{
          display: inline-block;
          font-size: 12px;
          line-height: 16px;
          color :rgb(7, 17, 27);
        }
      }
    }
  }
  .pics{
    padding :18px;
    .title{
      margin-bottom: 12px;
      line-height :14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .pic-wrapper{
      width :100%;
      overflow :hidden;
      white-space :nowrap ;/*不产生折行*/
      .pic-list{
        font-size: 0;
        .pic-item{
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child{
            margin :0;
          }
        }
      }
    }
  }
  .info{
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
    .title{
      padding-bottom: 12px;
      line-height: 14px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 14px;
    }
    .info-item{
      padding: 16px 12px;
      line-height: 16px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &:last-child{
        border: none;
      }
    }
  }
}
</style>

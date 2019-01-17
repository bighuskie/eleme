<template>
    <div>
      <div id="shopCar">
          <div class="content" @click="toggleList">
              <div class="content-left">
                  <div class="logo-wrapper">
                      <div class="logo" :class="{'highlight':totalCount>0}">
                          <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
                      </div>
                      <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                  </div>
                  <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                  <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
              </div>
              <div class="content-right" :class="payClass" @click.stop="pay">{{payDesc}}</div>
          </div>
          <div class="ball-container">
            <transition-group tag="div"
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter">
              <div class="ball" v-for="ball in balls" :key="ball.index"  v-show="ball.ballFlag"></div>
            </transition-group>
          </div>
          <transition  name="shopcar">
            <div class="shopcar-list" v-show="listShow" :key="shopcarList">
              <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
              </div>
              <div class="list-content" ref="listContent">
                <ul>
                  <li class="selectedfood" v-for="(selected,i) in selectFood" :key="i">
                    <span class="name">{{selected.name}}</span>
                    <div class="price">
                      <span>￥{{selected.price*selected.count}}</span>
                    </div>
                    <div class="carcontrol-wrapper">
                      <car-control :selected="selected"></car-control>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
      </div>
      <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
      </transition>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import carControl from "../carcontrol/carcontrol";
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    /**
     * 购买的所有食物
     */
    selectFood: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      balls: [
        { ballFlag: false,index:1 },
        { ballFlag: false,index:2 },
        { ballFlag: false,index:3 },
        { ballFlag: false,index:4 },
        { ballFlag: false,index:5 }
      ],
      dropBall: [],
      fold: true,
      shopcarList: "shopcarList"
    };
  },
  computed: {
    /**
     * 以下都是根据购买食物的状态进行样式切换
     */
    totalPrice() {
      let totalPrice = 0;
      this.selectFood.forEach(item => {
        totalPrice += item.price * item.count;
      });
      return totalPrice;
    },
    totalCount() {
      let totalCount = 0;
      this.selectFood.forEach(item => {
        totalCount += item.count;
      });
      return totalCount;
    },
    //根据金额确定结算内容
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let balance = this.minPrice - this.totalPrice;
        return `还差￥${balance}元起送`;
      } else {
        return "去结算";
      }
    },
    //根据金额确定结算内容
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        //购物车详情的滚动
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, { click: true });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    //供goods父组件调用的函数,得到传递进来的carcontrol的购买商品按钮的触发元素target
    drop(target) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.ballFlag) {
          ball.target = target;
          ball.ballFlag = true;
          this.dropBall.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.ballFlag) {
          let rect = ball.target.getBoundingClientRect();
          let xdist = rect.left - 32;
          let ydist = -(window.innerHeight - rect.top - 22);
          // el.style.display = "";
          el.style.backgroundColor = "blue";
          //     // el.style.transform = `translate(0,${ydist}px)`;
        }
      }
    },
    enter(el, done) {
      el.offsetWidth; //需要DOM重绘才可以触发
      el.style.display = "";
      el.style.backgroundColor = "pink";
      // // el.style.transform = 'translate3d(0,0,0)';
      el.style.transition = "all 1s ease";
      // console.log(el);
      done();
    },
    afterEnter(el) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.ballFlag = false;
        // el.style.display = "";
      }
    },
    //购物车详情的展开
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    //清空购物车
    empty() {
      this.selectFood.forEach(item => {
        //购物车所有操作都是基于食物的数量，所以改变食物数量将会改变所有组件
        item.count = 0;
      });
    },
    //隐藏list-mask
    hideList() {
      this.fold = true;
    },
    //支付事件
    pay(){
      if(this.totalPrice<this.minPrice){
        return;
      }
      alert(`你支付了${this.totalPrice}元`)
    }
  },
  components: {
    carControl
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/less/style.less");
#shopCar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background-color: #141d27;
    font-size: 0;
    .content-left {
      flex: 1;
      display: inline-block;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background-color: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2b343c;
          text-align: center;
          &.highlight {
            background-color: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        box-sizing: border-box;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        margin-left: 12px;
        line-height: 48px;
        font-weight: 700;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      line-height: 48px;
      height: 48px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
      font-weight: 700;
      background-color: #2b343c;
      &.not-enough {
        background-color: #2b343c;
      }
      &.enough {
        background-color: #00b43c;
        color: #fff;
      }
    }
  }
  .ball-container {
    .ball {
      // position: fixed;
      // z-index: 300;
      // left: 32px;
      // bottom: 22px;
      width: 15px;
      height: 15px;
      background-color: red;
    }
  }
  .shopcar-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
    &.shopcar-enter-active,
    &.shopcar-leave-active {
      transition: all 0.5s ease;
      transform: translate3d(
        0,
        -100%,
        0
      ); //每个表项相对于当前自身的高度做一个偏移
    }
    &.shopcar-enter,
    &.shopcar-leave-active {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #ffffff;
      .selectedfood {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .carcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  filter: blur(10px);
  opacity: 1;
  background-color: rgba(7, 17, 27, 0.6);
  //动画代码有顺序问题，这是个巨坑
  &.fade-enter-active,
  &.fade-leave-active {
    opacity: 1;
    transition: all 0.5s ease; //设置缓动效果
    background: rgba(7, 17, 27, 0.6);
  }
  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>


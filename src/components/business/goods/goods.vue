<template>
  <div>
    <div id="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul @click="_calculateHeight">
        <li
          v-for="(item,i) in goods"
          :key="i"
          class="menu-item"
          :class="{'current':currentIndex===i}"
          @click="selected(i)"
        >
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="foods-list food-list-hook" v-for="(item,i) in goods" :key="i">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,i) in item.foods" :key="i" class="food-item" @click="foodDetail(food)">
              <div class="icon">
                <img :src="food.icon" alt>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="carcontrol">
                  <car-control :food="food" @carAdd="carAdd"></car-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-car
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      :selectFood="selectFood"
      ref="shopCar"
    ></shop-car>
    <food-detail :detailFood="detailFood" ref="foodDetail"></food-detail>
  </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopCar from "../shopCar/shopCar";
import carControl from "../carcontrol/carcontrol";
import foodDetail from "../foodDetail/foodDetail";
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
      goods: [],
      listHeight: [],
      scrollY: 0,
      detailFood: {}
    };
  },
  created() {
    //设置样式类名的集合
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$http.get("../../../../static/data.json").then(res => {
      this.goods = res.body.goods;
    });
    //异步操作的API
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  mounted() {
    this._calculateHeight();
  },
  computed: {
    //计算当前滚动的menu索引
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if ((this.scrollY >= height1 && this.scrollY < height2) || !height2) {
          return i;
        }
      }
      return 0;
    },
    //计算当前选中的食物
    selectFood() {
      let selectFood = [];
      this.goods.forEach(goods => {
        goods.foods.forEach(food => {
          if (food.count) {
            selectFood.push(food);
          }
        });
      });
      return selectFood;
    }
  },
  methods: {
    /**
     * better-scroll插件
     */
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true //允许点击事件发生
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    /**
     * Vue中动态创建元素，通过ref得到元素是异步的,需要通过定时器可以得到数据
     */
    _calculateHeight() {
      setTimeout(() => {
        let foodList = this.$refs.foodWrapper.getElementsByClassName(
          "food-list-hook"
        );
        var height = 0;
        this.listHeight.push(height);
        for (var j = 0; j < foodList.length; j++) {
          var item = foodList[j];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }, 20);
    },
    selected(index) {
      /**
       * better-scroll插件来实现点击滚动界面
       */
      let foodList = this.$refs.foodWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 200);
    },
    //得到carcontrol中购买商品按钮的触发元素target
    _drop(target) {
      this.$refs.shopCar.drop(target);
    },
    //传递给子组件的方法
    carAdd(target) {
      //调用方法传递target给shopCar组件
      this._drop(target);
    },
    //给商品详情页传数据
    foodDetail(food) {
      this.detailFood = food;
      //调用子组件的showDetail方法
      this.$refs.foodDetail.showDetail();
    }
  },
  components: {
    shopCar,
    carControl,
    foodDetail
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/mixin.less";
#goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      width: 56px;
      height: 54px;
      padding: 0 12px;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 10;
        margin-right: -1px;
        background-color: #fff;
        font-weight: 700;
        .text {
          border: none;
        }
      }
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        vertical-align: top;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          .bg-image("../../../assets/img/decrease_3");
        }
        &.discount {
          .bg-image("../../../assets/img/discount_3");
        }
        &.guarantee {
          .bg-image("../../../assets/img/guarantee_3");
        }
        &.invoice {
          .bg-image("../../../assets/img/invoice_3");
        }
        &.special {
          .bg-image("../../../assets/img/special_3");
        }
      }
      .text {
        display: table-cell;
        vertical-align: middle;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 12px;
        width: 56px;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      background-color: #f3f5f7;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
        img {
          width: 57px;
          height: 57px;
        }
      }
      .content {
        flex: 1;
        position: relative;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          margin-bottom: 8px;
          line-height: 12px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 10px;
            font-weight: bold;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            vertical-align: middle;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .carcontrol {
          position: absolute;
          right: 0;
          bottom: -5px;
        }
      }
    }
  }
}
</style>

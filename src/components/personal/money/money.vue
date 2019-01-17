<template>
  <div>
    <div class="money-wrapper">
      <ul>
        <li class="wallet-wrapper">
          <p class="number" v-if="loginFlag">0.00
            <span>元</span>
          </p>
          <p class="icon-qian" v-else></p>
          <p class="text">钱包</p>
        </li>
        <li class="red-paper-wrapper">
          <p class="number" v-if="loginFlag">0
            <span>个</span>
          </p>
          <p class="icon-hongbao" v-else></p>
          <p class="text">红包</p>
        </li>
        <li class="gold-wrapper">
          <p class="number" v-if="loginFlag">0
            <span>个</span>
          </p>
          <p class="icon-jinbi" v-else></p>
          <p class="text">金币</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFlag: 0
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/less/style.less");
.money-wrapper {
  ul {
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    .wallet-wrapper,
    .red-paper-wrapper,
    .gold-wrapper {
      flex-grow: 1;
      height: 100%;
      text-align: center;
      font-size: 0;
      .icon-qian,
      .icon-hongbao,
      .icon-jinbi,
      .number {
        height: 40px;
        margin-top: 5px;
        line-height: 40px;
        font-size: 25px;
        span {
          font-size: 12px;
        }
      }
      .text {
        font-size: 12px;
        color: rgb(43, 42, 42);
      }
    }
    .wallet-wrapper {
      .icon-qian ,.number{
        color: rgb(17, 109, 230);
      }
    }
    .red-paper-wrapper {
      border: 1px solid #eee;
      border-bottom: none;
      border-top: none;
      .icon-hongbao,.number {
        color: red;
      }
    }
    .gold-wrapper {
      .icon-jinbi ,.number{
        color: rgb(253, 222, 44);
      }
    }
  }
}
</style>

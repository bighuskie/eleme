<template>
  <div class="order-wrapper">
    <div class="unLogin-wrapper">
      <div class="img-wrapper"></div>
      <div class="tip-wrapper">
        <p class="text">登录后查看外卖订单</p>
        <router-link to="/login">
          <button>立即登录</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.order-wrapper {
  position: absolute;
  top: 0;
  bottom: 45px;
  left: 0;
  width: 100%;
  overflow: hidden;
  .unLogin-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .img-wrapper {
      width: 180px;
      height: 180px;
      background-image: url("../../../assets/img/bg_img.jpg");
      background-size: contain;
    }
    .tip-wrapper {
      width: 100%;
      height: 100px;
      text-align: center;
      .text{
          line-height: 50px;
          letter-spacing: 1px;
          color: rgb(97, 96, 96);
      }
      button{
          width: 100px;
          height: 40px;
          border: none;
          border-radius: 1px;
          background-color: rgb(39, 202, 66);
          font-size: 16px;
          color: #fff;
      }
    }
  }
}
</style>

<template>
  <div>
    <div v-if="loginFlag">
      <div class="head-wrapper">
        <div class="login-wrapper">
          <div class="logo">
            <img src="../../../assets/img/brand@3x.png" alt srcset>
          </div>
          <div class="login-tip">
            <p class="unlogin">立即登录</p>
            <p class="unlogin-tip">登录后可享受更多特权</p>
          </div>
          <div class="icon">
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-link to="/login">
        <div class="head-wrapper">
          <div class="login-wrapper">
            <div class="logo">
              <i class="icon-edge"></i>
            </div>
            <div class="login-tip">
              <p class="unlogin">立即登录</p>
              <p class="unlogin-tip">登录后可享受更多特权</p>
            </div>
            <div class="icon">
              <i class="icon-keyboard_arrow_right"></i>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFlag: 0
    };
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import url("../../../assets/less/style.less");
@theme-color: rgb(0, 160, 220);
.head-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 0 20px 15px 20px;
  box-sizing: border-box;
  background-color: @theme-color;
  .login-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    .logo {
      flex-basis: 70px;
      height: 70px;
      margin-right: 20px;
      border-radius: 50%;
      text-align: center;
      background-color: rgb(123, 228, 241);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .icon-edge {
        line-height: 70px;
        font-size: 40px;
        color: #fff;
      }
    }
    .login-tip {
      flex-grow: 1;
      height: 70px;
      letter-spacing: 2px;
      .unlogin {
        line-height: 45px;
        font-size: 18px;
        color: #fff;
      }
      .unlogin-tip {
        font-size: 12px;
        color: #fff;
      }
    }
    .icon {
      flex-basis: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>

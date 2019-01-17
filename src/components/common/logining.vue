<template>
  <div>
    <header>
      <div class="head-wrapper">
        <div class="back-wrapper" @click="goBack">
          <i class="icon-arrow_lift"></i>
        </div>
        <div class="login-wrapper">
          <p class="text">登录</p>
        </div>
        <router-link to="/passwordLogin">
          <div class="password-wrapper">
            <p class="text">密码登录</p>
          </div>
        </router-link>
      </div>
    </header>
    <div class="form-wrapper">
      <form action="#">
        <label for>
          <input type="text" maxlength="11" class="tellphone" placeholder="手机号">
        </label>
        <label for>
          <input type="text" class="identifying" placeholder="验证码">
        </label>
        <div class="getIdentifying">获取验证码</div>
        <div class="tip-wrapper">
          温馨提示：未注册饿了么账号的手机号，登录时将自动注册，且代表你以同意
          <span>《用户服务协议》</span>
        </div>
        <div class="button-wrapper">
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/less/style.less");
@import url("../../assets/less/mixin.less");
header {
  .fixed-wrapper(@theme-color);
  .head-wrapper {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    .back-wrapper {
      flex-basis: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      color: #fff;
    }
    .login-wrapper {
      flex-grow: 1;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      font-weight: bolder;
      color: #fff;
    }
    .password-wrapper {
      line-height: 50px;
      font-size: 17px;
      font-weight: bolder;
      color: #fff;
    }
  }
}
.form-wrapper {
  width: 100%;
  margin-top: 60px;
  form {
    position: relative;
    width: 100%;
    input {
      width: 100%;
      height: 45px;
      line-height: 45px;
      padding: 0 10px;
      box-sizing: border-box;
      border-top: 1px solid #eee;
    }
    .identifying {
      border-bottom: 1px solid #eee;
    }
    .getIdentifying {
      position: absolute;
      top: 5px;
      right: 10px;
      width: 100px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      color: #fff;
      background-color: rgb(204, 204, 204);
    }
    .tip-wrapper {
      box-sizing: border-box;
      padding: 15px 10px 0 10px;
      line-height: 20px;
      color: #333;
      span {
        color: @theme-color;
      }
    }
    .button-wrapper {
      width: 100%;
      box-sizing: border-box;
      margin-top: 20px;
      padding: 0 10px;
      button {
        width: 100%;
        height: 45px;
        border: none;
        border-radius: 1px;
        background-color: rgb(39, 202, 66);
        font-size: 20px;
        color: #fff;
      }
    }
  }
}
</style>


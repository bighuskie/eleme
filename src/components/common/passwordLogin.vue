<template>
  <div>
    <header>
      <div class="head-wrapper">
        <div class="back-wrapper" @click="goBack">
          <i class="icon-arrow_lift"></i>
        </div>
        <div class="login-wrapper">
          <p class="text">密码登录</p>
        </div>
      </div>
    </header>
    <div class="form-wrapper">
      <form action="#">
        <label for>
          <input type="text" maxlength="11" class="tellphone" placeholder="手机号">
        </label>
        <label for>
          <input type="text" class="identifying" placeholder="密码">
        </label>
        <div class="button-wrapper">
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
    <div class="lost-password">
      <a href="#">忘记密码？</a>
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
  }
}
.form-wrapper {
  width: 100%;
  margin-top: 60px;
  form {
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
    .button-wrapper {
      width: 100%;
      box-sizing: border-box;
      margin-top: 15px;
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
.lost-password {
    width: 100%;
    height: 45px;
    line-height: 45px;
    box-sizing: border-box;
    padding: 0 10px;
    text-align: right;
  a {
    color: @theme-color;
  }
}
</style>


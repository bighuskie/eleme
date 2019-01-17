<template>
  <div>
    <div class="set-wrapper">
      <div class="set">
        <div class="personal">我的</div>
        <div class="wall"></div>
        <div class="message">
          <i class="icon-nitification"></i>
        </div>
        <div class="setup">
          <i class="icon-ic_setting"></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {};
</script>


<style lang="less" scoped>
@import url("../../../assets/less/mixin.less");
@import url("../../../assets/less/style.less");
@theme-color: rgb(0, 160, 220);
.set-wrapper {
  .fixed-wrapper(@theme-color);
  .set {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: white;
    .personal,
    .message,
    .setup {
      line-height: 50px;
      text-align: center;
    }
    .message {
      margin-right: 30px;
    }
    .wall {
      flex-grow: 1;
      background-color: red;
    }
  }
}
</style>

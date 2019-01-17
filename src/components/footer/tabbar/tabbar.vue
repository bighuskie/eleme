<template>
  <div>
    <router-view></router-view>
    <div class="tabbar-wrapper">
      <ul class="tabbar">
        <router-link to="/takeout">
          <li class="take-out">
            <div class="icon">
              <i class="icon-edge"></i>
            </div>
            <div class="text">
              <p>外卖</p>
            </div>
          </li>
        </router-link>
        <router-link to="/find">
          <li class="find">
            <div class="icon">
              <i class="icon-faxian"></i>
            </div>
            <div class="text">
              <p>发现</p>
            </div>
          </li>
        </router-link>
        <router-link to="/order">
          <li class="order">
            <div class="icon">
              <i class="icon-weibiaoti"></i>
            </div>
            <div class="text">
              <p>订单</p>
            </div>
          </li>
        </router-link>
        <router-link to="/personal">
          <li class="personal">
            <div class="icon">
              <i class="icon-wo"></i>
            </div>
            <div class="text">
              <p>我的</p>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="less" scoped>
@import url("../../../assets/less/style.less");
.tabbar-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #eee;
  background-color: rgb(250, 250, 250);
  .tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a {
      display: inline-block;
      font-size: 0;
      color: rgb(63, 59, 59);
      &.active{
        color: #008de1;
      }
      li {
        width: 50px;
        height: 45px;
        .icon {
          width: 100%;
          height: 35px;
          line-height: 35px;
          text-align: center;
          font-size: 23px;
        }
        .text {
          width: 100%;
          height: 10px;
          text-align: center;
          font-size: 10px;
        }
      }
    }
  }
}
</style>

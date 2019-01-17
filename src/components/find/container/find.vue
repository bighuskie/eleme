<template>
  <div>
    <header>发现</header>
    <section class="menu-wrapper">
      <ul>
        <router-link to>
          <li class="gold-wrapper">
            <div class="text-wrapper">
              <p class="text">金币商城</p>
              <p class="tip">0元好礼在这里</p>
            </div>
            <div class="icon-wrapper">
              <img src alt>
            </div>
          </li>
        </router-link>
        <router-link to>
          <li class="advise-wrapper">
            <div class="text-wrapper">
              <p class="text">推荐有奖</p>
              <p class="tip">10元现金拿不停</p>
            </div>
            <div class="icon-wrapper">
              <img src alt>
            </div>
          </li>
        </router-link>
        <router-link to>
          <li class="periphery-wrapper">
            <div class="text-wrapper">
              <p class="text">周边优惠</p>
              <p class="tip">领取口碑好卷</p>
            </div>
            <div class="icon-wrapper">
              <img src alt>
            </div>
          </li>
        </router-link>
        <router-link to>
          <li class="flow-wrapper">
            <div class="text-wrapper">
              <p class="text">免费流量</p>
              <p class="tip">每月最高500M</p>
            </div>
            <div class="icon-wrapper">
              <img src alt>
            </div>
          </li>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
export default {};
</script>


<style lang="less" scoped>
@import url("../../../assets/less/mixin.less");
header {
  display: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 50px;
  font-size: 18px;
}
.menu-wrapper {
  width: 100%;
  height: 140px;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    a {
      display: inline-block;
      width: 50%;
      height: 70px;
      li {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        padding: 10px 10px;
        .text-wrapper {
          flex-grow: 1;
          .text {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 2px;
          }
          .tip {
            font-size: 10px;
            line-height: 14px;
            letter-spacing: 1px;
          }
        }
        .icon-wrapper {
          flex-basis: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #000;
        }
      }
      .gold-wrapper {
        border-right: 1px solid #eee;
        .text {
          color: orange;
        }
      }
      .advise-wrapper {
        .text {
          color: @theme-color;
        }
      }
      .periphery-wrapper {
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        .text {
          color: red;
        }
      }
      .flow-wrapper {
        border-bottom: 1px solid #eee;
        .text {
          color: rgb(245, 9, 9);
        }
      }
    }
  }
}
</style>

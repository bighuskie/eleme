<template>
  <div>
    <div class="collect-wrapper">
      <div class="icon">
        <i class="icon-favorite"></i>
      </div>
      <div class="text">我的收藏</div>
    </div>
    <div class="money-wrapper">
      <ul>
        <li v-if="loginFlag">
          <div class="icon">
            <i class="icon-cardb"></i>
          </div>
          <div class="text">饿了么联名卡</div>
        </li>
        <li v-if="loginFlag">
          <div class="icon">
            <i class="icon-lihe"></i>
          </div>
          <div class="text">推荐有奖</div>
        </li>
        <li class="gold">
          <div class="icon">
            <i class="icon-jinbi"></i>
          </div>
          <div class="text">金币商城</div>
        </li>
        <li v-if="loginFlag">
          <div class="icon">
            <i class="icon-hongbao1"></i>
          </div>
          <div class="text">签到领红包</div>
        </li>
        <li v-if="loginFlag">
          <div class="icon">
            <i class="icon-chengshi"></i>
          </div>
          <div class="text">城市代理申请</div>
        </li>
        <li v-if="loginFlag">
          <div class="icon">
            <i class="icon-qian"></i>
          </div>
          <div class="text">我要借款</div>
        </li>
        <li v-if="loginFlag">
          <div class="icon">
            <i class="icon-wifidianhuaqia"></i>
          </div>
          <div class="text">免费流量</div>
        </li>
        <li v-if="loginFlag">
          <div class="icon">
            <i class="icon-chazishaozi"></i>
          </div>
          <div class="text">企业订餐</div>
        </li>
        <li class="public-welfare" v-if="loginFlag">
          <div class="icon">
            <i class="icon-icon-test2"></i>
          </div>
          <div class="text">3小时公益</div>
        </li>
      </ul>
    </div>
    <div class="feedback-wrapper">
      <ul>
        <li>
          <div class="icon">
            <i class="icon-kefu"></i>
          </div>
          <div class="text">我的客服</div>
        </li>
        <li>
          <div class="icon">
            <i class="icon-shangdian"></i>
          </div>
          <div class="text">加盟合作</div>
        </li>
      </ul>
    </div>
    <div class="info-wrapper">
      <div class="text">上海拉扎斯信息科技有限公司</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginFlag: false
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/less/style.less");
@import url("../../../assets/less/mixin.less");
.collect-wrapper {
  .menu-wrapper(10px, 1px, 1px);
  background-color: #fff;
  .icon {
    .menu-icon(red);
  }
}
.money-wrapper {
  margin-top: 10px;
  ul {
    li {
      .menu-wrapper(0, 1px, 0);
      background-color: #fff;
      &:nth-child(1) {
        .icon {
          .menu-icon(rgb(17, 109, 230));
        }
      }
      &:nth-child(2) {
        .icon {
          .menu-icon(rgb(248, 155, 16));
        }
      }
      &:nth-child(3) {
        .icon {
          .menu-icon(rgb(50, 245, 24));
        }
      }
      &:nth-child(4) {
        border-top: 0;
        .icon {
          .menu-icon(rgb(240, 24, 9));
        }
      }
      &:nth-child(5) {
        .icon {
          .menu-icon(rgb(17, 109, 230));
        }
      }
      &:nth-child(6) {
        .icon {
          .menu-icon(rgb(17, 109, 230));
        }
      }
      &:nth-child(7) {
        .icon {
          .menu-icon(rgb(17, 109, 230));
        }
      }
      &:nth-child(8) {
        .icon {
          .menu-icon(rgb(17, 109, 230));
        }
      }
    }
  }
  .gold {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .icon {
      .menu-icon(rgb(50, 245, 24))!important;
    }
  }
  .public-welfare {
    border-bottom: 1px solid #eee;
    .icon {
      .menu-icon(rgb(26, 175, 6));
      font-weight: 700;
    }
  }
}
.feedback-wrapper {
  margin-top: 10px;
  ul {
    li {
      .menu-wrapper(0, 1px, 0);
      background-color: #fff;
      &:nth-child(1) {
        .icon {
          .menu-icon(rgb(17, 109, 230));
        }
      }
      &:nth-child(2) {
        border-bottom: 1px solid #eee;
        .icon {
          .menu-icon(rgb(17, 109, 230));
        }
      }
    }
  }
}
.info-wrapper {
  width: 100%;
  height: 80px;
  .text {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    color: rgb(180, 178, 178);
  }
}
</style>

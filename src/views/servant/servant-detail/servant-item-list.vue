<template>
  <div>
    <div class="servant-panel_list">
      <div class="item">
        <div class="icon">
          <img src="@/assets/images/icon_picc.png" alt="">
        </div>
        <div class="mid">
          <div class="title">院内陪诊</div>
          <div class="describe text-overflow-1">针对老人、儿童、孕妇、异地就医患者…针对老人、儿童、孕妇、异地就医患者…</div>
          <div class="sales">
            <div class="price"><span>￥</span>199元</div>
            <div class="volume">已售：1234份</div>
          </div>
        </div>
        <div class="btn">
          <button>购买</button>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="@/assets/images/icon_picc.png" alt="">
        </div>
        <div class="mid">
          <div class="title">图文问诊</div>
          <div class="describe text-overflow-1">通过图文为用户进行健康咨询…</div>
          <div class="sales">
            <div class="price"><span>￥</span>100元</div>
            <div class="volume">已售：1234份</div>
          </div>
        </div>
        <div class="btn">
          <button>购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.servant-panel_list {
  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 9px 15px 7px 9px;
    &::before {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 10px;
      right: 10px;
      height: 1px;
      border-top: 1px solid #d9f7f5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 2;
    }
    .icon {
      width: 29px;
      height: 29px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mid {
      margin: 0 12px;
      flex: 1;
      .title {
        font-size: 16px;
        color: #666;
        font-weight: bold;
      }
      .describe {
        font-size: 13px;
        color: #999;
      }
      .sales {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price {
          font-size: 15px;
          color: #FF5F5F;
          span {
            font-size: 11px;
          }
        }
        .volume {
          padding-right: 20px;
          font-size: 10px;
          color: #999
        }
      }
    }
    .btn {
      button {
        width: 50px;
        height: 22px;
        line-height: 22px;
        color: #fff;
        font-size: 15px;
        text-align: center;
        border-radius: 2px;
        background: #F8A519;
        border: 0;
      }
    }
  }
}
</style>

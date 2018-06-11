<template>
  <div>
    <!-- 服务包头部信息 -->
    <div class="package-header-info">
      <div class="icon"><img src="@/assets/images/icon_picc.png" alt=""></div>
      <div class="mid">
        <div class="name">院内陪诊院内陪诊…</div>
        <div class="sales">
          <div class="price">199<span>元</span></div>
          <div class="volume">已售：1110份</div>
        </div>
      </div>
      <div class="qrcode">
        <img src="@/assets/images/code.png" alt="">
      </div>
    </div>
    <!-- 服务人员信息 -->
    <div class="package-servant-info mgt10">
      <div class="avatar"><img src="https://img1.doubanio.com/icon/u2160581-37.jpg" alt=""></div>
      <div class="name">李时珍的皮</div>
      <div class="title">儿科 主治医师</div>
    </div>
    <!-- 服务包介绍 -->
    <div class="package-info mgt10">
      <div class="title">
        <span class="left">服务套餐介绍</span>
        <span class="right">该套餐有效期：365天</span>
      </div>
      <div class="content">
        工作于急诊，擅长消化道危急重症，比如消化道出血，溃疡，黄疸，胰腺炎，胆囊炎，腹泻腹痛，发热等。其他像呼吸道，心血管急症。
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.mgt10 {
  margin-top: 10px;
}
.package-header-info {
  background: #fff;
  padding: 20px 12px 12px;
  display: flex;
  align-items: center;
  .icon {
    width: 29px;
    height: 29px;
  }
  .mid {
    margin: 0 22px;
    flex: 1;
    .name {
      font-weight: bold;
      font-size: 18px;
      color: #666;
      font-weight: bold;
    }
    .describe {
      font-size: 13px;
      color: #999;
    }
    .sales {
      display: flex;
      align-items: baseline;
      .price {
        font-size: 24px;
        color: #FF5F5F;
        span {
          font-size: 11px;
        }
      }
      .volume {
        padding-left: 30px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .qrcode {
    width: 50px;
    height: 50px;
    border: 1px solid RGBA(62, 204, 204, .3);
    box-sizing: border-box;
  }
}

.package-servant-info {
  padding: 15px 13px;
  background: #fff;
  display: flex;
  align-items: center;
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
  }
  .name {
    margin: 0 15px;
    font-size: 18px;
    color: #333;
  }
  .title {
    font-size: 12px;
    color: #999;
  }
}

.package-info {
  padding: 16px 12px;
  background: #fff;
  .title {
    margin-bottom: 9px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .left {
      font-size: 16px;
      color: #333;
    }
    .right {
      font-size: 11px;
      color: #999;
    }
  }
  .content {
    font-size: 13px;
    color: #666;
  }
}
</style>

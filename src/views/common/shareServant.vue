<template>
  <div>
    <div class="weui-panel" style="margin-top:0">
      <div class="avatar"><img src="https://cdn.dribbble.com/users/146798/avatars/small/a1d1a5664926d64d14591bb092417f10.png?1441204660" alt=""></div>
      <div class="intro">
        <span class="name">张医师</span>
        <span class="title">主任医师</span>
      </div>
      <div class="organization">四川大学华西医院妇儿院</div>
      <div class="qrcode">
        <img src="" alt="">
      </div>
      <div class="dec">长按或扫一扫二维码，并关注"服务号" 如无法识别二维码, <a href="">请点击这里</a></div>
    </div>
    <div class="weui-panel">
      <div class="intro-title"></div>
      <div class="intro-tags">
        <div class="tag">感冒</div>
        <div class="tag">感冒感冒</div>
        <div class="tag">发烧</div>
        <div class="tag">胸闷</div>
        <div class="tag">胸闷</div>
      </div>
      <div class="intro-title"></div>
      <div class="intro-content">
        在长期的临床工作中积累了丰富的临床经验，擅长慢性盆腔炎、子宫内膜异位症、月经不调 、围绝经期疾病的中医治疗。师承全国老中医药专家、四川省首届名中医杨家林教授、主任医师，崇尚古籍，善用经方、名方和前辈成方。
      </div>
      <div class="bottom-bar"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
.weui-panel {
  overflow: hidden;
  text-align: center;
  .avatar {
    margin: 35px auto 20px;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    overflow: hidden;
  }
  .intro {
    display: flex;
    align-items: baseline;
    justify-content: center;
    line-height: 1;
    margin-bottom: 10px;
  }
  .name {
    margin-right: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  .title {
    font-size: 18px;
    color: #3DCBCB;
  }
  .organization {
    margin-bottom: 40px;
    color: #999;
    font-size: 18px;
  }
  .dec {
    margin: 0 auto 15px;
    width: 75%;
    font-size: 15px;
    color: #999;
    a {
      color: #3DCBCB;
    }
  }
  .intro-tags {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .tag {
      margin: 10px 15px 0;
      padding: 0 5px;
      height: 21px;
      line-height: 21px;
      border: 1px solid #D0D0D0;
      border-radius: 4px;
      color: #999;
      font-size: 14px;
    }
  }
  .intro-content {
    font-size: 14px;
    color: #999;
  }
}
</style>
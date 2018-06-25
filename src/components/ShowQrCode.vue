<template>
  <div class="wrap_container">
    <div class="userInfo_container">
      <img class="avatar" :src="info.Avatar | transformImgUrl" alt="">
      <div class="right">
        <h3 class="nickName">
          {{info.NickName}}
          <!-- <span class="actor">主治医师</span> -->
        </h3>
        <!-- <p class="desc">四川大学华西医院妇儿院四川大学华西医院妇儿院</p> -->
      </div>
    </div>
    <div class="qr_code_box">
      <img :src="API_PATH + '/QRCode/' + info.ViewID" alt="">
    </div>
    <p class="hint_desc">扫一扫二维码，可加我为好友</p>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  computed: {
    API_PATH () {
      return process.env.API_PATH
    }
  }
}
</script>
<style lang="less" scoped>
.wrap_container
{
  padding: 35px 20px;
}
.qr_code_box
{
  position: relative;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  margin-top: 30px;
  img
  {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

.qr_code_box::before
{
  position: absolute;
  display: block;
  content: '';
  width: 200%;
  height: 200%;
  border: 1px solid RGBA(58, 199, 245, .5);
  transform-origin: 0 0;
  transform: scale(0.5, 0.5);
  box-sizing: border-box;
  border-radius: 10px;
}
.userInfo_container
{
  display: flex;
  flex-flow: nowrap;
  justify-content: center;
  align-items: center;
  .avatar
  {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .right
  {
    margin-left: 20px;
    .nickName
    {
      text-align: left;
      color: #333;
      font-weight: normal;
      font-size: 18px;
      height: 25px;
      line-height: 25px;
      .actor
      {
        display: inline-block;
        color: #666;
        font-size: 14px;
        margin-left: 15px;
      }
    }
    .desc
    {
      font-size: 12px;
      color: #999;
      line-height: 20px;
      text-align: left
    }
  }
}
.hint_desc
{
  font-size: 14px;
  color: #999;
  margin-top: 15px;
}
</style>



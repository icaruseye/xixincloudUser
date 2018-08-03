<template>
  <div>
    <div v-if="detail">
      <div class="detail_top_container">
        {{detail.Type | xxSiteNoticeTypeTitleFilter}}
      </div>
      <div class="detail_content_bg">
        <div class="detail_Title_contianer">
          <h1 class="detaile_title">
            {{detail.Title}}
          </h1>
          <p class="create_time">
            {{detail.CreateTime | xxTimeFormatFilter}}
          </p>
        </div>
        <div class="detail_message_container">
          {{detail.Message}}
          <div class="btn_container">
            <button @click="goback" class="go_back_btn">返回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    ID () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      detail: null
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$vux.loading.show('加载中')
      this.$http.get(`/SiteNoticeList/Detail?id=${this.ID}`).then(result => {
        this.$vux.loading.hide()
        if (result.data.Code === 100000) {
          this.detail = result.data.Data
        }
      })
    },
    goback () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
  .detail_top_container
  {
    height: 60px;
    padding: 0 10px;
    color: #fff;
    line-height: 60px;
    font-size: 18px;
    background-color: #3ac7f5
  }
  .detail_content_bg
  {
    padding-bottom: 40px;
    background: linear-gradient(#3ac7f5, rgba(0,0,0,0));
  }
  .detail_Title_contianer
  {
    background-color: #fff;
    padding: 10px 20px;
    margin: 0 10px;
    .detaile_title
    {
      font-size: 16px;
      color: #333;
      text-align: justify;
    }
    .create_time
    {
      font-size: 14px;
      margin-top: 5px;
      color: #999
    }
  }
  .detail_message_container
  {
    margin: 10px;
    background-color: #fff;
    padding: 20px;
    text-align: justify;
    font-size: 14px;
    color: #666
  }
  .btn_container
  {
    position: relative;
    margin-top: 20px;
    padding-top: 10px;
    &::after
    {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      display: block;
      content: '';
      height: 1px;
      background-color: rgba(0,0,0,.1);
      transform: scaleY(.5)
    }
  }
  .go_back_btn
  {
    height: 30px;
    padding: 0 20px;
    background: none;
    border: 1px solid #ddd;
    color: #333;
    outline: none
  }
</style>
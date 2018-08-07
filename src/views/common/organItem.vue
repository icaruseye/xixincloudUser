<template>
  <div class="has-tabbar">
    <!-- 服务包头部信息 -->
    <div class="package-header-info">
      <div class="mid">
        <div class="icon"><img :src="Item.UseType | ItemImageByUseType" alt=""></div>
        <div class="name">{{Item.Name}}</div>
      </div>
    </div>
    <!-- 服务包介绍 -->
    <div class="package-info mgt10">
      <div class="title">
        <span class="left">服务套餐介绍</span>
      </div>
      <div class="content">
        {{Item.Content}}
      </div>
    </div>
    <!-- 服务包介绍 -->
    <div class="package-info mgt10" v-if="Item.Attention">
      <div class="title">
        <span class="left">注意事项</span>
      </div>
      <div class="content">
        {{Item.Attention}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Item: {},
      Package: {}
    }
  },
  computed: {
    itemID () {
      return +this.$route.params.id
    }
  },
  created () {
    this.getItemTemplate()
  },
  methods: {
    async getItemTemplate () {
      const res = await this.$http.get(`/ItemTemplate/${this.itemID}`)
      if (res.data.Code === 100000) {
        this.Item = res.data.Data
      } else {
        this.$vux.toast.text('出错了')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../servant/components/index.less);
.mgt10 {
  margin-top: 10px;
}
.package-header-info {
  background: #fff;
  padding: 20px 12px 12px;
  height: 120px;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #3CC7F5, #42C7F6, #9EC2FB);
  .icon {
    margin: 0 auto;
    width: 29px;
    height: 29px;
  }
  .mid {
    flex: 1;
    .name {
      margin-top: 5px;
      font-weight: bold;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      text-align: center;
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

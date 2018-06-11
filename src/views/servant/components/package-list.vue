<template>
  <div class="weui-list_container">
    <div class="weui-list_item" @click="toItem(1)">
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
    <div class="weui-list_item" @click="toPackage(1)">
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
</template>

<script>
export default {
  methods: {
    toPackage (id) {
      this.$router.push(`/servant/detail/package/${id}`)
    },
    toItem (id) {
      this.$router.push(`/servant/detail/item/${id}`)
    }
  }
}
</script>


<style lang="less" scoped>
.weui-list_container {
  padding: 0 10px;
}
</style>

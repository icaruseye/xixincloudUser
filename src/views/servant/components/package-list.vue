<template>
  <div class="weui-list_container">
    <template v-for="(item, index) in list">
      <div class="weui-list_item" :key="index">
        <div class="icon" @click="toItem(item.ID)">
          <img src="@/assets/images/icon_picc.png" alt="">
        </div>
        <div class="mid" @click="toItem(item.ID)">
          <div class="title">{{item.Name}}</div>
          <div class="describe text-overflow-1">{{item.Description}}</div>
          <div class="sales">
            <div class="price"><span>￥</span>{{(item.ViewPrice/100).toFixed(2)}}元</div>
            <div class="volume">已售：{{item.SoldAmount}}份</div>
          </div>
        </div>
        <div class="btn">
          <button @click="topay(item.ID)">购买</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    isItem: {
      type: Boolean,
      default: false
    },
    list: Array
  },
  methods: {
    toItem (id) {
      const url = this.isItem === true ? `/servant/detail/item/${id}` : `/servant/detail/package/${id}`
      this.$router.push(url)
    },
    topay (id) {
      console.log(id)
    }
  }
}
</script>


<style lang="less" scoped>
@import url(../components/index.less);
.weui-list_container {
  padding: 0 10px;
}
</style>

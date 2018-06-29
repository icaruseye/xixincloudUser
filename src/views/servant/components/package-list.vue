<template>
  <div class="weui-list_container">
    <template v-for="(item, index) in list">
      <div class="weui-list_item" :key="index" @click="toItem(item.ID)" v-if="index <= max - 1">
        <div class="icon">
          <img src="@/assets/images/icon_picc.png" alt="">
        </div>
        <div class="mid">
          <div class="title">{{item.Name}}</div>
          <div class="describe text-overflow-1">{{item.Description}}</div>
          <div class="sales">
            <div class="price"><span>￥</span>{{item.Price ? (item.Price/100).toFixed(2) : '0.00'}}元</div>
            <div class="volume">已售：{{item.SoldAmount}}份</div>
          </div>
        </div>
        <div class="btn">
          <button>购买</button>
        </div>
      </div>
    </template>
    <div class="servant-unfold_bar" @click="toggleUnfold" v-if="list.length >= max">
      <div><i class="iconfont icon-jiantoushang"></i></div>
      <div>{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isItem: {
      type: Boolean,
      default: false
    },
    list: Array,
    limit: Number
  },
  mounted () {
    this.max = this.limit
  },
  data () {
    return {
      isUnfold: false,
      text: '展开',
      max: 0
    }
  },
  methods: {
    toItem (id) {
      const url = this.isItem === true ? `/servant/detail/item/${id}` : `/servant/detail/package/${id}`
      this.$router.push(url)
    },
    toggleUnfold () {
      this.isUnfold = !this.isUnfold
      this.text = this.isUnfold ? '收起' : '展开'
      this.max = this.isUnfold ? this.list.length : this.limit
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

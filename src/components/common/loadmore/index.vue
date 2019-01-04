<template>
  <div class="loadmore" :class="{nomore: nomore}" @click="loadmore">
    <div v-show="!nomore">{{loadText}}</div>
    <div v-show="nomore">没有更多了</div>
  </div>
</template>

<script>
export default {
  props: {
    isLoadmore: {
      type: Boolean,
      default: false
    },
    loadText: {
      type: String,
      default: '查看更多'
    },
    pageindex: Number,
    pageTotal: Number
  },
  data () {
    return {
      nomore: false
    }
  },
  watch: {
    pageindex () {
      this.checkStatus()
    }
  },
  created () {
    this.checkStatus()
  },
  methods: {
    loadmore () {
      this.$emit('onClick')
    },
    checkStatus () {
      if (this.pageindex >= this.pageTotal) {
        this.nomore = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.loadmore {
  margin: 15px 0;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #3ecccc;
  background: transparent;
  border-radius: 2px;
  font-size: 14px;
  &.nomore {
    background: transparent;
    color: #999
  }
}
</style>
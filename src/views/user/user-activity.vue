<template>
  <div class="wrapper">
    <div class="acMine_list" v-if="list.length > 0">
      <template v-for="(item, index) in list">
        <div class="acMine_list_item" :key="index">
          <img class="acMine_list_item_icon" :src="item.CoverPhoto | transformImgUrl">
          <div class="acMine_list_item_content">
            <div class="acMine_list_item_content_name">{{item.ActivityName}}</div>
            <div class="acMine_list_item_content_desc">{{item.ActivityDescribe}}</div>
          </div>
          <div class="acMine_list_item_content_price">￥{{item.PresentPrice}}</div>
        </div>
      </template>
    </div>
    <xxOccupiedBox v-else>
      暂无活动
    </xxOccupiedBox>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getActivityMyList()
  },
  methods: {
    async getActivityMyList () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      const res = await this.$http.get(`/Activity-My-List-All`)
      this.$vux.loading.hide()
      if (res.data.Code === 100000) {
        this.list = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

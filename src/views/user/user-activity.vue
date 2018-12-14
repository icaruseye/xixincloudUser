<template>
  <div class="wrapper" v-if="pageReady">
    <div class="acMine_list" v-if="list.length > 0">
      <template v-for="(item, index) in list">
        <div class="acMine_list_item" :key="index" @click="toDetail(index)">
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
      pageReady: false,
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
      this.pageReady = true
      if (res.data.Code === 100000) {
        this.list = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    toDetail (index) {
      const item = this.list[index]
      if (item.CommodityType === 1) {
        // 服务
        this.$router.push(`/service/reserve/${item.CommodityID}`)
      }
      if (item.CommodityType === 2) {
        // 课程
        this.$router.push(`/servant/course/${item.CommodityID}?activityID=${item.ID}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
}

.acMine_list {
  background: #fff;
}

.acMine_list_item {
  padding: 25px 12px;
  display: flex;
  border-bottom: 1px solid #eee;
}

.acMine_list_item:last-child {
  border: 0;
}

.acMine_list_item_icon {
  margin-right: 12px;
  width: 75px;
  height: 75px;
  border-radius: 2px;
}

.acMine_list_item_content {
  flex: 1;
}

.acMine_list_item_content_name {
  margin-bottom: 5px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.acMine_list_item_content_desc {
  font-size: 14px;
  color: #999;
}

.acMine_list_item_content_price {
  font-size: 12px;
  color: #666;
}
</style>

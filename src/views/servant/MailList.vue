<template>
  <div>
    <div v-if="flag">
      <div>
        <mail-group-item :count="1" :msgType="1"></mail-group-item>
        <mail-group-item :count="1" :msgType="2"></mail-group-item>
      </div>
      <div style="margin-top:10px" v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <mail-list-item
            :count="1"
            :id="item.id"
            :msgType="4"
            :key="index"
            :createTime="item.createTime"
            :title="item.title">
          </mail-list-item>
        </template>
      </div>
    </div>
    <xx-occupied-box v-else>
      正在请求数据…
    </xx-occupied-box>
  </div>
</template>
<script>
import MailListItem from './components/MailListItem'
import MailGroupItem from './components/MailGroupItem'
export default {
  components: {
    MailListItem,
    MailGroupItem
  },
  data () {
    return {
      flag: false,
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      await this.getData().then(value => {
        this.list = value.Data
        this.flag = true
      })
    },
    async getData () {
      const res = await this.$http.get(`/SiteNoticeList/Unread?type=4`)
      if (res.data.Code === 100000) {
        return res.data
      } else {
        this.$vux.toast.text('出错了')
      }
    }
  }
}
</script>

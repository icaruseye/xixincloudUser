<template>
  <div>
    <!-- <div>
      <mail-group-item :count="1"></mail-group-item>
    </div> -->
    <div v-if="list.length > 0" class="mt10px">
      <mail-list-item v-for="(item, index) in list"
        :key="index" 
        :count="item.State === 0 ? '未读': null"
        :title="item.Title"
      >
        {{item.Message}}
      </mail-list-item>
    </div>
    <xx-occupied-box v-else>
      {{occupiedText}}
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
      list: [],
      occupiedText: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.occupiedText = '正在请求数据…'
      await this.getData().then(value => {
        this.list = value.Data
      })
      this.occupiedText = '系统消息列表为空'
    },
    async getData () {
      const res = await this.$http.get('/SiteNoticeList')
      if (res.data.Code === 100000) {
        return res.data
      }
    }
  }
}
</script>

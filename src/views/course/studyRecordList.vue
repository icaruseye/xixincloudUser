<template>
  <div class="wrapper">
    <xx-nav-bar
      left-text="返回"
      @click-left="$router.back()">
    </xx-nav-bar>
    <div v-if="userStudyRecordList.length > 0">
      <section class="items_section" v-for="(userStudyRecord, index) in userStudyRecordList" :key="index">
        <p class="item_name">{{userStudyRecord.LessonName}}</p>
        <p class="item_desc">{{userStudyRecord.StudyCount}}</p>
      </section>
      <xx-loadmore
        v-if="totalPage > 0"
        :pageindex="pageIndex"
        :pageTotal="totalPage"
        :loadText="loadText"
        @onClick="pageIndexChange(pageIndex++)">
      </xx-loadmore>
    </div>
    <xx-occupied-box v-else>
      该用户没有学习记录
    </xx-occupied-box>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {},
  data () {
    return {
      loadText: '查看更多',
      pageIndex: 1,
      totalPage: 1,
      pageSize: 10,
      userStudyRecordList: []
    }
  },
  watch: {},
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ]),
    shopProxyCourseID () {
      return this.$route.params.id || ''
    }
  },
  methods: {
    init () {
      this.pageIndexChange(1)
    },
    pageIndexChange (pageIndex) {
      this.loadText = '加载中...'
      this.pageIndex = pageIndex
      this.getCourseList()
    },
    async getCourseList () {
      const result = await this.$http.get(`/StudyRecord`, {
        page: this.pageIndex,
        pageSize: this.pageSize,
        userID: this.userAccount.ID,
        shopProxyCourseID: this.shopProxyCourseID
      })
      this.loadText = '查看更多'
      if (result.data.Code === 100000) {
        this.totalPage = result.data.Data.total
        this.userStudyRecordList = result.data.Data.userStudyRecordList
      } else {
        this.$vux.toast(result.Msg)
      }
    },
    loadmore () {
    }
  },
  created () {
    this.init()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.wrapper{
  .items_section
  {
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 20px;
    .item_name
    {
      font-size: 14px;
      color: #333
    }
    .item_desc
    {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
  }
}
</style>

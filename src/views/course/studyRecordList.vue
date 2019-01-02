<template>
  <div class="wrapper">
    <div v-if="userStudyRecordList.length > 0">
      <section class="items_section" v-for="(userStudyRecord, index) in userStudyRecordList" :key="index">
        <div style="flex:1">
          <p class="item_name">{{userStudyRecord.LessonName}}</p>
          <p class="item_desc">上次学习：{{userStudyRecord.LastStudyTime | timeFormat}}</p>
        </div>
        <div class="learn_btn" @click="toLearn(userStudyRecord.LessonID, userStudyRecord.ServantProxyCourseID, userStudyRecord.ServantViewID)">再学一次</div>
      </section>
      <xx-loadmore
        style="margin: 10px"
        v-if="totalPage > 1"
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
  created () {
    this.init()
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
        this.totalPage = Math.ceil(result.data.Data.total / this.pageSize)
        this.userStudyRecordList = result.data.Data.userStudyRecordList
      } else {
        this.$vux.toast(result.Msg)
      }
    },
    toLearn (LessonID, ServantProxyCourseID, ServantViewID) {
      this.$router.push(`/servant/course/${ServantProxyCourseID}?servantViewID=${ServantViewID}&lessonID=${LessonID}`)
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  .items_section
  {
    display: flex;
    align-items: center;
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
    .learn_btn {
      border-radius: 2px;
      padding: 2px 5px;
      color: #fff;
      background: #3ecccc;
      font-size: 12px;
    }
  }
}
</style>

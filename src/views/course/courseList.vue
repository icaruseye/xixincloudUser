<template>
  <div class="wrapper">
    <div class="course_list" v-if="list.length > 0">
      <template v-for="(item, index) in list">
        <div class="course_list_item" :key="index">
          <div class="title">{{item.Title}}</div>
          <button class="btn" @click="toDetail(item.ServantShopProxyCourseID)">去学习</button>
          <button class="btn record" @click="toStudyRecordList(item.ServantShopProxyCourseID)">学习记录</button>
        </div>
      </template>
    </div>
    <xxOccupiedBox v-else>
      暂无课程
    </xxOccupiedBox>
    <xx-tabbar></xx-tabbar>
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
    this.getCourseList()
  },
  methods: {
    async getCourseList () {
      const res = await this.$http.get(`/MyCourseList`)
      if (res.data.Code === 100000) {
        this.list = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    toDetail (id) {
      this.$router.push(`/servant/course/${id}`)
    },
    toStudyRecordList (id) {
      this.$router.push(`/course/studyRecordList/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.course_list {
  margin-top: 15px;
  background: #fff;
  padding: 0 12px;
}

.course_list_item {
  padding: 15px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eafdfd;
  .icon {
    margin-right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 4px;
  }
  .title {
    flex: 1;
    font-size: 16px;
    color: #666
  }
  .btn {
    margin-left: 5px;
    font-size: 12px;
    background: #3ecccc;
    color: #fff;
    border: 0;
    border-radius: 15px;
    padding: 2px 8px;
    &.record {
      background: #F8A519;
    }
  }
}
</style>

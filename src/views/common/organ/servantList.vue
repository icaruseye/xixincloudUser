<template>
  <div>
    <div class="search-bar">
      <input type="text" placeholder="输入医生名字搜索" v-model="searchData.search" @keyup.enter="getServantList" @keyup="inputKeywords">
    </div>
    <div class="container">
      <!-- 标签 -->
      <div class="tags-panel" v-if="tagList.length > 0">
        <div class="title">服务者标签</div>
        <checker v-model="searchData.tagId" :radio-required="true" @on-change="getServantList" default-item-class="tags-item" selected-item-class="tags-item-selected">
          <checker-item :value="0">全部</checker-item>
          <checker-item v-for="(item, index) in tagList" :key="index" :value="item.TagID">{{item.TagName}}</checker-item>
        </checker>
      </div>
      <!-- 推荐医师 -->
      <div class="servant-panel servant-panel_service">
        <div class="servant-panel_title">推荐医师</div>
        <template v-if="servantList.length > 0" v-for="(item, index) in servantList">
          <div class="weui-list_item" :key="index" @click="toDetail(item.ViewId)">
            <div class="avatar">
              <img :src="item.Avatar | transformImgUrl" alt="">
            </div>
            <div class="mid">
              <div class="title">{{item.Name}}</div>
              <!-- <div class="describe text-overflow-1">专业老中医</div> -->
              <div style="margin-bottom: 8px;display: flex;align-items: center;">
                <i class="iconfont icon-star1"></i><span class="range">{{item.Score}}</span><span class="times">{{item.ServiceNum}}次服务</span>
              </div>
              <div class="tags"><span v-for="(item, index) in item.Tags" :key="index">{{item}}</span></div>
            </div>
          </div>
        </template>
        <div v-if="servantList.length === 0" class="empty-box">
          没找到相关服务者
        </div>
        <load-more v-if="isShowLoadMore" :show-loading="LoadMore" :tip="tips" style="color:#666"></load-more>
      </div>
    </div>
  </div>
</template>

<script>
import { Checker, CheckerItem, LoadMore } from 'vux'
export default {
  components: {
    Checker,
    CheckerItem,
    LoadMore
  },
  data () {
    return {
      tagList: [],
      servantList: [],
      searchData: {
        index: 1,
        size: 10,
        useType: +this.$route.query.useType,
        tagId: 0,
        search: ''
      },
      isShowLoadMore: false,
      LoadMore: false,
      lastPage: false,
      tips: '加载中'
    }
  },
  computed: {
    useType () {
      return +this.$route.query.useType
    }
  },
  mounted () {
    const that = this
    this.getTagList()
    this.getServantList()
    this.isShowLoadMoreBar()
    window.onscroll = function () {
      if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 50) {
        if (that.lastPage || that.LoadMore) return false
        that.LoadMore = true
        that.searchData.index++
        that.tips = '加载中'
        that.listLoadMore()
      }
    }
  },
  methods: {
    isShowLoadMoreBar () {
      // 判断是否显示加载更多
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
        this.isShowLoadMore = true
      }
    },
    inputKeywords () {
      if (this.searchData.search === '') {
        this.getServantList()
      }
    },
    toDetail (ViewId) {
      this.$router.push(`/servant/service/${ViewId}`)
    },
    async getTagList () {
      const res = await this.$http.get(`/UseType/ShopTag/List`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.tagList = res.data.Data.ServantTagResponses
      }
    },
    async getServantList () {
      const res = await this.$http.get(`/UseType/ShopMedicalCare/List`, this.searchData)
      if (res.data.Code === 100000 && res.data.Data) {
        this.servantList = res.data.Data.MedicalCareResponses
        this.isShowLoadMoreBar()
      }
    },
    async listLoadMore () {
      const res = await this.$http.get(`/UseType/ShopMedicalCare/List`, this.searchData)
      if (res.data.Code === 100000 && res.data.Data) {
        let listLength = res.data.Data.MedicalCareResponses.length
        this.servantList.push(...res.data.Data.MedicalCareResponses)
        this.LoadMore = false
        this.lastPage = Boolean(!listLength)
        this.tips = listLength === 0 ? '没有更多了' : '加载中...'
      }
    }
  }
}
</script>

<style scoped lang="less">
@import url(../../servant/components/index.less);
.container {
  overflow: hidden;
}
.vux-checker-box {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}
.tags-panel {
  margin-top: 10px;
  padding: 15px;
  background: #fff;
  .title {
    margin-bottom: 10px;
    font-size: 15px;
    color: #3ecccc;
  }
  .tags-item {
    display: flex;
    align-items: center;
    margin: 0 20px 15px 0;
    height: 25px;
    font-size: 13px;
    color: #bbb;
    text-align: center;
    background: #eee;
    padding: 0 10px;
    border-radius: 2px;
    &.tags-item-selected {
      background: #3ecccc;
      color: #fff;
    }
  }
}
.servant-panel {
  margin-top: 10px;
  background: #fff;
  padding: 15px;
}
.servant-panel_title {
  font-size: 17px;
  font-weight: normal;
  position: relative;
  padding: 0 0 10px;
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid RGBA(58, 199, 245, .2);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.weui-list_item {
  .avatar {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .mid {
    line-height: 1;
    margin-left: 18px;
    .title {
      margin-bottom: 8px;
      font-weight: normal;
      color: #333;
      font-size: 18px;
    }
    .describe {
      margin-bottom: 8px;
      color: #999;
      font-size: 12px;
    }
    .tags {
      display: flex;
      span {
        margin-right: 5px;
        padding: 0 5px;
        height: 13px;
        line-height: 15px;
        display: block;
        border-radius: 10px;
        font-size: 10px;
        border: 1px solid #3ecccc;
        color: #3ecccc;
      }
    }
    .iconfont {
      margin-right: 3px;
      font-size: 10px;
      color: #F8A519;
    }
    .times {
      margin-right: 5px;
      font-size: 12px;
      color: #999;
    }
    .range {
      margin-right: 5px;
      color: #F8A519;
      font-size: 12px;
    }
  }
}
.search-bar {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 10px 12px;
  input {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: url(../../../assets/images/search.png) no-repeat #eee left center;
    background-size: 17px;
    background-position-x: 10px;
    font-size: 14px;
    color: #666;
    padding-left: 35px;
    border-radius: 15px;
    &::-webkit-input-placeholder {
      text-align: center;
      position: relative;
      left: -15px;
      color: #999;
    }
  }
}

.container {
  margin-top: 50px;
}
</style>
<template>
  <div>
    <div class="container">
      <!-- 标签 -->
      <xx-nav-bar
        left-text="返回"
        @click-left="$router.back()">
      </xx-nav-bar>
      <div class="tags-panel" v-if="isAll">
        <div class="title">所有科室</div>
        <checker v-model="OrganizationID" :radio-required="true" @on-change="changeTag" default-item-class="tags-item" selected-item-class="tags-item-selected">
          <checker-item v-for="(item, index) in OrganizationList" :key="index" :value="item.ID">{{item.Name}}</checker-item>
        </checker>
      </div>
      <!-- 推荐医师 -->
      <div class="servant-panel servant-panel_service" v-if="OrganizationID">
        <div class="servant-panel_title">科室服务者</div>
        <div v-if="servantList.length > 0">
          <template v-for="(item, index) in servantList">
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
        </div>
        <div v-if="servantList.length === 0" class="empty-box">
          没找到相关服务者
        </div>
        <xx-loadmore
          v-if="servantList.length > 0"
          :pageindex="pageIndex"
          :pageTotal="totalPage"
          :loadText="loadText"
          @onClick="loadmore">
        </xx-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
export default {
  components: {
    Checker,
    CheckerItem
  },
  data () {
    return {
      loadText: '加载更多',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 1,
      OrganizationList: [],
      servantList: [],
      OrganizationID: null,
      currentID: this.$route.params.id
    }
  },
  computed: {
    isAll () {
      return this.$route.params.id === 'all'
    }
  },
  watch: {
    currentID () {
      this.servantList = []
      this.pageIndex = 1
      this.getServantList(1)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.currentID !== 'all') {
        this.OrganizationID = this.currentID
        this.getServantList(1)
      } else {
        this.getOrganizationList()
      }
    },
    async getOrganizationList () {
      const res = await this.$http.get(`/OrganizationList?page=1&pageSize=999`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.OrganizationList = res.data.Data.organizationalStructureList
      }
    },
    async getServantList (page) {
      const res = await this.$http.get(`/ServantOrganizationList`, {
        organizationID: this.currentID,
        page: page,
        pageSize: this.pageSize
      })
      if (res.data.Code === 100000 && res.data.Data) {
        this.servantList.push(...res.data.Data.MedicalCareResponses)
        this.totalPage = Math.ceil(res.data.Data.Total / this.pageSize)
      }
    },
    loadmore () {
      this.pageIndex = this.pageIndex + 1
      this.getServantList(this.pageIndex)
    },
    toDetail (ViewId) {
      this.$store.commit('SET_SERVANT_TAB', 'service')
      this.$router.push(`/servant/${ViewId}`)
    },
    changeTag (id) {
      this.currentID = id
    }
  }
}
</script>

<style scoped lang="less">
@import url(../servant/components/index.less);
.container {
  overflow: hidden;
}
.servant-panel_service {
  margin-top: 0 !important;
}
.vux-checker-box {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}
.tags-panel {
  margin-bottom: 10px;
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
  font-size: 16px;
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
      flex-wrap: wrap;
      span {
        margin: 0 5px 5px 0;
        padding: 0 5px;
        height: 13px;
        line-height: 13px;
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
</style>
<template>
  <div class="wrapper">
    <!-- <div class="search-bar">
      <input type="text" placeholder="输入服务者名字搜索" v-model="searchData.search" @keyup.enter="getServantList" @keyup="inputKeywords">
    </div> -->
    <!-- 科室 -->
    <div class="departments_wrap">
      <template v-for="(item, index) in OrganizationList">
        <div class="item" :key="index" @click="toList(item.ID)">
          <img class="icon" v-if="item.Img" :src="item.Img | transformImgUrl" alt="">
          <img v-else class="icon" src="@/assets/images/departments_1.png" alt="">
          <div class="name">{{item.Name}}</div>
        </div>
      </template>
      <div class="item" @click="toList('all')">
        <img class="icon" src="@/assets/images/departments_8.png" alt="">
        <div class="name">更多</div>
      </div>
    </div>
    <!-- 推荐服务者 -->
    <div class="servant-panel servant-panel_service">
      <div class="servant-panel_title">推荐服务者</div>
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageSize: 7,
      OrganizationList: [],
      servantList: []
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () {
      this.getOrganizationList()
      this.getServantList()
    },
    async getOrganizationList () {
      const res = await this.$http.get(`/OrganizationList?page=1&pageSize=${this.pageSize}`)
      if (res.data.Code === 100000) {
        this.OrganizationList = res.data.Data.organizationalStructureList
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    },
    // 获取推荐服务者列表
    async getServantList () {
      const res = await this.$http.get('/GetMedicalCare/List')
      if (res.data.Code === 100000 && res.data.Data) {
        this.servantList = res.data.Data.MedicalCareResponses
      }
    },
    toDetail (ViewId) {
      this.$store.commit('SET_SERVANT_TAB', 'service')
      this.$router.push(`/servant/${ViewId}`)
    },
    toList (id) {
      this.$router.push(`/departments/list/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>

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
    background: url(../../assets/images/search.png) no-repeat #eee left center;
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

.departments_wrap {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  .item {
    padding: 10px 0;
    width: 25%;
    .icon {
      display: block;
      margin: 0 auto 5px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .name {
      font-size: 15px;
      color: #666;
      text-align: center;
    }
  }
}

.weui-list_item {
  position: relative;
  padding: 15px 0;
  display: flex;
  align-items: center;
  align-items: initial;
  &::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
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
        margin: 0 5px 5px;
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
.servant-panel {
  margin-top: 10px;
  background: #fff;
  padding: 15px;
}
.servant-panel_title {
  position: relative;
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
  .more {
    position: absolute;
    right: 0;
    bottom: 12px;
    font-size: 12px;
    color: #999;
  }
}
.empty-wrap {
  position: relative;
  height: 100%;
  background: url('../../assets/images/bind-phone.png') no-repeat center;
  background-size: 118px 95px;
  background-position-y: 15px;
  text-align: center;
  .btn {
    display: inline-block;
    margin-top: 135px;
    width: 100px;
    height: 25px;
    height: 25px;
    border: 1px solid RGBA(0, 180, 171, .2);
    box-sizing: border-box;
    border-radius: 15px;
    font-size: 15px;
    color: #3ecccc;
    font-weight: bold;
    text-align: center;
    background: #fff;
  }
}
</style>

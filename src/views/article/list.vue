<template>
  <div class="has-tabbar">
    <sticky
      ref="sticky"
      :offset="0"
      :check-sticky-support="true">
      <xx-tab v-model="tabIndex" active-color="#3ecccc" custom-bar-width="0" v-if="typeList.length > 0">
        <xx-tab-item v-for="(item, index) in typeList" :key="index" :selected="tabIndex === index">{{item.Name}}</xx-tab-item>
      </xx-tab>
    </sticky>
    <template v-for="(item, index) in typeList" v-if="tabIndex === index">
      <div class="container" :key="index" v-show="index === tabIndex" v-if="articleList[index]">
        <template v-for="(articleItem, articleIndex) in articleList[index].ArticleResponses">
          <div class="item" :key="articleIndex" @click="toDetail(articleItem.ArticleId)">
            <div class="poster">
              <img :src="articleItem.Cover | transformImgUrl" alt="">
            </div>
            <div class="right">
              <div class="title text-overflow-1">{{articleItem.Title}}</div>
              <div class="tags">
                <span v-for="(item, index) in articleItem.Attributes.split(',')" :key="index">{{item}}</span>
              </div>
              <div class="info">
                <div class="text">{{articleItem.CreateTime | timeFormat('HH:mm')}}</div>
                <div class="text">阅读{{articleItem.ViewCount}}</div>
                <div class="text">点赞{{articleItem.GiveCount}}</div>
              </div>
            </div>
          </div>
        </template>
        <xx-loadmore
          v-if="articleList[index].ArticleResponses.length > 0"
          :pageindex="articleList[index].index"
          :pageTotal="articleList[index].TotalPage"
          :loadText="loadText"
          @onClick="loadmore(index)">
        </xx-loadmore>
        <div v-if="articleList[index].ArticleResponses.length === 0" style="font-size: 120px;text-align:center;margin-bottom:40px;">
          <i style="font-size:66px;display:block">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-kong1"></use>
            </svg>
          </i>
          <p style="font-size:12px;color:#999;text-align:center;">文章列表为空</p>
        </div>
      </div>
    </template>
    <div v-if="typeList.length === 0" style="font-size: 120px;text-align:center;margin-bottom:40px;">
      <i style="font-size:66px;display:block">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kong1"></use>
        </svg>
      </i>
      <p style="font-size:12px;color:#999;text-align:center;">文章列表为空</p>
    </div>
  </div>
</template>

<script>
import { Sticky, dateFormat } from 'vux'
export default {
  components: {
    Sticky
  },
  filters: {
    timeFormat (value, m) {
      return dateFormat(new Date(value), m)
    }
  },
  data () {
    return {
      nomore: false,
      loadText: '查看更多',
      tabIndex: 0,
      typeList: [],
      articleList: [],
      totalPage: 2,
      indexPage: 1
    }
  },
  mounted () {
    const that = this
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.getArticleTypeList().then((res) => {
      (async function () {
        for (let index = 0; index < res.length; index++) {
          const article = await that.getArticleList(res[index].ID, 1)
          article.index = 1
          that.articleList.push(article)
        }
      })()
      this.$nextTick(() => {
        this.$vux.loading.hide()
      })
    })
  },
  methods: {
    toDetail (id) {
      this.$router.push(`/article/detail/${id}`)
    },
    loadmore (index) {
      const that = this
      that.articleList[index].index++
      that.loadText = '加载中...'
      that.getArticleList(that.typeList[index].ID, that.articleList[index].index).then((res) => {
        that.articleList[index].ArticleResponses.push(...res.ArticleResponses)
        that.loadText = '查看更多'
      })
    },
    // 获取文章类型列表
    async getArticleTypeList () {
      const res = await this.$http.get(`/ArticleTypeList`)
      if (res.data.Code === 100000) {
        this.typeList = res.data.Data
        return res.data.Data
      }
    },
    // 根据类型获取文章列表
    async getArticleList (articleType, index) {
      const res = await this.$http.get(`/ArticleList?articleType=${articleType}&index=${index}`)
      if (res.data.Code === 100000) {
        return res.data.Data
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 10px 6px;
  .item {
    margin-bottom: 10px;
    display: flex;
    background: #fff;
    border-radius: 2px;
    padding: 10px 6px;
    .poster {
      font-size: 0;
      img {
        display: block;
        margin-right: 9px;
        width: 118px;
        height: 80px;
        border-radius: 2px;
        overflow: hidden;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .title {
        font-size: 15px;
        color: #666;
      }
      .tags {
        font-size: 12px;
        color: #999
      }
      .info {
        padding-right: 10px;
        display: flex;
        align-items: flex-end;
        font-size: 9px;
        color: #999;
        .text {
          flex: 1;
          &:nth-child(3),
          &:nth-child(4) {
            text-align: right;
          }
        }
      }
    }
  }
}

.loadmore {
  margin: 15px 0;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: #3ecccc;
  border-radius: 2px;
  font-size: 14px;
}
</style>
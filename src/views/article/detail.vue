<template>
  <div v-if="article">
    <xx-nav-bar
      left-text="返回"
      @click-left="onNavbarClickLeft">
    </xx-nav-bar>
    <div class="container">
      <div class="main-title">{{article.Title}}</div>
      <div class="tags" v-if="article.Attributes">
        <span v-for="(item, index) in article.Attributes.split(',')" :key="index">{{item}}</span>
      </div>
      <div class="info">
        <div>
          <span>{{article.CreateTime | timeFormat('HH:mm')}}</span>
        </div>
        <div>
          <span>阅读{{article.ViewCount}}</span>
          <span>点赞{{article.GiveCount}}</span>
        </div>
      </div>
      <div class="content">
        <img v-for="(item, index) in article.Imgs" :src="item | transformImgUrl" alt="" :key="index">
        <p>{{article.Content}}</p>
      </div>
      <div class="handle-bar">
        <span class="dianzan" :class="{active: article.Give}" @click="sendZan">{{article.GiveCount}}</span>
        <span class="pinglun">{{article.CommentCount}}</span>
      </div>
      <div class="commnents-list">
        <div class="title">
          <div class="left">精选留言</div>
          <div class="right" @click="toComment">写留言</div>
        </div>
        <div v-if="comments.length > 0">
          <template v-for="(item, index) in comments">
            <div class="item" :key="index">
              <div class="avatar">
                <img :src="item.Avatar | transformImgUrl" alt="">
              </div>
              <div class="content">
                <div class="name">{{item.CommentName}}</div>
                <div class="text">{{item.CommentContent}}</div>
                <div class="author-text" v-if="item.Reply">
                  <div class="name">作者回复</div>
                  <div class="text">{{item.Reply}}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <xx-loadmore
          v-if="comments.length > 0"
          :pageindex="pageIndex"
          :pageTotal="totalPage"
          :loadText="loadText"
          @onClick="loadmore">
        </xx-loadmore>
        <div v-if="comments.length === 0" class="empty-box" style="color:#999">暂无评论</div>
      </div>
    </div>
  </div>
</template>

<script>
import wxShare from '@/plugins/wxShare'
import util from '@/plugins/util'
import { mapGetters } from 'vuex'
import { dateFormat } from 'vux'
export default {
  filters: {
    timeFormat (value, m) {
      return dateFormat(new Date(value), m)
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    ID () {
      return +this.$route.params.id
    }
  },
  data () {
    return {
      pageIndex: 1,
      totalPage: 1,
      loadText: '查看更多评论',
      article: {},
      comments: []
    }
  },
  watch: {
    pageIndex () {
      this.getCommentList()
    }
  },
  mounted () {
    this.getArticle()
    this.getCommentList()
  },
  methods: {
    async sendZan () {
      if (this.article.Give) {
        this.$vux.toast.text('无法重复点赞哦~')
        return false
      }
      const res = await this.$http.post(`/Like`, {articleID: this.ID})
      if (res.data.Code === 100000) {
        this.article.Give = true
        this.article.GiveCount++
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    async getArticle () {
      this.$vux.loading.show({text: '加载中...'})
      const res = await this.$http.get(`/Article?articleId=${this.ID}`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.$vux.loading.hide()
        this.article = res.data.Data
        this.article.Imgs = this.article.Imgs.split(',')
        wxShare({
          title: res.data.Data.Title,
          desc: res.data.Data.Content,
          logo: util.transformImgUrl(this.userAccount.Avatar),
          link: `/article/detail/${res.data.Data.ArticleId}`
        })
      } else {
        this.$vux.loading.hide()
      }
    },
    async getCommentList () {
      const res = await this.$http.get(`/CommentList?articleId=${this.ID}&index=${this.pageIndex}`)
      if (res.data.Code === 100000 && res.data.Data) {
        this.comments.push(...res.data.Data.Comments)
        this.totalPage = res.data.Data.CommentPage
        this.loadText = '查看更多评论'
      } else {
        this.$vux.toast.text('拉取评论失败')
      }
    },
    onNavbarClickLeft () {
      this.$router.back()
    },
    toComment () {
      this.$router.push(`/article/detail/${this.ID}/comment?title=${this.article.Title}`)
    },
    loadmore () {
      this.pageIndex++
      this.loadText = '加载中...'
    }
  }
}
</script>

<style scoped lang="less">
.container {
  background: #fff;
  .main-title {
    font-size: 15px;
    color: #666;
    padding: 12px 13px;
  }
  .tags {
    padding: 0 13px 10px;
    font-size: 9px;
    span {
      display: inline-block;
      text-align: center;
      border-radius: 10px;
      padding: 0 5px;
      background: #ccc;
      height: 20px;
      line-height: 22px;
      color: #fff;
      margin-right: 10px;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    padding: 0 14px 10px;
    font-size: 9px;
    color: #999;
    span {
      &:nth-child(1),
      &:nth-child(3) {
        margin-right: 20px;
      }
    }
  }
  .content {
    img {
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      color: #999;
      padding: 0 15px;
      line-height: 2;
      margin-top: 15px;
    }
  }
  .handle-bar {
    padding: 10px 0;
    font-size: 12px;
    color: #999;
    display: flex;
    flex-direction: row-reverse;
    span {
      margin-right: 30px;
    }
    .dianzan {
      padding-left: 20px;
      background: url(../../assets/images/ic-zan.png) no-repeat;
      background-size: 14px;
      background-position-y: 2px;
      &.active {
        background: url(../../assets/images/ic-zaned.png) no-repeat;
        background-size: 14px;
        background-position-y: 2px;
      }
    }
    .pinglun {
      padding-left: 20px;
      background: url(../../assets/images/ic-pl.png) no-repeat;
      background-size: 15px 14px;
      background-position-y: 3px;
    }
  }
  .commnents-list {
    padding: 15px 12px;
    background: #F6F6F6;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      .left {
        color: #999;
      }
      .right {
        color: #3ecccc;
      }
    }
    .item {
      display: flex;
      padding: 15px 0 5px 0;
      border-bottom: 1px solid rgba(216, 216, 216, 0.4);
      &:last-child {
        border: 0;
      }
      .avatar {
        img {
          margin-right: 13px;
          width: 24px;
          height: 24px;
          overflow: hidden;
          border-radius: 50%;
        }
      }
      .content {
        font-size: 12px;
        flex: 1;
        .name {
          margin-bottom: 5px;
          color: #666;
        }
        .text {
          margin-bottom: 5px;
          color: #999;
        }
        .author-text {
          .name {
            margin-bottom: 5px;
            padding-left: 8px;
            position: relative;
            color: #666;
            &::after {
              position: absolute;
              content: "";
              width: 2px;
              height: 10px;
              background: #3ecccc;
              top: 50%;
              margin-top: -5px;
              left: 0;
            }
          }
          .text {
            color: #999;
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
  &.nomore {
    background: transparent;
    color: #999
  }
}
</style>
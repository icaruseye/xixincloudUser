<template>
  <div>
    <xx-nav-bar
      left-text="返回"
      :right-text="userAccount.NickName"
      :avatar="userAccount.Avatar | transformImgUrl"
      @click-left="onNavbarClickLeft">
    </xx-nav-bar>
    <div class="container">
      <div class="main-title">分析与猜想：《赛博朋克2077》演示里隐含的信息</div>
      <div class="info">
        <div>
          <span>游戏</span>
          <span>第一人称</span>
        </div>
        <div>
          <span>阅读999</span>
          <span>点赞666</span>
        </div>
      </div>
      <div class="content">
        <img src="https://alioss.g-cores.com/uploads/image/440888ce-c64f-4aa9-8b0e-2f5c9e4cb3f1_watermark.png" alt="">
        <p>北京时间 2018 年 8 月 28 日凌晨 1 点，经过八个小时的预热之后，CDPR将先前只在小黑屋展示给媒体的《赛博朋克 2077》实机演示，第一次对所有玩家公开。</p>
        <p>和许多兴奋的玩家一样，我也把这段 48 分钟的视频反复看了一遍又一遍。先前 E3 的三分钟预告，已经有无数“驴学家”逐帧分析其中的设定、信息以及赛博朋克文化相关内容，所以这次的 48 分钟实机演示，我就来分析点更偏向于 gameplay 部分的内容——当然不是实机演示里正面展示的内容，而是通过画面中的信息去分析更多的可能性。</p>
        <p>演示中有过一小段潜行暗杀的演示，不过那段实际上更侧重于表现对敌人后脑进行黑客的操作，而对于传统潜行的表现不多。在罗伊斯发现信用卡里有病毒，主角和杰克通过维修管道逃脱办公室之后，又钻进了一个通风管道，从管道的空隙处跳下来，和房间里的敌人打成一团，也就是展示“穿墙霰弹”和“反弹子弹”的地方。</p>
        <p>从通风管道跳下来之后就直接开战了，但是在跳下来之前敌人是没有发现主角，还在自顾自对话的，而跳下来的那一瞬间，通过主角的义眼扫描可以发现，有一个敌人正好向通风管道空隙处的方向走来，跳下去的主角等于和他撞了个正脸，所以立刻开战。试想一下，如果等他走过去呢，主角是不是可以用偷鸡摸狗的方法，把房间里的四个敌人一个一个勒晕，并且不惊动隔壁房间的敌人？</p>
        <p>而在数次准星对准尸体的镜头中，我们也能看到除了摸尸体捡道具的选项之外，还有一个明晃晃的选项“pick the body”，也就是扛尸体。如此看来，在短短的一个潜行暗杀的背后，实际上《赛博朋克 2077》是有一套完整的潜行机制，包含了潜行、击倒、暗杀、扛尸体、黑客技能等一系列元素，当然别忘了螳螂剑，这对利刃允许你挂在任意一面墙壁上，某种程度上来说是对关卡设计的一种解放，当你需要在高处扫描/暗杀/黑客的时候，不需要在特定的地点添加大量的横梁、挂壁、管道出口或高台了。</p>
      </div>
      <div class="handle-bar">
        <span class="dianzan">666</span>
        <span class="pinglun">99</span>
      </div>
      <div class="commnents-list">
        <div class="title">
          <div class="left">精选留言</div>
          <div class="right" @click="toComment">写留言</div>
        </div>
        <div class="item">
          <div class="avatar">
            <img src="https://alioss.g-cores.com/default_thumb/user-smallat2x.png" alt="">
          </div>
          <div class="content">
            <div class="name">cpl901</div>
            <div class="text">胸部，当然是要改造成胸部导弹了（滑稽）</div>
            <div class="author-text">
              <div class="name">作者回复</div>
              <div class="text">当然是要胸部喷火器喽，还能吃烧烤</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="avatar">
            <img src="https://alioss.g-cores.com/uploads/user/50b9d6dd-cb95-4b73-8183-97bee5b8b605_smallat2x.jpg" alt="">
          </div>
          <div class="content">
            <div class="name">记者德雷克</div>
            <div class="text">普通步枪改爆弹，下一秒变忠诚</div>
            <div class="author-text">
              <div class="name">作者回复</div>
              <div class="text">两把手枪加兜帽，背后背把大宝剑</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'userAccount'
    ]),
    ID () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      index: 1,
      size: 10
    }
  },
  mounted () {
    this.getArticle()
  },
  methods: {
    onNavbarClickLeft () {
    },
    toComment () {
      this.$router.push(`/article/detail/${this.ID}/comment`)
    },
    async getArticle () {
      const res = await this.$http.get(`/Article?articleId=${this.ID}&index=${this.index}&size=${this.size}`)
      if (res.data.Code === 100000) {
        console.log(res)
      }
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
      border-bottom: 1px solid #d8d8d8;
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
</style>
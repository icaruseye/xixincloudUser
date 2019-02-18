<template>
  <div class="xx-nav-bar">
    <div class="xx-nav-bar__left" @click="onClickLeft">
      <i class="iconfont icon-jiantouzuo xx-nav-bar__arrow"></i>
      <span class="xx-nav-bar__text">{{leftText}}</span>
    </div>
    <div class="xx-ellipsis xx-nav-bar__title">{{title}}</div>
    <div class="xx-nav-bar__right" @click="onClickRight">
      <img class="xx-nav-bar__avatar" :src="userAccount.Avatar | transformImgUrl" alt="">
      <span class="xx-nav-bar__text">{{userAccount.RealName}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    leftText: {
      type: String,
      default: '返回'
    },
    rightText: {
      type: String,
      default: '123'
    },
    title: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: '222'
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  methods: {
    onClickLeft () {
      this.$emit('click-left')
    },
    onClickRight () {
      // this.$emit('click-right')
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped lang="less">
.xx-nav-bar {
  height: 44px;
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  text-align: center;
  line-height: 44px;
  background-color: #fff;
  font-size: 12px;
  color: #999;
  box-shadow: 0 1px 5px #D0D0D0;
}

.xx-nav-bar__left {
  left: 15px;
}

.xx-nav-bar__right {
  right: 15px;
  display: flex;
  align-items: center;
}

.xx-nav-bar__avatar {
  width: 24px;
  height: 24px;
  margin-right: 5px;
  border-radius: 50%;
  overflow: hidden;
}

.xx-nav-bar__left, .xx-nav-bar__right {
  bottom: 0;
  font-size: 14px;
  position: absolute;
}

.xx-nav-bar .xx-icon {
  color: #9a9a9a;
  vertical-align: middle;
}

.xx-nav-bar__arrow {
  font-size: 15px;
}

.xx-nav-bar__arrow + .xx-nav-bar__text {
  margin-left: -20px;
  padding-left: 25px;
}

.xx-nav-bar__title {
  margin: 0 auto;
  max-width: 60%;
  font-size: 16px;
}

.xx-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
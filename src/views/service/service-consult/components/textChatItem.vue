<template>
  <div :class="['container','clearfix', originator+'_container']">
    <img :src="avatar | transformImgUrl" class="avatar" alt="">
    <!-- 只有图片的类型 -->
    <div v-if="MsgType === 2" :class="[originator+'_imgChat_msg']" class="clearfix">
      <div class="thumbs_container">
        <img 
          :src="modelImage"
          :class="[imgGroupClass]"
          @click="previewImage"
          @load="onloaded"
          class="previewer-img">
      </div>
    </div>
    <!-- 文本 -->
    <div v-if="MsgType === 1" :class="[originator+'_textChat_msg', (IsServantReceive === 0) ?'yellow_textChat':'']">
      <div v-if="Content" class="msg_text_container">
        {{Content}}
      </div>
    </div>
    <div v-if="MsgType === 7" class="from_textChat_msg yellow_textChat">
      <div v-if="Content" class="msg_text_container">
        服务已开始
      </div>
    </div>
  </div>
</template>
<script>
import util from '@/plugins/util'
import { ImagePreview } from 'vant'
export default {
  props: {
    avatar: {
      type: String,
      default: ''
    },
    IsServantReceive: {
      type: Number,
      default: 0
    },
    Content: {
      type: String,
      default: ''
    },
    MsgType: {
      type: Number,
      default: ''
    }
  },
  computed: {
    previewImgUrlList () {
      const that = this
      return [
        {
          src: util.transformImgUrl(that.Content)
        }
      ]
    },
    modelImage () {
      return util.transformImgUrl(this.Content)
    },
    originator () {
      return (this.IsServantReceive === 1) ? 'to' : 'from'
    },
    imgGroupClass () {
      return `preview_image_${Math.floor(Math.random() * 9999 + 1000)}`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$vux.bus && this.$vux.bus.$emit('vux:after-view-enter')
    })
    if (this.MsgType === 7) {
      this.$emit('initMission')
    }
  },
  destroyed () {
    this.$vux.loading.hide()
  },
  methods: {
    previewImage () {
      ImagePreview([util.transformImgUrl(this.Content)])
      // const that = this
      // if (!this.previewImageLock) {
      //   this.$vux.loading.show({
      //     text: '加载中'
      //   })
      //   this.previewImageSample.src = this.modelImage
      //   this.previewImageSample.onload = function () {
      //     that.$refs.previewer.show(index)
      //     that.$vux.loading.hide()
      //   }
      //   this.previewImageLock = true
      // }
    },
    onloaded () {
      this.$emit('onloaded')
    },
    unLock () {
      this.previewImageLock = false
    }
  }
}
</script>
<style lang="less" scoped>
.container
{
  position: relative;
  min-height: 50px;
  margin-bottom: 10px;
  padding: 0 70px;
  .avatar
  {
    position: absolute;
    top: 0;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
}
.to_container
{
  .avatar
  {
    right: 0;
  }
}
.from_container
{
  .avatar
  {
    left: 0;
  }
}
.to_textChat_msg,
.from_textChat_msg
{
  max-width: 100%;
  position: relative;
  padding-top: 10px;
  border-radius: 3px;
  min-height: 40px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #eee;
  &::after
  {
    position: absolute;
    background-color: #fff;
    content: '';
    top: 10px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border-style: solid;
    border-width: 1px;
  }
  .msg_text_container
  {
    margin-bottom: 10px;
    padding: 0 15px;
    font-size: 14px;
    text-align: justify;
    color: #666;
    word-wrap: break-word;
    word-break: break-word;
  }
}
.to_textChat_msg
{
  float: right;
  &::after
  {
    right: -6px;
    border-color: #eee #eee transparent transparent
  }
}
.from_textChat_msg
{
  float: left;
  &::after
  {
    left: -6px;
    border-color: transparent transparent #eee #eee
  }
}
.yellow_textChat
{
  background-color: #FFEDD1;
  border: 1px solid #FFD797;
  &::after
  {
    background-color: #FFEDD1;
    border-color: transparent transparent #FFD797 #FFD797
  }
}

.thumbs_container {
  img {
    background: #fff;
  }
}
</style>

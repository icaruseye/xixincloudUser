<template>
  <div :class="['container','clearfix', originator+'_container']">
    <img :src="avatar" class="avatar" alt="">
    <div v-if="imgs != null && title == null && text == null" :class="[originator+'_imgChat_msg']">
      <div class="thumbs_container">
        <img :src="imgs" @click="previewImage(0)" class="previewer-img" :class="[imgGroupClass]" @load="onloaded">
      </div>
      <div v-transfer-dom>
        <previewer ref="previewer" :list="[{src: imgs}]" :options="options"></previewer>
      </div>
    </div>
    <div v-else :class="[originator+'_textChat_msg', (text != null && title == null)?'yellow_textChat':'']">
      <h4 v-if="title" class="msg_title">{{title}}</h4>
      <div v-if="text" class="msg_text_container">
        {{text}}
      </div>
      <div v-if="imgs" class="msg_imsg_container">
        <image-preview-item :list="imgs" @onloaded="onloaded"></image-preview-item>
      </div>
      <div v-if="linkName" class="msg_link_btn">
        {{linkName}}
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </div>
  </div>
</template>
<script>
import ImagePreviewItem from '@/components/ImagePreViewItem'
import { Previewer, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    ImagePreviewItem,
    Previewer
  },
  props: {
    avatar: {
      type: String,
      default: ''
    },
    originator: {
      type: String,
      default: 'to'
    },
    title: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    imgs: {
      type: String,
      default: null
    },
    linkName: {
      type: String,
      default: null
    }
  },
  computed: {
    imgGroupClass () {
      return `preview_image_${Math.floor(Math.random() * 9999 + 1000)}`
    },
    options () {
      const that = this
      return {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll(`.${that.imgGroupClass}`)[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    previewImage (index) {
      this.$refs.previewer.show(index)
    },
    onloaded () {
      this.$emit('onloaded')
    }
  }
}
</script>
<style lang="less" scoped>
.container
{
  position: relative;
  min-height: 50px;
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
  .msg_title
  {
    color: #3AC7F5;
    font-size: 16px;
    margin-bottom: 5px;
    padding: 0 15px;
  }
  .msg_text_container
  {
    margin-bottom: 10px;
    padding: 0 15px;
    font-size: 14px;
    text-align: justify;
    color: #666;
  }
  .msg_imsg_container
  {
    margin-bottom: 10px;
    padding: 0 15px;
  }
  .msg_link_btn
  {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #999;
    padding: 0 15px;
    border-top: 1px solid #E3F8F7;
    .iconfont
    {
      font-size: 12px;
      float: right;
      color: #999;
    }
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
.yellow_textChat
{
  background-color: #FFEDD1;
  border: 1px solid #FFD797;
  &::after
  {
    background-color: #FFEDD1;
    border-color: #FFD797 #FFD797 transparent transparent
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

</style>


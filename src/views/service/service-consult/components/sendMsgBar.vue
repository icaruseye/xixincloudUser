<template>
  <div class="container" ref="operContainerRef">
    <div class="oper_container">
      <label class="select_img_btn">
        <label class="icon-tupian iconfont"  for="uploadImgBtn"></label>
        <input id="uploadImgBtn" type="file" @change="change">
      </label>
      <div class="input_control_box">
        <input type="text"
         @keyup.enter="sendTextMsg"
         @focus="emojiContainerShow = false"
         ref="chatInput"
         v-model="msg">
      </div>
      <div class="emoji_show_container" @click="emojiContainerShow = !emojiContainerShow">
        <i v-if="!emojiContainerShow" class="iconfont icon-biaoqing-xue"></i>
        <i v-else class="iconfont icon-jianpan"></i>
      </div>
      <div class="send_msg_container">
        <button @click="sendTextMsg">发送</button>
      </div>
    </div>
    <div v-if="emojiContainerShow" class="emoji_container">
      <a href="javascript:;" style="margin:0 3px;" v-for="(item, index) in faceList" :key="index" @click="chooseFace(item)">{{item}}</a>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import util from '@/plugins/util'
import EXIF from 'exif-js'
export default {
  data () {
    return {
      msg: '',
      emojiContainerShow: false,
      faceList: ['😀', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '💪', '👈', '👉', '✌', '👆', '👇', '✋', '👌', '👍', '👏', '👐', '🙏'],
      imgUploadProgress: 0,
      reader: new FileReader(),
      image: new Image(),
      file: null,
      orient: null
    }
  },
  mounted () {
    this.readyImage()
  },
  watch: {
    emojiContainerShow () {
      this.operContainerHeight()
    }
  },
  props: {
    missionID: ''
  },
  methods: {
    chooseFace (face) {
      this.msg = this.msg + face
    },
    operContainerHeight () {
      this.$nextTick(() => {
        this.$emit('changeHeight', this.$refs.operContainerRef.offsetHeight)
      })
    },
    sendTextMsg () {
      if (this.msg.length <= 0) {
        this.$vux.toast.show({
          text: '消息不可为空',
          position: 'bottom',
          type: 'text'
        })
        return false
      }
      if (this.msg.length > 200) {
        this.$vux.toast.show({
          text: '消息不可超过200字符',
          position: 'bottom',
          type: 'text'
        })
      }
      const msg = {
        IsServantReceive: 1,
        MsgType: 1,
        Content: this.msg
      }
      this.msg = ''
      if (!this.emojiContainerShow) {
        this.$refs.chatInput.focus()
      }
      this.$emit('sendMsg', msg)
    },
    readyImage () {
      const that = this
      that.reader.onload = function (e) {
        that.image.src = e.target.result
      }
      that.image.onload = function (e) {
        util.drawPhoto(that.file, that.orient, that.image)
        .then(([blob, base64]) => {
          let fd = new FormData()
          fd.append('fileUpload', blob)
          const msg = {
            IsServantReceive: 1,
            MsgType: 2,
            Content: base64,
            Image: '',
            file: fd
          }
          that.uploadImg(msg)
        })
      }
    },
    change (e) {
      const that = this
      that.file = e.target.files[0]
      if (!that.file) return false

      // 获取照片的元信息（拍摄方向）
      EXIF.getData(that.file, function () {
        that.orient = EXIF.getTag(this, 'Orientation')
        that.reader.readAsDataURL(that.file)
        e.target.value = ''
      })
    },
    async uploadImg (msg) {
      const that = this
      let options = {
        method: 'post',
        url: `${process.env.IMG_PATH}/File/Upload`,
        data: msg.file,
        timeout: 15000
      }
      try {
        that.$vux.loading.show('发送中')
        const res = await axios(options)
        msg.Image = res.data.data.objectId
        that.$emit('sendMsg', msg)
        that.$vux.loading.hide()
      } catch (error) {
        that.$vux.loading.hide()
        this.$vux.toast.text('网络异常，发送失败')
      }
    },
    checkSize (file, e) {
      if (file.size > 1024 * 1024 * 20) {
        this.$vux.toast.text('上传图片大小超出限制')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.container
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}

.oper_container
{
  display: flex;
  flex-flow: nowrap;
  width: 100%;
  height: 52px;
  .select_img_btn
  {
    position: relative;
    display: block;
    flex: 0 0 60px;
    line-height: 52px;
    text-align: center;
    overflow: hidden;
    .iconfont
    {
      font-size: 36px;
      color: #999;
      z-index: 0;
    }
    input[type=file]
    {
      position: absolute;
      left: 0;
      top: 0;
      visibility: hidden;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
  .input_control_box
  {
    flex: 1;
    padding: 11px 0;
    box-sizing: border-box;
    input
    {
      border: none;
      border-bottom: 1px solid #979797;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      outline: none;
      color: #999;
      border-radius: 0;
      font-size: 14px;
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      background: #fff;
    }
  }
  .emoji_show_container
  {
    flex: 0 0 60px;
    text-align: center;
    line-height: 52px;
    .iconfont
    {
      font-size: 36px;
      color: #999
    }
  }
  .send_msg_container
  {
    flex: 0 0 80px;
    padding: 8px 10px;
    box-sizing: border-box;
    button
    {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 14px;
      color: #fff;
      border-radius: 5px;
      outline: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      background-color: #3ecccc
    }
  }
}
.emoji_container
{
  padding: 15px;
  font-size: 22px;
  text-align: justify
}
</style>

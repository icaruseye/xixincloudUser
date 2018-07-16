<template>
  <div>
    <template  v-if="prewimgList != null">
      <div class="thumbs_container">
        <img  v-for="(item, index) in prewimgList" :src="item.src" :key="index" @click="previewImage(index)" class="previewer-img" alt="">
      </div>
      <div v-transfer-dom>
        <previewer ref="previewer" :list="prewimgList" :options="options"></previewer>
      </div>
    </template>
    <template v-else>
      <p style="font-size: 12px;color: #999; text-align:center;padding: 40px 0">图片列表为空</p>
    </template>
  </div>
</template>
<script>
import { Previewer, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  props: {
    list: ''
  },
  components: {
    Previewer
  },
  computed: {
    prewimgList () {
      if (this.list != null && this.list !== '') {
        const list = this.list.split(',')
        let newList = []
        list.map((item) => {
          newList.push({
            src: this.transformImgUrl(item)
          })
        })
        return newList
      } else {
        return null
      }
    }
  },
  data () {
    return {
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-img')[index]
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
    transformImgUrl (val) {
      if (!val) return
      if (val.indexOf('http') === -1 && val.indexOf('Upload') === -1 && val.indexOf('base64') === -1) {
        return `${process.env.IMG_PATH}/File/GetImage/${val}`
      } else {
        // 值为完整url
        return val
      }
    }
  }
}
</script>
<style lang="less" scoped>
.thumbs_container
{
  padding-top: 20px;
  .previewer-img
  {
    display: inline-block;
    width: 65px;
    height: 65px;
    margin-right: 10px;
  }
}
</style>



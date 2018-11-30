<template>
  <div>
    <template v-if="prewimgList != null">
      <div class="thumbs_container">
        <img v-for="(item, index) in prewimgList" :src="item" :key="index" @click="previewImage(index)" class="previewer-img" alt="">
      </div>
    </template>
    <template v-else>
      <p style="font-size: 12px;color: #999; text-align:center;padding: 40px 0">图片列表为空</p>
    </template>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import util from '@/plugins/util'
export default {
  props: {
    list: ''
  },
  computed: {
    prewimgList () {
      if (this.list != null && this.list !== '') {
        const list = this.list.split(',')
        let newList = []
        list.map((item) => {
          newList.push(util.transformImgUrl(item))
        })
        return newList
      } else {
        return null
      }
    }
  },
  methods: {
    previewImage (index) {
      ImagePreview(this.prewimgList, index)
    }
  }
}
</script>
<style lang="less" scoped>
.thumbs_container
{
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .previewer-img
  {
    display: inline-block;
    width: 65px;
    height: 65px;
    margin-right: 10px;
    margin-bottom: 5px;
  }
}
</style>



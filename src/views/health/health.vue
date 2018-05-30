<template>
  <div>
     <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="开发中" position="middle" @on-hide="onHide">开发中</toast>
  </div>
</template>

<script>
import { Toast } from 'vux'
export default {
  components: {
    Toast
  },
  data () {
    return {
      showPositionValue: true
    }
  },
  methods: {
    onHide () {
      history.back()
    }
  }
}
</script>

<style lang="less" scoped>

</style>

<template>
  <div>
    <service-card></service-card>
    <service-info></service-info>
    <service-comment
      @changeComments="getComments"
      @changeRate="changeRate">
    </service-comment>
  </div>
</template>

<script>
import serviceInfo from '@/views/service/service-info'
import serviceCard from '@/views/service/service-card'
import serviceComment from '@/views/service/service-comment'
export default {
  components: {
    serviceInfo,
    serviceCard,
    serviceComment
  },
  data () {
    return {
      rate: 5,
      comments: ''
    }
  },
  methods: {
    changeRate (val) {
      this.rate = val
    },
    getComments (val) {
      this.comments = val
    }
  }
}
</script>

<style lang="less" scoped>

</style>

<template>
  <div class="loading_container">
    <InlineLoading></InlineLoading>
    <p v-if="text" class="loading_text">{{text}}</p>
  </div>
</template>

<script>
import { InlineLoading } from 'vux'
export default {
  components: {
    InlineLoading
  },
  props: {
    text: {
      type: String,
      default: null
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.loading_container
{
  width: 100%;
  text-align: center;
  padding: 40px 0;
  .loading_text
  {
    font-size: 12px;
    margin-top: 10px;
    color: #999;
  }
}
</style>

<template>
  <div class="coursewareItems_container">
    {{coursewareName}}
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    coursewareName: {
      type: String,
      default: ''
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
.coursewareItems_container{
  height: 40px;
  background-color: #fff;
  margin-bottom: 10px;
}
</style>

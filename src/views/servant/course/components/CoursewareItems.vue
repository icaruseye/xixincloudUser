<template>
  <div class="coursewareItems_container">
    <i class="coursewareItems_type_icon iconfont icon-ppt"></i>
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
  background-color: #fff;
  line-height: 20px;
  display: flex;
  justify-content: left;
  flex-flow: nowrap;
  align-items: center;
  padding: 10px;
  color: #5d5d5d;
  text-align: justify;
  font-size: 14px;
  border-bottom: 1px solid #f6f6f6;
  .coursewareItems_type_icon
  {
    flex: 0 0 40px;
    display: block;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
    font-size: 30px;
    color: rgb(227, 66, 33);
  }
}
</style>

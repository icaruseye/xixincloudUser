<template>
  <div class="wrapper">
    <div class="course_list">
      <div class="course_list_item">
        <img src="https://tvax1.sinaimg.cn/crop.0.0.473.473.180/78258c21ly8ft5x6jpwepj20d50d5wec.jpg" alt="" class="icon">
        <div class="title">珂珂珂珂</div>
        <button class="btn">去学习</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.course_list {
  margin-top: 15px;
  background: #fff;
  padding: 0 12px;
}

.course_list_item {
  padding: 15px 0;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 4px;
  }
  .title {
    flex: 1;
    font-size: 16px;
    color: #666
  }
  .btn {
    font-size: 12px;
    background: #3ecccc;
    color: #fff;
    border: 0;
    border-radius: 15px;
    padding: 2px 8px;
  }
}
</style>

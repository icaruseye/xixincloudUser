<template>
  <div class="has-tabbar">
    <div class="package-box">
      <div class="package-box_title">默认分类</div>
      <div class="package-box_list">
        <div class="package-box_item">
          <div class="top">
            <div><img class="poster" src="@/assets/images/calendar-cate-1.png" alt=""></div>
            <div class="top-md">
              <p class="top-md_mtext">上门打针</p>
              <div>
                <span class="top-md_stext">剩余：<span class="color-ye">3次</span></span>
                <span class="top-md_stext">可预约：<span class="color-ye">3次</span></span>
              </div>
            </div>
            <div class="top-rd">
              <a href="javascript:;" @click="goReserve(1)">快速预约</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <xx-tabbar></xx-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goReserve (id) {
      this.$router.push(`/service/reserve/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.package-box {
  background: #fff;
  padding: 0 15px;
  .package-box_title {
    padding: 10px 0;
    font-size: 14px;
    color: #666;
  }
}

.package-box_item {
  position: relative;
  padding: 15px 0;
  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d9f7f5 ;
    color: #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .top {
    display: flex;
    width: 100%;
    font-size: 14px;
    align-items: center;
    .poster {
      margin-right: 10px;
      width: 50px;
      display: block;
    }
    .top-md {
      flex: 1;
      .top-md_mtext {
        font-size: 15px;
        color: #666;
      }
      .top-md_stext {
        margin-top: 5px;
        float: left;
        height: 12px;
        line-height: 12px;
        padding-right: 10px;
        border-right: 1px solid #CECECE;
        font-size: 12px;
        color: #999;
        &:last-child {
          border: 0;
          padding: 0 10px;
        }
      }
    }
    .top-rd {
      a {
        display: block;
        padding: 5px 10px;
        font-size: 14px;
        color: #fff;
        background: #3ecccc;
        border-radius: 2px;
      }
    }
  }
}
</style>

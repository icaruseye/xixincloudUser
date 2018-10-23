<template>
  <div class="step_wrapper">
    <div class="step_items">
      <div class="step_item">
        <div class="step_item_title">第一章</div>
        <i class="step__circle"></i>
        <div class="step__line"></div>
        <div class="step_item_content">
          <div class="sub_item">
            <div class="sub_item_title">1节 小儿生长发育
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
              </svg>
            </div>
            <div class="sub_item_time">30分钟</div>
            <i class="step__subcircle"></i>
            <div class="step__subline"></div>
          </div>
        </div>
      </div>
      <div class="step_item">
        <div class="step_item_title">第2章</div>
        <div class="step__line"></div>
        <i class="step__circle"></i>
        <div class="step_item_content">
          <div class="sub_item">
            <div class="sub_item_title">1节 小儿生长发育</div>
            <div class="sub_item_time">30分钟</div>
            <i class="step__subcircle"></i>
            <div class="step__subline"></div>
          </div>
          <div class="sub_item">
            <div class="sub_item_title">1节 小儿生长发育</div>
            <div class="sub_item_time">30分钟</div>
            <i class="step__subcircle"></i>
            <div class="step__subline"></div>
          </div>
        </div>
      </div>
      <div class="step_item">
        <div class="step_item_title">第3章</div>
        <div class="step__line"></div>
        <i class="step__circle"></i>
        <div class="step_item_content">
          <div class="sub_item">
            <div class="sub_item_title">1节 小儿生长发育</div>
            <div class="sub_item_time">30分钟</div>
            <i class="step__subcircle"></i>
            <div class="step__subline"></div>
          </div>
          <div class="sub_item">
            <div class="sub_item_title">1节 小儿生长发育</div>
            <div class="sub_item_time">30分钟</div>
            <i class="step__subcircle"></i>
            <div class="step__subline"></div>
          </div>
        </div>
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
.step_wrapper {
  background: #fff;
  padding: 20px 15px 20px 50px;
  .step_item {
    position: relative;
    font-size: 15px;
    color: #666;
    padding-bottom: 20px;
    &:last-child {
      padding-bottom: 0;
    }
    .step_item_title {
      padding: 5px 0;
      color: #333
    }
    .step_item_content {
      transition: height .3s ease-in-out;
      .sub_item {
        position: relative;
        padding-top: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid RGBA(233, 233, 233, .3);
        &:first-child {
          padding-top: 0
        }
        .step__subline {
          position: absolute;
          top: 0;
          left: -30px;
          width: 1px;
          height: 100%;
          background-color: RGBA(237, 237, 238, .5);
        }
        .step__subcircle {
          position: absolute;
          top: 30px;
          left: -32px;
          z-index: 2;
          display: block;
          width: 5px;
          height: 5px;
          background-color: RGBA(216, 216, 216, .3);
          border-radius: 50%;
        }
        &:first-child {
          .step__subcircle {
            top: 10px;
          }
        }
      }
      .sub_item_time {
        font-size: 12px;
        color: #999;
      }
    }
    .iconfont {
      margin-left: 10px;
      font-size: 12px;
      color: #ccc;
    }
    .step__line {
      position: absolute;
      top: 0;
      left: -30px;
      width: 1px;
      height: 100%;
      background-color: RGBA(237, 237, 238, .5);
    }
    &:first-child::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 15px;
      background-color: #fff;
      top: 0;
      left: -30px;
      z-index: 1;
    }
    &:last-child {
      .step__line {
        background: #fff;
      }
      &::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 15px;
        background-color: #EDEDEE;
        top: 0;
        left: -30px;
        z-index: 1;
      }
      .sub_item {
        &:last-child {
          .step__subline {
            background: #fff;
          }
        }
        &:last-child::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 30px;
          background-color: RGBA(237, 237, 238, .5);
          top: 0;
          left: -30px;
          z-index: 1;
        }
        &:first-child::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 10px;
          background-color: RGBA(237, 237, 238, .5);
          top: 0;
          left: -30px;
          z-index: 1;
        }
      }
    }
    .step__circle {
      position: absolute;
      top: 15px;
      left: -34px;
      z-index: 2;
      display: block;
      width: 3px;
      height: 3px;
      background-color: #D8D8D8;
      border: 3px solid #F1F1F1;
      border-radius: 50%;
    }
  }
}
</style>

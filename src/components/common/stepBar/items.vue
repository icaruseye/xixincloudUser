<template>
    <div class="step_items" :class="className">
        <div class="index_circle_box">
          <i class="index_circle">{{index}}</i>
        </div>
        <p class="step_text">
          <slot></slot>
        </p>
    </div>
</template>
<script>
export default {
  props: {
    lineStyle: {
      type: String,
      default: 'dashed'
    }
  },
  data () {
    return {
      index: 1,
      active: false
    }
  },
  computed: {
    className () {
      const that = this
      return `${that.active ? 'active' : ''} ${that.lineStyle === 'solid' ? 'solid' : 'dashed'}`
    }
  }
}
</script>
<style scoped lang="less">
  .step_items
  {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex: 1;
  }
  .index_circle_box
  {
    position: relative;
    height: 22px;
    width: 100%;
  }
  .index_circle_box::before,
  .index_circle_box::after
  {
    position: absolute;
    top: 50%;
    display: block;
    content: '';
    width: calc(50% - 22px);
    border-top: 1px dashed #ccc;
    transform: translateY(-50%);
  }
  .dashed .index_circle_box::before,
  .dashed .index_circle_box::after{
    border-top-style: dashed !important;
  }
  .solid .index_circle_box::before,
  .solid .index_circle_box::after{
    border-top-style: solid !important;
  }
  .dashed .index_circle_box::before
  {
    left: 1px;
  }
  .dashed .index_circle_box::after
  {
    right: 1px;
  }
  .solid .index_circle_box::before
  {
    left: 0;
  }
  .solid .index_circle_box::after
  {
    right: 0;
  }
  .step_items:first-child .index_circle_box::before,
  .step_items:last-child .index_circle_box::after
  {
    display: none;
  }

  .index_circle
  {
    display: block;
    margin: 0 auto;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    color: #ffffff;
    font-style: normal;
    background-color: #CCCCCC;
  }

  .step_text
  {
    display: block;
    margin-top: 7px;
    height: 18px;
    font-size: 13px;
    color: #cccccc;
  }

  .active .index_circle
  {
    background-color: @theme-color;
  }
  .active .step_text
  {
    color: @theme-color;
  }

  .active .index_circle_box::before,
  .active .index_circle_box::after
  {
    border-color: @theme-color;
  }
</style>



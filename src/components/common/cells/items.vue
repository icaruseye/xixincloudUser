<template>
    <div class="xx-cells-items box_border" :class="direction + '_direction'">
      <label v-if="label" class="xx-cells-items_label">
        <span v-if="required" style="color:#FF3939; padding-right: 5px">* </span>{{label}}
      </label>
      <div class="content_container">
        <slot></slot>
      </div>
    </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: null
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      required: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style scoped>
  .box_border
  {
    box-sizing: border-box;
  }
  .xx-cells-items
  {
    display: flex;
    position: relative;
    margin: 0 11px;
    padding: 25px 0 10px;
  }

  .horizontal_direction
  {
    align-items: center;
    flex-flow: nowrap;
  }
  .vertical_direction
  {
    align-items: left;
    flex-flow: column;
  }
  .content_container
  {
    flex: 1;
  }
  .vertical_direction .content_container
  {
    width: 100%;
  }
  .xx-cells-items::after
  {
    position: absolute;
    content: '';
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleY(.5);
    background-color: #D8F4FD;
  }
  .xx-cells-items:last-child::after
  {
    display: none;
  }
  .xx-cells-items_label
  {
    display: flex;
    align-content: center;
    font-size: 16px;
    color: #333;
    height: 22px;
    line-height: 22px;
    font-weight: normal;
    text-align: left;
  }
  .horizontal_direction .xx-cells-items_label
  {
    flex: 1;
  }
  .vertical_direction
  .content_container .xx-cells-items_label
  {
    flex: 0 0 22px;
  }
</style>

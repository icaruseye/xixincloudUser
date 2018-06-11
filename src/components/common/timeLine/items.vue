<template>
  <div class="time-line_items_container" :class="{active_items: active}">
    <div class="time-line_items_left">
      <i class="time-line_items_icon">{{index}}</i>
    </div>
    <h2 v-if="title" class="time-line_container_title">
      {{title}}
      <span v-if="subhead" style="position: absolute;right: 0px;top: 0;font-size: 13px;color: #999999;">{{subhead}}</span>
    </h2>
    <div class="content_container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      subhead: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        index: 1,
        active: false
      }
    }
  }
</script>
<style scoped>
  .time-line_items_container
  {
    position: relative;
    padding-left: 58px;
    min-height: 25px;
    padding-bottom: 15px;
    margin-right: 10px;
  }
  .time-line_items_left
  {
    position: absolute;
    width: 58px;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .time-line_items_icon
  {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -9px;
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: #999;
    font-size: 13px;
    line-height: 19px;
    text-align: center;
    font-style: normal;
    border: 1px solid #999;
  }
  .time-line_items_left::after
  {
    position: absolute;
    top: 23px;
    bottom: 9px;
    display: block;
    content: "";
    width: 1px;
    left: 50%;
    background-color: #999;
    transform: translateX(-50%) scaleX(.5);
  }
  .active_items .time-line_items_icon
  {
    border-color: #3ecccc;
    background-color: #3ecccc;
    color: #ffffff;
  }
  .active_items .time-line_items_left::after
  {
    background-color: #3ecccc;
  }
  .time-line_items_container:last-child .time-line_items_left:after
  {
    display: none;
  }
  .time-line_container_title
  {
    position: relative;
    font-size: 16px;
    color: #333333;
    font-weight: normal;
    height: 23px;
    line-height: 23px;
  }
  .content_container
  {
    margin-top: 5px;
  }
</style>

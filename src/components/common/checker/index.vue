<template>
    <label class="xx-checker">
      <span class="xx-checker__input">
        <input :type="typeName"
               :name="name"
               v-model="model"
               @change="handleChange"
               aria-hidden="true"
               @click.stop="stop"
               class="xx-checker__original">
        <span class="xx-checker__inner"></span>
      </span>
      <slot></slot>
    </label>
</template>
<script>
  export default{
    props: {
      typeName: {
        type: String,
        default: 'radio'
      },
      name: {
        type: String,
        default: ''
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      stop () {},
      handleChange () {
        this.$nextTick(() => {
          this.$emit('change', this.model)
        })
      }
    }
  }
</script>
<style scoped>
  .xx-checker {
    padding-left: 35px;
    min-height: 20px;
    line-height: 20px;
    color: #999999;
    font-weight: 400;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .xx-checker__input {
    position: absolute;
    left: 0;
    top: 0;
    height: 20px;
    width: 20px;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
  }
  .xx-checker__inner
  {
    border: 1px solid #999999;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
  }
  .xx-checker__inner::after {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #fff;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) scale(0);
    transition: transform .15s ease-in;
  }
  .xx-checker__original
  {
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
  }
  .xx-checker__original:checked + .xx-checker__inner {
    border-color: #3ecccc;
  }
  .xx-checker__original:checked + .xx-checker__inner::after {
    background-color: #3ecccc;
    transform: translate(-50%,-50%) scale(1);
  }
</style>

<template>
  <div class="xixin-tab-wrap">
    <div class="xixin-tab-container">
      <div
        class="xixin-tab"
        :class="[{'xixin-tab-no-animate': !animate},{ scrollable }]"
        ref="nav">
        <slot></slot>
        <div
          v-if="animate"
          class="xixin-tab-ink-bar"
          :class="barClass"
          :style="barStyle">
          <span
            class="xixin-tab-bar-inner"
            :style="innerBarStyle"
            v-if="customBarWidth"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parentMixin } from '../../mixins/multi-items'
export default {
  name: 'tab',
  mixins: [parentMixin],
  mounted () {
    // stop bar anmination on first loading
    this.$nextTick(() => {
      setTimeout(() => {
        this.hasReady = true
      }, 0)
    })
  },
  props: {
    lineWidth: {
      type: Number,
      default: 4
    },
    activeColor: String,
    defaultColor: String,
    animate: {
      type: Boolean,
      default: true
    },
    scrollThreshold: {
      type: Number,
      default: 4
    },
    customBarWidth: [Function, String]
  },
  computed: {
    barLeft () {
      if (this.hasReady) {
        const count = this.scrollable ? (window.innerWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width) : this.number
        return `${this.currentIndex * (100 / count)}%`
      }
    },
    barRight () {
      if (this.hasReady) {
        const count = this.scrollable ? (window.innerWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width) : this.number
        return `${(count - this.currentIndex - 1) * (100 / count)}%`
      }
    },
    // when prop:custom-bar-width
    innerBarStyle () {
      return {
        width: typeof this.customBarWidth === 'function' ? this.customBarWidth(this.currentIndex) : this.customBarWidth,
        backgroundColor: this.barActiveColor || this.activeColor
      }
    },
    barStyle () {
      const commonStyle = {
        left: this.barLeft,
        right: this.barRight,
        display: 'block',
        height: this.lineWidth + 'px',
        transition: !this.hasReady ? 'none' : null
      }
      if (!this.customBarWidth) {
        commonStyle.backgroundColor = this.barActiveColor || this.activeColor
      } else {
        commonStyle.backgroundColor = 'transparent' // when=prop:custom-bar-width
      }
      return commonStyle
    },
    barClass () {
      return {
        'xixin-tab-ink-bar-transition-forward': this.direction === 'forward',
        'xixin-tab-ink-bar-transition-backward': this.direction === 'backward'
      }
    },
    scrollable () {
      return this.number > this.scrollThreshold
    }
  },
  watch: {
    currentIndex (newIndex, oldIndex) {
      this.direction = newIndex > oldIndex ? 'forward' : 'backward'
      this.$emit('on-index-change', newIndex, oldIndex)
      this.hasReady && this.scrollToActiveTab()
    }
  },
  data () {
    return {
      direction: 'forward',
      right: '100%',
      hasReady: false
    }
  },
  methods: {
    scrollToActiveTab () {
      if (!this.scrollable || !this.$children || !this.$children.length) {
        return
      }
      const currentIndexTab = this.$children[this.currentIndex].$el
      let count = 0
      // scroll animation
      const step = () => {
        const scrollDuration = 15
        const nav = this.$refs.nav
        nav.scrollLeft += (currentIndexTab.offsetLeft - (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 - nav.scrollLeft) / scrollDuration
        if (++count < scrollDuration) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  }
}
</script>

<style lang="less" scoped>

@easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
@effect-duration: .3s;

.xixin-tab {
  &-ink-bar {
    position: absolute;
    height: 2px;
    bottom: 7px;
    left: 0;
    background-color: #3AC7F5;
    text-align: center;
    &-transition-forward {
      transition: right @effect-duration @easing-in-out,
      left @effect-duration @easing-in-out @effect-duration * 0.3;
    }
    &-transition-backward {
      transition: right @effect-duration @easing-in-out @effect-duration * 0.3,
      left @effect-duration @easing-in-out;
    }
  }
}

.xixin-tab {
  display: flex;
  background-color: #fff;
  height: 49px;
  position: relative;
  // box-shadow: 0 1px 6px RGBA(153, 153, 153, 0.5);
}

.xixin-tab .xixin-tab-item {
  display: block;
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 15px;
  text-align: center;
  line-height: 49px;
  color: #999;
}

.xixin-tab .xixin-tab-item.xixin-tab-selected {
  color: #3AC7F5;
}

.xixin-tab-bar-inner {
  display: block;
  background-color: @tab-text-active-color;
  margin: auto;
  border-radius: 4px;
  height: 100%;
  transition: width 0.3s @easing-in-out;
}

.scrollable {
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 17px;
  box-sizing: content-box;
}
.scrollable::-webkit-scrollbar {
  display: none;
}
.scrollable .xixin-tab-ink-bar {
  bottom: 17px;
  position: absolute;
}
.scrollable .xixin-tab-item {
  flex: 0 0 22%;
}
</style>

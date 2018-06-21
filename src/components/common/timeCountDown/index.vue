<template>
  <span>{{result}}</span>
</template>

<script>
export default {
  props: {
    startTime: Number
  },
  data () {
    return {
      result: ''
    }
  },
  created () {
    if (this.startTime) {
      window.timeCountDown = setInterval(() => {
        let t = this.getCountDown(this.startTime)
        if (t <= 0) {
          clearInterval(window.timeCountDown)
        }
      }, 1000)
    }
  },
  methods: {
    getCountDown (startTime) {
      let t = 1000 * 60 * 60 * 24 * 3 + startTime - Date.parse(new Date())
      let seconds = Math.floor((t / 1000) % 60)
      let minutes = Math.floor((t / 1000 / 60) % 60)
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
      let days = Math.floor(t / (1000 * 60 * 60 * 24))
      this.result = `${days}天${hours}小时${minutes}分钟${seconds}秒`
      return t
    }
  }
}
</script>

<style scoped>

</style>
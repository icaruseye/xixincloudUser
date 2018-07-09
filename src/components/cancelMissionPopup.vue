<template>
  <div>
    <popup v-model="modelValue" height="60%">
      <popup-header
        left-text="取消"
        right-text="确定"
        title="确认取消任务"
        :show-bottom-border="false"
        @on-click-left="modelValue = false"
        @on-click-right="cancelMissionEvent()"></popup-header>
      <group>
        <radio title="时间冲突" v-model="radioValue" :options="options">
        </radio>
      </group>
      <group>
        <x-textarea placeholder="请填写取消原因" v-model="cancelDescription" style="background:#fff"></x-textarea>
      </group>
    </popup>
  </div>
</template>
<script>
import { Popup, Radio, Group, PopupHeader, XTextarea } from 'vux'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    missionID: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      radioValue: 1,
      cancelDescription: '',
      options: [
        {
          key: '1',
          value: '时间冲突'
        },
        {
          key: '2',
          value: '地点冲突'
        },
        {
          key: '999',
          value: '其他'
        }
      ]
    }
  },
  methods: {
    /**
     * 取消预约单
     */
    cancelMissionEvent () {
      const that = this
      that.$vux.confirm.show({
        content: '任务取消后不可恢复，请谨慎操作！',
        confirmText: '仍然取消',
        cancelText: '放弃',
        onConfirm () {
          that.cancelMission()
        }
      })
    },
    cancelMission () {
      const that = this
      this.$emit('confirmCancel', {
        CancelType: that.radioValue,
        CancelDescription: that.cancelDescription
      })
    }
  },
  computed: {
    modelValue: {
      set (val) {
        this.$emit('input', val)
      },
      get () {
        return this.value
      }
    }
  },
  components: {
    Popup,
    Radio,
    Group,
    PopupHeader,
    XTextarea
  }
}
</script>

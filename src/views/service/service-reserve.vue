<template>
  <div class="wrap has-tabbar">
    <xx-step-bar step="1">
      <xx-step-items slot="items">
        预约
      </xx-step-items>
      <xx-step-items slot="items">
        服务中
      </xx-step-items>
      <xx-step-items slot="items">
        已完成
      </xx-step-items>
    </xx-step-bar>
    <xx-cell class="mgt10">
      <xx-cell-items label="服务地址" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div style="display:flex;align-items:center;justify-content:flex-end;width:220px;text-align:right;">
          <img style="width:10px;height:auto" src="@/assets/images/ic_address.png" />
          <div style="padding:0 0 0 5px;text-align:left">四川省成都市锦江区天府大</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </xx-cell-items>
      <xx-cell-items label="服务项" class="noraml_cell noraml_cell-right" style="padding: 20px 0 15px 0;">
        <div style="padding-right:15px">PICC换药</div>
      </xx-cell-items>
      <xx-cell-items label="服务人员" class="noraml_cell noraml_cell-right" style="padding: 20px 0 15px 0;">
        <div style="padding-right:15px">医师啊</div>
      </xx-cell-items>
    </xx-cell>
    <h2 class="cells_title">
      能接受服务时间段
    </h2>
    <xx-cell>
      <xx-cell-items label="开始时间" @click.native="selectStartTime" class="noraml_cell noraml_cell-right" style="padding: 20px 0 15px 0;">
        <div style="padding-right:15px">{{startTime}}</div>
      </xx-cell-items>
      <xx-cell-items label="结束时间" @click.native="selectEndTime" class="noraml_cell noraml_cell-right" style="padding: 20px 0 15px 0;">
        <div style="padding-right:15px">{{endTime}}</div>
      </xx-cell-items>
    </xx-cell>
    <xx-cell class="mgt10">
      <xx-cell-items label="病情症状或备注" direction="vertical" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div class="service_remark_textarea_container">
          <textarea v-model="remark" class="service_remark_textarea" placeholder="请输入备注"></textarea>
          <span class="service_remark_textarea_nums_count">{{remark.length}} / 200</span>
        </div>
      </xx-cell-items>
      <xx-cell-items label="相关医嘱病历图片上传" direction="vertical" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <xx-uploader
          class="upload"
          :maxSize="1024 * 1024 * 2"
          :imgList="imgList1"
          @onUpdate="onUpdate1"
        ></xx-uploader>
      </xx-cell-items>
      <xx-cell-items label="需要服务人员准备必要工具" @click.native="changeRadio1" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div style="display: flex;justify-content: flex-end;">
          <xx-checker v-model="radioValue1" typeName="checkbox" name="xxx" style="display:block;"></xx-checker>
        </div>
      </xx-cell-items>
      <xx-cell-items label="需要服务人员准备必要药品" @click.native="changeRadio2" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div style="display: flex;justify-content: flex-end;">
          <xx-checker v-model="radioValue2" typeName="checkbox" name="xxx" style="display:block;"></xx-checker>
        </div>
      </xx-cell-items>
    </xx-cell>
    <button type="button" class="weui-btn weui-btn_primary" style="position:fixed;bottom:0">确定</button>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
const dataFormatRule = 'YYYY/MM/DD HH:mm'
export default {
  data () {
    const that = this
    return {
      address1: '四川省成都市天府新区家里123123123',
      startTime: dateFormat(new Date(), dataFormatRule),
      endTime: dateFormat(that.addOneDay(new Date()), dataFormatRule),
      mark: '',
      value1: false,
      value2: false,
      imgList1: [],
      remark: '',
      radioValue1: false,
      radioValue2: false
    }
  },
  methods: {
    addOneDay (date) {
      return new Date(date.getTime() + 24 * 60 * 60 * 1000)
    },
    selectStartTime () {
      const that = this
      this.$vux.datetime.show({
        format: dataFormatRule,
        value: that.startTime,
        title: '选择开始时间',
        confirmText: '确定',
        cancelText: '取消',
        yearRow: `{value}年`,
        monthRow: `{value}月`,
        dayRow: `{value}日`,
        hourRow: `{value}时`,
        minuteRow: `{value}分`,
        onConfirm (val) {
          that.startTime = val
          that.endTime = dateFormat(that.addOneDay(new Date(val)), dataFormatRule)
        }
      })
    },
    selectEndTime () {
      const that = this
      this.$vux.datetime.show({
        format: dataFormatRule,
        value: that.endTime,
        title: '选择结束时间',
        confirmText: '确定',
        cancelText: '取消',
        yearRow: `{value}年`,
        monthRow: `{value}月`,
        dayRow: `{value}日`,
        hourRow: `{value}时`,
        minuteRow: `{value}分`,
        onConfirm (val) {
          that.endTime = val
        }
      })
    },
    changeRadio1 () {
      this.radioValue1 = !this.radioValue1
    },
    changeRadio2 () {
      this.radioValue2 = !this.radioValue2
    },
    onUpdate1 (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>
.cells_title {
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  font-size: 15px;
  color: #999;
  font-weight: normal;
}
.noraml_cell {
  font-size: 13px;
  color: #999;
}
.noraml_cell-right {
  padding-left: 10px;
  text-align: right;
}
.icon-jiantouyou {
  font-size: 13px;
}
.service_remark_textarea_container {
  margin-top: 12px;
  position: relative;
  height: 115px;
  border: 1px solid #E7F9F8;
}
.service_remark_textarea {
  box-sizing: border-box;
  outline: none;
  padding: 12px;
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.service_remark_textarea_nums_count {
  position: absolute;
  right: 16px;
  bottom: 7px;
  height: 18px;
  line-height: 18px;
  color: #999999;
  font-size: 13px;
}
</style>

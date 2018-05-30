<template>
  <div>
    <div class="form-panel">
      <div class="weui-form-cell">
        <div class="weui-cell-top is-row">
          <div class="title">服务地址</div>
          <div class="row">{{address1}}</div>
        </div>
        <i class="iconfont icon-jiantouyou"></i>
      </div>
      <div class="weui-form-cell">
        <div class="weui-cell-top is-row">
          <div class="title">服务项</div>
          <div class="row">服务项：上门输液 服务人员:名好牛</div>
        </div>
      </div>
      <div class="weui-form-cell">
        <div class="weui-cell-top is-row">
          <div class="title">我能接受的服务时间段</div>
          <div class="row">
            <group>
              <datetime
                v-model="startDate"
                title="从"
                format="YYYY-MM-DD HH:mm"
                placeholder="请选择开始时间"
                @on-change="changeStartDate"
                @on-confirm="onConfirmSDate"></datetime>
            </group>
          </div>
          <div class="row">
            <group class="group">
              <datetime
                title="到"
                v-model="endDate"
                format="YYYY-MM-DD HH:mm"
                placeholder="请选择结束时间"
                @on-change="changeEndDate"
                @on-confirm="onConfirmEDate"></datetime>
            </group>
          </div>
        </div>
      </div>
      <div class="weui-form-cell">
        <div class="weui-cell-top is-row">
          <div class="title">病状描述或备注</div>
          <group>
            <x-textarea v-model="mark" :height="100" :max="200" placeholder="请输入症状描述信息和服务备注信息"></x-textarea>
          </group>
        </div>
      </div>
      <uploader
        title="相关医嘱病历图片上传"
        :limit="1"
        :maxSize="1024 * 1024 * 2"
        :imgList="imgList1"
        @onUpdate="onUpdate1"
      ></uploader>
      <group>
        <x-switch title="需服务人员准备必要工具" v-model="value1"></x-switch>
      </group>
      <group>
        <x-switch title="需服务人员准备必要药品" v-model="value2"></x-switch>
      </group>
      <div class="weui-form-cell"><a class="weui-btn weui-btn_primary">保存</a></div>
    </div>
  </div>
</template>

<script>
import { Group, Popup, Datetime, XTextarea, XSwitch } from 'vux'
import uploader from '@/components/common/uploader'
export default {
  components: {
    Group,
    Popup,
    Datetime,
    XTextarea,
    uploader,
    XSwitch
  },
  data () {
    return {
      address1: '四川省成都市天府新区家里123123123',
      startDate: '',
      endDate: '',
      mark: '',
      value1: false,
      value2: false,
      imgList1: []
    }
  },
  methods: {
    changeStartDate (val) {
      console.log(val)
    },
    changeEndDate (val) {
      console.log(val)
    },
    onConfirmSDate (val) {
      console.log(val)
    },
    onConfirmEDate (val) {
      console.log(val)
    },
    onUpdate1 (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>
.select-info {
  flex: 1;
}

.icon-jiantouyou {
  color: @yellow
}

.datetime {
  p {
    color: @yellow;
  }
}

.group {
  .weui-cells {
    &:before {
      border: 0;
    }
  }
}

.form-panel {
  .weui-form-cell {
    display: flex;
    align-items: center;
    .weui-cell-top {
      flex: 1;
    }
  }
  .weui-cell-top.is-row {
    display: block;
    .title,.row {
      font-size: 14px;
      width: 100%;
    }
    .row {
      color: #999;
      font-size: 13px;
    }
  }
}
</style>

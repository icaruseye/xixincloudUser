<template>
  <div>
    <div class="form-panel">
      <div class="weui-form-cell">
        <x-address title="省市区" :raw-value="true" v-model="UserAddress.citys" :list="addressData" class="address-picker" placeholder="请选择地址" value-text-align="center"></x-address>
        <input v-model="UserAddress.citys" name="citys" type="hidden">
      </div>
      <div class="weui-form-cell">
        <div class="weui-cell-top">
            <label class="label" for="">具体地址</label>
            <input v-model="UserAddress.SpecificAddress" name="address" type="text" placeholder="请输入具体地址">
        </div>
      </div>
      <div class="weui-form-cell">
        <div class="weui-cell-top">
            <label class="label" for="" style="width:95px">标签</label>
            <input v-model="UserAddress.Remark" name="tag" type="text" placeholder="请输入标签" style="width:70px;">
            <checker v-model="UserAddress.Remark" :radio-required="true" default-item-class="tags-item" selected-item-class="tags-item-selected">
              <checker-item value="家">家</checker-item>
              <checker-item value="公司">公司</checker-item>
              <checker-item value="其他">其他</checker-item>
            </checker>
        </div>
      </div>
      <div class="weui-form-cell">
        <p class="weui-cell-top">
          <label class="label" for="" style="width:95px" >是否默认</label>
          <inline-x-switch v-model="UserAddress.IsDefault" :value-map="[0, 1]" :disabled="defaultOnly"></inline-x-switch>
        </p>
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary" @click="save">保存</button>
  </div>
</template>

<script>
import http from '@/api/index'
import { Group, XAddress, ChinaAddressV4Data, Checker, CheckerItem, InlineXSwitch, ToastPlugin } from 'vux'
import util from '@/plugins/util'
import Vue from 'vue'
Vue.use(ToastPlugin)
export default {
  components: {
    XAddress,
    Group,
    Checker,
    CheckerItem,
    InlineXSwitch
  },
  data () {
    return {
      addressData: ChinaAddressV4Data,
      address: '',
      defaultOnly: false,
      UserAddress: {
        IsDefault: 1,
        citys: [],
        SpecificAddress: '',
        Remark: '家'
      },
      authText: {
        IsDefault: {
          required: false
        },
        citys: {
          text: '省市区地址',
          required: true
        },
        SpecificAddress: {
          text: '详细地址',
          required: true
        },
        Remark: {
          text: '标签',
          required: true
        }
      }
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (id !== 'add') {
      this.getData(id)
    }
    if (this.$route.query.first === '1') {
      this.defaultOnly = true
    }
  },
  methods: {
    getData (id) {
      console.log(this.$route)
    },
    async save () {
      const isValidate = util.validateForm(this.UserAddress, this.authText)
      if (isValidate) {
        const UserAddress = {
          IsDefault: this.UserAddress.IsDefault,
          Province: this.UserAddress.citys[0],
          City: this.UserAddress.citys[1],
          Area: this.UserAddress.citys[2],
          SpecificAddress: this.UserAddress.SpecificAddress,
          Remark: this.UserAddress.Remark
        }
        const res = await http.post('/UserAddress', UserAddress)
        console.log(res)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.weui-btn {
  position: fixed;
  bottom: 0;
}

.form-panel {
  .vux-no-group-title {
    margin-top: 0;
  }
  .weui-cells {
    margin-top: 0;
  }
  .weui-cell:before {
    left: 0;
  }
}

.tags-item {
  width: 40px;
  color: #3ecccc;
  height: 22px;
  line-height: 22px;
  border: 1px solid #3ecccc;
  box-sizing: border-box;
  text-align: center;
  border-radius: 2px;
  font-size: 12px;
}
.tags-item-selected {
  color: #fff;
  background: #3ecccc;
}
.vux-checker-box {
  width: 130px;
  flex-shrink: 0;
}
</style>

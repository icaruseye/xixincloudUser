<template>
  <div>
    <div class="form-panel">
      <div class="weui-form-cell">
        <x-address title="省市区" v-model="citys" :list="addressData" class="address-picker" placeholder="请选择地址" value-text-align="center"></x-address>
        <input v-model="citys" v-validate="'required'" name="citys" type="hidden">
        <span v-show="errors.has('citys')" class="help is-danger">{{ errors.first('citys') }}</span>
      </div>
      <div class="weui-form-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="">具体地址</label>
            <input v-model="UserAddress.SpecificAddress" v-validate="'required'" name="address" type="text" placeholder="请输入具体地址">
        </p>
        <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
      </div>
      <div class="weui-form-cell">
        <p class="weui-cell-top" :class="{ 'control': true }">
            <label class="label" for="" style="width:95px">标签</label>
            <input v-model="UserAddress.Remark" v-validate="'required'" name="tag" type="text" placeholder="请输入标签" style="width:70px;">
            <checker v-model="UserAddress.Remark" :radio-required="true" default-item-class="tags-item" selected-item-class="tags-item-selected">
              <checker-item value="家">家</checker-item>
              <checker-item value="公司">公司</checker-item>
              <checker-item value="其他">其他</checker-item>
            </checker>
        </p>
        <span v-show="errors.has('tag')" class="help is-danger">{{ errors.first('tag') }}</span>
      </div>
      <div class="weui-form-cell">
        <p class="weui-cell-top">
          <label class="label" for="" style="width:95px">是否默认</label>
          <inline-x-switch v-model="isdefault"></inline-x-switch>
        </p>
      </div>
    </div>
    <button type="button" class="weui-btn weui-btn_primary" @click="save">保存</button>
  </div>
</template>

<script>
import http from '@/api/index'
import { Group, XAddress, ChinaAddressV4Data, Checker, CheckerItem, InlineXSwitch } from 'vux'
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
      citys: [],
      address: '',
      isdefault: true,
      userInfo: JSON.parse(sessionStorage.getItem('GET_USER_INFO')),
      UserAddress: {
        ID: '',
        State: '',
        IsDefault: '',
        UserID: '',
        Province: '',
        City: '',
        Area: '',
        SpecificAddress: '',
        Remark: '',
        FinalOperateTime: ''
      }
    }
  },
  mounted () {
    let id = this.$route.params.id
    if (id !== 'add') {
      this.getData(id)
    }
  },
  methods: {
    getData (id) {
      console.log(id)
    },
    async save () {
      let res = await this.$validator.validateAll()
      if (res) {
        this.UserAddress.Province = this.citys[0]
        this.UserAddress.City = this.citys[1]
        this.UserAddress.Area = this.citys[2]
        const UserAddress = {
          ID: this.userInfo.ID,
          State: '',
          IsDefault: '',
          UserID: '',
          Province: this.UserAddress.Province,
          City: this.UserAddress.City,
          Area: this.UserAddress.Area,
          SpecificAddress: this.UserAddress.SpecificAddress,
          Remark: this.UserAddress.Remark,
          FinalOperateTime: ''
        }
        const res = await http.post('/UserAddress', UserAddress)
        console.log(res)
      } else {
        // 设置焦点到第一个未验证通过的表单元素
        let field = this.$validator.errors.items[0].field
        this.$validator.fields.items.map((i) => {
          if (i.name === field) {
            return i.el.focus()
          }
        })
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

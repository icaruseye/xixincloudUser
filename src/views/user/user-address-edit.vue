<template>
  <div style="position:fixed;left:0;top:0;right:0;">
    <div class="form-panel">
      <div class="weui-form-cell">
        <x-address
          title="省市区"
          v-model="data.citys"
          :list="addressData"
          class="address-picker"
          placeholder="请选择地址"
          value-text-align="center"
          @on-hide="addressOnHide"
          :popup-style="{'z-index': 503}">
        </x-address>
        <input v-model="data.citys" name="citys" type="hidden">
      </div>
      <div class="weui-form-cell">
        <div class="weui-cell-top">
          <label class="label" for="">具体地址</label>
          <!-- <input id="tipinput" v-model="data.SpecificAddress" name="address" type="text" placeholder="请输入具体地址"> -->
          <custom-search
            @select="selectAddress"
            :city="searchCitys"
            :SpecificAddress="data.SpecificAddress"
          ></custom-search>
        </div>
      </div>
      <div class="weui-form-cell">
        <div class="weui-cell-top">
          <label class="label" for="">门牌号</label>
          <input id="tipinput" v-model="data.HouseAddress" name="HouseAddress" type="text" placeholder="例：一栋二单元1024">
        </div>
      </div>
      <div class="weui-form-cell">
        <div class="weui-cell-top">
          <label class="label" for="" style="width:95px">标签</label>
          <input v-model="data.Remark" name="tag" type="text" placeholder="请输入标签" style="width:60px;margin-right:10px">
          <checker v-model="data.Remark" :radio-required="true" default-item-class="tags-item" selected-item-class="tags-item-selected">
            <checker-item value="家">家</checker-item>
            <checker-item value="公司">公司</checker-item>
            <checker-item value="其他">其他</checker-item>
          </checker>
        </div>
      </div>
      <div class="weui-form-cell">
        <p class="weui-cell-top">
          <label class="label" for="" style="width:95px" >是否默认</label>
          <inline-x-switch v-model="data.IsDefault" :value-map="[0, 1]" :disabled="defaultOnly"></inline-x-switch>
        </p>
      </div>
    </div>
    <div class="form-panel" style="margin-top:10px;">
      <div style="padding: 13px 0;font-size:13px;" v-if="id !== -1">
        <p class="weui-cell-top" style="color:#f43530" @click="showRemove" :disbaled="removeBtn">删除此地址</p>
      </div>
    </div>
    <div style="position: fixed;bottom: 0;width:100%;display:flex">
      <button type="button" class="weui-btn weui-btn_cancel" @click="cancel">取消</button>
      <button type="button" class="weui-btn weui-btn_primary" @click="save" :disabled="submitBtn">保存</button>
    </div>
    <div v-transfer-dom>
      <confirm v-model="isShowRemove"
      @on-confirm="removeAddress">
      <p>确定要删除该地址吗？</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import ChinaAddressV4Data from '@/plugins/datas/ChinaAddressV4Data.json'
import { Group, XAddress, Checker, CheckerItem, InlineXSwitch, Confirm, TransferDom } from 'vux'
import util from '@/plugins/util'
import customSearch from '@/components/customSearch'
export default {
  directives: {
    TransferDom
  },
  components: {
    XAddress,
    Group,
    Checker,
    CheckerItem,
    InlineXSwitch,
    Confirm,
    customSearch
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    defaultOnly: {
      type: Boolean,
      default: false
    },
    UserAddress: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    UserAddress () {
      this.data = this.UserAddress
      this.searchCitys = this.UserAddress.City
    }
  },
  data () {
    return {
      data: this.UserAddress,
      isShowRemove: false,
      submitBtn: false,
      removeBtn: false,
      addressData: ChinaAddressV4Data,
      address: '',
      searchCitys: '',
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
        HouseAddress: {
          text: '门牌号',
          required: false
        },
        Remark: {
          text: '标签',
          required: true
        }
      }
    }
  },
  mounted () {
    if (this.UserAddress.Province) {
      this.UserAddress.citys = [this.UserAddress.Province, this.UserAddress.City, this.UserAddress.Area]
      this.searchCitys = this.UserAddress.City
    } else {
      this.UserAddress.citys = []
    }
  },
  methods: {
    addressOnHide () {
      this.searchCitys = this.data.citys[1]
    },
    selectAddress (poi) {
      this.UserAddress.SpecificAddress = poi.name
      this.UserAddress.Latitude = poi.location.lat
      this.UserAddress.Longitude = poi.location.lng
    },
    cancel () {
      this.$emit('cancel')
    },
    showRemove () {
      this.isShowRemove = true
    },
    async removeAddress () {
      const that = this
      this.removeBtn = true
      const res = await this.$http.delete(`/UserAddress/${this.id}`)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '删除成功',
          time: 500,
          onHide () {
            that.removeBtn = false
            that.$emit('success')
          }
        })
      } else {
        this.$vux.toast.show({
          text: '出错了，请重试'
        })
        this.submitBtn = false
      }
    },
    async save () {
      const that = this
      console.log(this.UserAddress)
      if (!this.UserAddress.SpecificAddress) {
        this.$vux.toast.text('请选择一个具体地址')
        return false
      }
      const isValidate = util.validateForm(this.UserAddress, this.authText)
      if (isValidate) {
        this.submitBtn = true
        const UserAddress = {
          IsDefault: this.UserAddress.IsDefault,
          Province: this.UserAddress.citys[0],
          City: this.UserAddress.citys[1],
          Area: this.UserAddress.citys[2],
          SpecificAddress: this.UserAddress.SpecificAddress,
          Remark: this.UserAddress.Remark,
          Latitude: this.UserAddress.Latitude,
          Longitude: this.UserAddress.Longitude,
          HouseAddress: this.UserAddress.HouseAddress
        }
        const method = this.id === -1 ? 'post' : 'put'
        const url = this.id === -1 ? '/UserAddress' : `/UserAddress/${this.id}`
        const res = await this.$http.send(url, method, UserAddress)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            time: 500,
            onHide () {
              that.submitBtn = false
              that.$emit('success')
            }
          })
          this.UserAddress.citys = []
        } else {
          this.$vux.toast.show({
            text: '出错了，请重试'
          })
          this.submitBtn = false
          this.UserAddress.citys = []
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.weui-btn_primary {
  flex: 1;
}

.weui-btn_cancel {
  background: #F8A519;
  width: 150px;
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
.search_bar {
  flex: 1;
  color: #333;
  display: inline-block;
  overflow: hidden;
  line-height: 20px;
  z-index: 99;
}
</style>

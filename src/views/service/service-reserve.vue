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
      <xx-cell-items label="服务地址" class="noraml_cell" style="padding: 20px 0 15px 0;" @click.native="showAddress">
        <div style="display:flex;align-items:center;justify-content:flex-end;width:220px;text-align:right;">
          <img style="width:10px;height:auto" src="@/assets/images/ic_address.png" />
          <div style="padding:0 0 0 5px;text-align:left">{{reqParams.Address}}</div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </xx-cell-items>
      <xx-cell-items label="服务项" class="noraml_cell noraml_cell-right" style="padding: 20px 0 15px 0;">
        <div style="padding-right:15px">{{name}}</div>
      </xx-cell-items>
      <xx-cell-items label="服务人员" class="noraml_cell noraml_cell-right" style="padding: 20px 0 15px 0;">
        <div style="padding-right:15px">{{servant}}</div>
      </xx-cell-items>
    </xx-cell>
    <h2 class="cells_title">
      能接受服务时间段
    </h2>
    <xx-cell>
      <div style="display: flex;align-items:center;padding: 15px 10px;color:#f8a519;font-size:15px;">
       <span style="color:#999;margin: 0 5px;font-size:15px;">从</span>
        <div @click="selectStartTime">{{reqParams.StartTime}}</div>
       <span style="color:#999;margin: 0 5px;font-size:15px">至</span>
        <div @click="selectEndTime">{{reqParams.EndTime}}</div>
      </div>
    </xx-cell>
    <xx-cell class="mgt10">
      <xx-cell-items label="病情症状或备注" direction="vertical" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div class="service_remark_textarea_container">
          <textarea v-model="reqParams.Discription" class="service_remark_textarea" placeholder="请输入备注" @keyup="limitCount(200)"></textarea>
          <span class="service_remark_textarea_nums_count" :class="{warn: exceedText}">{{reqParams.Discription.length}} / 200</span>
        </div>
      </xx-cell-items>
      <xx-cell-items :label="AgreementList[0].Content" direction="vertical" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <xx-uploader
          class="upload"
          :maxSize="1024 * 1024 * 5"
          :imgList="imgList1"
          :limit="3"
          @onUpdate="onUpdate1"
        ></xx-uploader>
      </xx-cell-items>
      <div class="tips warn">{{AgreementList[1].Content}}</div>
      <xx-cell-items :label="AgreementList[2].Content" @click.native="changeRadio1" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div style="display: flex;justify-content: flex-end;">
          <xx-checker v-model="reqParams.NeedTools" typeName="checkbox" name="NeedTools" style="display:block;"></xx-checker>
        </div>
      </xx-cell-items>
      <xx-cell-items :label="AgreementList[3].Content" @click.native="changeRadio2" class="noraml_cell" style="padding: 20px 0 15px 0;">
        <div style="display: flex;justify-content: flex-end;">
          <xx-checker v-model="reqParams.NeedPill" typeName="checkbox" name="NeedPill" style="display:block;"></xx-checker>
        </div>
      </xx-cell-items>
      <div class="tips warn">
        {{AgreementList[4].Content}}
      </div>
      <div class="tips text">
        <input type="checkbox" name="" v-model="fuwuxuzhi" id="fuwuxuzhi">
        <label for="fuwuxuzhi">预约前请仔细阅读<span @click="showTips">《预约须知》</span> ，当中包含预约规则及取消预约规则</label>
      </div>
    </xx-cell>
    <button type="button" class="weui-btn weui-btn_primary" style="position:fixed;bottom:0" @click="submit" :disabled="submitDisable">确定</button>
    <!-- 地址列表 -->
    <div v-transfer-dom
      :should-rerender-on-show="true"
      max-height="50%">
      <popup v-model="isShowAddress">
        <div class="address-list_title">请选择地址</div>
        <div class="address-list_container">
          <template v-for="(item, index) in addressList">
            <div class="address-list_item" :key="index" @click="chooseAdress(index)">
              <div class="tag">{{item.Remark}}<span v-if="index === 0">(默认)</span></div>
              <div class="detail">{{item.Province | _transformAddress}}{{item.City | _transformAddress}}{{item.Area | _transformAddress}}{{item.SpecificAddress}}</div>
              <i v-if="addressIndex === index" class="iconfont icon-xuanzhong"></i>
            </div>
          </template>
          <div class="address-list_item_add" @click="addAddress">+新增地址</div>
        </div>
      </popup>
    </div>
    <!-- 提交前确认 -->
    <div v-transfer-dom>
      <confirm v-model="isConfirm"
      title="确认提交"
      content="请确保所有信息填写正确"
      @on-confirm="onConfirm">
      </confirm>
    </div>
    <div v-transfer-dom>
      <popup v-model="showAddressEdit" height="100%" style="z-index:502">
        <userAddressEdit :UserAddress="{}" :defaultOnly="isEmptyList" @cancel="cancelAddress" @success="successAddress"></userAddressEdit>
      </popup>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="isShowTips" :hide-on-blur="true">
        <div class="tips-content">
          <div class="title">{{AgreementList[5].Title}}</div>
          <div v-html="AgreementList[5].Content"></div>
        </div>
        <div class="close" @click="isShowTips = false" style="padding: 0 0 10px">
          <i class="iconfont icon-shanchuguanbicha2" style="font-size:20px;color:#999;"></i>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import util from '@/plugins/util'
import { TransferDom, dateFormat, Popup, Confirm } from 'vux'
import userAddressEdit from '../user/user-address-edit'
const dataFormatRule = 'YYYY/MM/DD HH:mm'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Confirm,
    userAddressEdit
  },
  filters: {
    _transformAddress (val) {
      return util.transformAddress(val)
    }
  },
  data () {
    const that = this
    return {
      isShowTips: false,
      exceedText: false,
      showAddressEdit: false,
      isEmptyList: false,
      submitDisable: false,
      isConfirm: false,
      isShowAddress: false,
      address: '',
      addressList: [],
      addressIndex: 0,
      servant: this.$route.query.servant,
      name: this.$route.query.name,
      imgList1: [],
      reqParams: {
        StartTime: dateFormat(new Date(), dataFormatRule),
        EndTime: dateFormat(that.addOneDay(new Date()), dataFormatRule),
        Address: '',
        Discription: '',
        NeedPill: false,
        NeedTools: false,
        Imgs: ''
      },
      authText: {
        Address: {
          required: true,
          text: '上门地址'
        }
      },
      fuwuxuzhi: false,
      AgreementList: [{}, {}, {}, {}, {}, {}]
    }
  },
  created () {
    this.getAddressList()
    this.getAgreementList()
  },
  methods: {
    showTips () {
      this.isShowTips = true
    },
    limitCount (max) {
      this.exceedText = this.reqParams.Discription.length > max
    },
    cancelAddress () {
      this.showAddressEdit = false
    },
    successAddress () {
      this.showAddressEdit = false
      this.getAddressList()
    },
    // 新增地址
    addAddress () {
      this.showAddressEdit = true
    },
    transformAddress (val) {
      return util.transformAddress(val)
    },
    addOneDay (date) {
      return new Date(date.getTime() + 24 * 60 * 60 * 1000)
    },
    // 显示选择地址弹出层
    showAddress () {
      this.isShowAddress = true
    },
    // 选择地址
    chooseAdress (index) {
      this.addressIndex = index
      this.isShowAddress = false
      this.reqParams.Address = this.concatAdress(this.addressList[index])
    },
    // 转换地址
    concatAdress (address) {
      return util.transformAddress(address.Province) + util.transformAddress(address.City) + util.transformAddress(address.Area) + address.SpecificAddress
    },
    // 选择时间
    selectStartTime () {
      const that = this
      this.$vux.datetime.show({
        format: dataFormatRule,
        value: that.reqParams.StartTime,
        title: '选择开始时间',
        confirmText: '确定',
        cancelText: '取消',
        yearRow: `{value}年`,
        monthRow: `{value}月`,
        dayRow: `{value}日`,
        hourRow: `{value}时`,
        minuteRow: `{value}分`,
        maxHour: 20,
        minHour: 6,
        onConfirm (val) {
          that.reqParams.StartTime = val
          that.reqParams.EndTime = dateFormat(that.addOneDay(new Date(val)), dataFormatRule)
        }
      })
    },
    // 选择时间
    selectEndTime () {
      const that = this
      this.$vux.datetime.show({
        format: dataFormatRule,
        value: that.reqParams.EndTime,
        title: '选择结束时间',
        confirmText: '确定',
        cancelText: '取消',
        yearRow: `{value}年`,
        monthRow: `{value}月`,
        dayRow: `{value}日`,
        hourRow: `{value}时`,
        minuteRow: `{value}分`,
        startDate: that.reqParams.StartTime,
        maxHour: 20,
        minHour: 6,
        onConfirm (val) {
          if (new Date(val).getTime() < new Date(that.reqParams.StartTime).getTime()) {
            that.$vux.toast.text('时段截止时间不能先于起始时间')
          } else {
            that.reqParams.EndTime = val
          }
        }
      })
    },
    // 需要工具
    changeRadio1 () {
      this.reqParams.NeedTools = !this.reqParams.NeedTools
    },
    // 需要药品
    changeRadio2 () {
      this.reqParams.NeedPill = !this.reqParams.NeedPill
    },
    // 上传图片
    onUpdate1 (id) {
      this.reqParams.Imgs = id.join(',')
    },
    // 获取配置文字
    async getAgreementList () {
      const res = await this.$http.get(`/AgreementList?typeList=6,7,8,9,10,11`)
      if (res.data.Code === 100000) {
        this.AgreementList = res.data.Data
      }
    },
    // 提交预约
    async onConfirm () {
      const that = this
      this.submitDisable = true
      const res = await this.$http.post(`/ReserveService/${this.$route.params.id}/Create`, this.reqParams)
      if (res.data.Code === 100000) {
        this.$vux.toast.show({
          text: '预约成功',
          time: 500,
          onHide () {
            that.$router.replace(`/service/in/${res.data.Data}?type=0`)
          }
        })
      } else {
        this.$vux.toast.text(res.data.Msg)
        this.submitDisable = false
      }
    },
    // 获取用户地址列表
    async getAddressList () {
      const res = await this.$http.get('/UserAddress')
      if (res.data.Code === 100000) {
        const data = res.data.Data
        this.addressList = data
        if (data.length > 0) {
          this.reqParams.Address = this.transformAddress(data[0].Province) + this.transformAddress(data[0].City) + this.transformAddress(data[0].Area) + data[0].SpecificAddress
        } else {
          this.address = '请选择地址'
          this.isEmptyList = false
        }
      } else {
        this.$vux.toast.text('出错了')
      }
    },
    // 提交前弹窗确认
    submit () {
      const validate = util.validateForm(this.reqParams, this.authText)
      if (!this.fuwuxuzhi) {
        this.$vux.toast.show({
          type: 'text',
          width: '13em',
          text: '需阅读并同意《预约须知》'
        })
        return false
      }
      if (!validate) return false
      if (this.exceedText) {
        this.$vux.toast.text('备注字数超出限制')
        return false
      }
      this.isConfirm = true
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
  background: #f2f2f2;
  border-radius: 3px;
}
.service_remark_textarea {
  box-sizing: border-box;
  outline: none;
  padding: 12px;
  width: 100%;
  height: 90px;
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
  &.warn {
    color: #f44336
  }
}
.address-list_title {
  text-align: center;
  padding: 10px;
  background: #fff;
  color: #f8a519;
  border-bottom: 1px solid #eee;
}
.icon-jiantouyou,
.icon-xuanzhong {
  color: #f8a519
}
.icon-xuanzhong {
  font-size: 12px;
}
.address-list_item_add {
  position: relative;
  padding: 15px;
  color: #f8a519;
  background: #fff;
  font-size: 14px;
  text-align: center;
  &::after {
    content: " ";
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    color: #d9f7f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
}
.address-list_item {
  position: relative;
  background: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
  &::after {
    content: " ";
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #d9f7f5;
    color: #d9f7f5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  .tag {
    width: 100px;
    color: #999;
  }
  .detail {
    flex: 1;
    color: #666;
    padding-right: 10px;
  }
}
.tips.warn {
  margin: 0 10px;
  padding: 11px;
  font-size: 12px;
  color: #999;
  background: #FFFBF2;
  border: 1px solid #FFDCA1;
  border-radius: 2px;
}

.tips.text {
  padding: 10px;
  color: #666;
  font-size: 12px;
  span {
    color: #f8a519;
  }
}

.tips-content {
  max-height: 400px;
  padding: 10px;
  text-align: left;
  overflow: scroll;
  color: #666;
  .title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    line-height: 1.8;
    margin-bottom: 10px;
    font-size: 13px;
  }
}
</style>

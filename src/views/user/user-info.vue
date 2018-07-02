<template>
  <div class="form-panel">
    <div class="weui-form-cell">
      <p class="weui-cell-top">
          <label class="label" for="">头像</label>
          <xx-uploader
            class="upload"
            :isAvatar="true"
            :maxSize="1024 * 1024 * 5"
            :imgList="imgList1"
            @onUpdate="onUpdate1"
          ></xx-uploader>
          <i class="iconfont icon-jiantouyou"></i>
      </p>
    </div>
    <div class="weui-form-cell">
      <div class="weui-cell-top">
          <label class="label" for="">昵称</label>
          <input v-model="UserInfo.NickName" name="nickname" type="text" placeholder="请输入昵称">
      </div>
    </div>
    <div class="weui-form-cell">
      <div class="weui-cell-top">
          <label class="label" for="">真实姓名</label>
          <input v-if="!disabled" v-model="UserInfo.RealName" name="RealName" type="text" placeholder="请输入真实姓名">
          <div v-if="disabled">{{UserInfo.RealName}}</div>
      </div>
    </div>
    <!-- <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">证件类型</label>
          <select name="IDCardType" id="" v-model="UserInfo.IDCardType">
            <option :value="0">身份证</option>
          </select>
          <i class="iconfont icon-jiantouyou"></i>
      </p>
      <span v-show="errors.has('IDCardType')" class="help is-danger">{{ errors.first('IDCardType') }}</span>
    </div> -->
    <div class="weui-form-cell">
      <div class="weui-cell-top">
          <label class="label" for="">身份证号码</label>
          <input v-if="!disabled" v-model="UserInfo.IDCard" @blur="calculate" name="IDCard" type="text" placeholder="请输入身份证号码">
          <div v-if="disabled">{{UserInfo.IDCard}}</div>
      </div>
    </div>
    <div class="weui-form-cell">
      <div class="weui-cell-top">
          <label class="label" for="">出生日期</label>
          <input v-if="!disabled" v-model="birthday" name="birthday" type="text" readonly placeholder="根据填入身份证号码计算">
          <div v-if="disabled">{{birthday}}</div>
      </div>
    </div>
    <div class="weui-form-cell">
      <div class="weui-cell-top">
          <label class="label" for="">年龄</label>
          <input v-if="!disabled" v-model="age" name="age" type="text" readonly placeholder="根据填入身份证号码计算">
          <div v-if="disabled">{{age}}</div>
      </div>
    </div>
    <div class="tips">
      *用户昵称不得出现违法和不良信息，您必须填写正确的身份证号码才可享受服务。若您填写的资料不合法、不真实、不准确、不完整，平台有权拒绝为您提供服务并删除该账号，且您需承担因此引起的相应责任及后果。
    </div>
    <div class="weui-form-cell">
      <button class="weui-btn weui-btn_primary" @click="validateBeforeSubmit" :disabled="submitBtn">保存</button>
    </div>
  </div>
</template>

<script>
import util from '@/plugins/util'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      disabled: false,
      submitBtn: false,
      birthday: '',
      age: '',
      UserInfo: {
        NickName: '',
        RealName: '',
        IDCard: '',
        Avatar: ''
      },
      authText: {
        NickName: {
          required: true,
          text: '昵称'
        },
        RealName: {
          required: true,
          text: '真实姓名'
        },
        IDCard: {
          required: true,
          text: '身份证号码'
        }
      },
      imgList1: [{url: ''}]
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userInfo'
    ])
  },
  created () {
    this.imgList1[0].url = this.userAccount.Avatar
    this.UserInfo.NickName = this.userAccount.NickName
    this.UserInfo.RealName = this.userInfo.RealName
    this.UserInfo.IDCard = this.userInfo.IDCard
    this.getAge()
    if (this.userAccount.State === 1) {
      this.disabled = true
    }
  },
  methods: {
    async validateBeforeSubmit () {
      const that = this
      const isValidate = util.validateForm(this.UserInfo, this.authText)
      if (isValidate) {
        if (!util.CheckIDCardNum(this.UserInfo.IDCard)) {
          this.$vux.toast.text('身份证格式不正确')
          return false
        }
        this.submitBtn = true
        const res = await this.$http.send('/UserInfo', 'put', this.UserInfo)
        if (res.data.Code === 100000) {
          this.$vux.toast.show({
            text: '提交成功',
            time: 500,
            onHide () {
              that.$store.dispatch('getAccount').then(() => {
                that.$router.push('/user')
              })
            }
          })
        } else {
          this.$vux.toast.text('出错了')
          this.submitBtn = false
        }
      }
    },
    onUpdate1 (id) {
      this.UserInfo.Avatar = id.join(',')
    },
    calculate () {
      if (this.UserInfo.IDCard === '') return false
      if (!util.CheckIDCardNum(this.UserInfo.IDCard)) {
        this.age = ''
        this.birthday = ''
        this.$vux.toast.text('身份证格式不正确')
        return false
      }
      this.getAge()
    },
    getAge () {
      const id = this.UserInfo.IDCard
      if (!id) return false
      this.birthday = id.substr(6, 4) + '-' + id.substr(10, 2) + '-' + id.substr(12, 2)
      this.age = new Date().getFullYear() - id.substr(6, 4)
    }
  }
}
</script>

<style lang="less" scoped>

.form-panel {
  .weui-cells {
    margin-top: 0;
  }
  .icon-jiantouyou {
    color: @yellow;
  }
  .upload {
    flex: 1;
    .weui-uploader__input-box,
    .weui-uploader__file {
      margin-right: 15px;
      float: right;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      overflow: hidden;
    }
  }
}

.tips {
  padding: 10px;
  font-size: 12px;
  color: #e64340;
  background: #f1f1f1;
  border-radius: 4px;
}
</style>

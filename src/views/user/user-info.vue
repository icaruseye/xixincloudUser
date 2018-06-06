<template>
  <div class="form-panel">
    <div class="weui-form-cell">
      <p class="weui-cell-top">
          <label class="label" for="">头像</label>
          <uploader
            class="upload"
            :isAvatar="true"
            :maxSize="1024 * 1024 * 2"
            :imgList="UserInfo.imgList1"
            @onUpdate="onUpdate1"
          ></uploader>
          <i class="iconfont icon-jiantouyou"></i>
      </p>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">昵称</label>
          <input v-model="UserInfo.nickname" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('nickname') }" name="nickname" type="text" placeholder="请输入昵称">
      </p>
      <span v-show="errors.has('nickname')" class="help is-danger">{{ errors.first('nickname') }}</span>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">真实姓名</label>
          <input v-model="UserInfo.RealName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('RealName') }" name="RealName" type="text" placeholder="请输入真实姓名">
      </p>
      <span v-show="errors.has('RealName')" class="help is-danger">{{ errors.first('RealName') }}</span>
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
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">身份证号码</label>
          <input v-model="UserInfo.IDCard" @blur="calculate" v-validate="'required|IDCard'" :class="{'input': true, 'is-danger': errors.has('IDCard') }" name="IDCard" type="text" placeholder="请输入身份证号码">
      </p>
      <span v-show="errors.has('IDCard')" class="help is-danger">{{ errors.first('IDCard') }}</span>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">出生日期</label>
          <input v-model="birthday" name="birthday" type="text" readonly placeholder="根据填入身份证号码计算">
      </p>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">年龄</label>
          <input v-model="age" name="age" type="text" readonly placeholder="根据填入身份证号码计算">
      </p>
    </div>
    <div class="weui-form-cell">
      <a class="weui-btn weui-btn_primary" @click="validateBeforeSubmit">保存</a>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/common/uploader'
import util from '@/plugins/util'
import { mapGetters } from 'vuex'
export default {
  components: {
    uploader
  },
  data () {
    return {
      birthday: '',
      age: '',
      UserInfo: {
        nickname: '',
        RealName: '',
        IDCardType: 0,
        IDCard: '',
        imgList1: [{url: ''}]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userAccount'
    ])
  },
  created () {
    this.UserInfo.imgList1[0].url = this.userAccount.Avatar
  },
  methods: {
    onUpdate1 (id) {
      console.log(id)
    },
    calculate () {
      if (!util.CheckIDCardNum(this.UserInfo.IDCard)) {
        this.age = ''
        this.birthday = ''
        return false
      }
      const id = this.UserInfo.IDCard
      if (!id) return false
      this.birthday = id.substr(6, 4) + '-' + id.substr(10, 2) + '-' + id.substr(12, 2)
      console.log(this.birthday)
      this.age = new Date().getFullYear() - id.substr(6, 4)
    },
    async validateBeforeSubmit () {
      let res = await this.$validator.validateAll()
      if (res) {
        console.log('验证通过')
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

<style lang="less">

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
</style>

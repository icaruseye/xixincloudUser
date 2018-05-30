<template>
  <div class="form-panel">
    <div class="weui-form-cell">
      <p class="weui-cell-top">
          <label class="label" for="">头像</label>
          <uploader
            class="upload"
            :isAvatar="true"
            :maxSize="1024 * 1024 * 2"
            :imgList="imgList1"
            @onUpdate="onUpdate1"
          ></uploader>
          <i class="iconfont icon-jiantouyou"></i>
      </p>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">昵称</label>
          <input v-model="nickname" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('nickname') }" name="nickname" type="text" placeholder="请输入昵称">
      </p>
      <span v-show="errors.has('nickname')" class="help is-danger">{{ errors.first('nickname') }}</span>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">真实姓名</label>
          <input v-model="realname" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('realname') }" name="realname" type="text" placeholder="请输入真实姓名">
      </p>
      <span v-show="errors.has('realname')" class="help is-danger">{{ errors.first('realname') }}</span>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">证件类型</label>
          <select name="cardType" id="">
            <option :value="0">身份证</option>
          </select>
          <i class="iconfont icon-jiantouyou"></i>
      </p>
      <span v-show="errors.has('cardType')" class="help is-danger">{{ errors.first('cardType') }}</span>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">身份证号码</label>
          <input v-model="idcard" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('idcard') }" name="idcard" type="text" placeholder="请输入身份证号码">
      </p>
      <span v-show="errors.has('idcard')" class="help is-danger">{{ errors.first('idcard') }}</span>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">出生日期</label>
          <input v-model="birthday" name="birthday" type="text" readonly>
      </p>
    </div>
    <div class="weui-form-cell">
      <p class="weui-cell-top" :class="{ 'control': true }">
          <label class="label" for="">年龄</label>
          <input v-model="age" name="age" type="text" readonly >
      </p>
    </div>
    <div class="weui-form-cell">
      <a class="weui-btn weui-btn_primary" @click="validateBeforeSubmit">保存</a>
    </div>
  </div>
</template>

<script>
import uploader from '@/components/common/uploader'
export default {
  components: {
    uploader
  },
  data () {
    return {
      nickname: '',
      realname: '',
      cardType: 0,
      idcard: '',
      birthday: '请先输入正确的身份证号码',
      age: '请先输入正确的身份证号码',
      imgList1: [{url: 'https://avatars1.githubusercontent.com/u/30564946?v=4'}]
    }
  },
  methods: {
    onUpdate1 (id) {
      console.log(id)
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

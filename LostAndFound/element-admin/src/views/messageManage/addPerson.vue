<template>
  <div class="register-container">
    <el-form ref="addForm" :model="addForm" :rules="registerRules" class="register-form" auto-complete="off" label-width="100px" label-position="left">
      <h3 class="title">vue-admin</h3>
      <el-form-item label="name" prop="name">
        <el-input v-model="addForm.name" name="name" type="text" auto-complete="off" placeholder="username"/>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input
          :type="pwdType"
          v-model="addForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handlerAdd" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item label="sex" prop="sex">
        <el-radio-group v-model="addForm.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="phone" prop="phone">
        <el-input v-model="addForm.phone" name="phone" type="text" auto-complete="on"/>
      </el-form-item>
      <el-form-item label="state" prop="state" v-if="stateVisible">
        <el-radio-group v-model="addForm.state">
          <el-radio label='1'>正常</el-radio>
          <el-radio label='0'>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="permission" prop="permission">
        <el-radio-group v-model="addForm.permission">
          <el-radio label='2'>用户</el-radio>
          <el-radio :disabled="buttonVisible" label='1'>管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetForm('addForm')">
          清空
        </el-button>
        <el-button type="primary" @click.native.prevent="handlerAdd">
          完成
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { addPerson, updatePerson } from '@/api/person'
import store  from '@/store'

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value) {
        if (value.length > 8) {
          callback(new Error('用户名不能大于8位'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入用户名'))
      }
      
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密码不能小于8位'))
      } else if (value.length > 16) {
        callback(new Error('密码不能大于16位'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机格式错误'))
      } else {
        callback()
      }
    }
    return {
      addForm: {
        name: '',
        password: '',
        sex: '男',
        phone: '',
        permission: '2'
      },
      registerRules: {
        name: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }]
      },
      pwdType: 'password',
      permission: store.getters.permission,
      buttonVisible: false,
      stateVisible: false
    }
  },
  watch: {
  },
  mounted() {
    console.log(this.permission)
    if(this.permission === 1) {
      this.buttonVisible = true
    }
    
    if(JSON.stringify(this.$route.query) === "{}") {
      console.log(this.$route.query)
      console.log(22222222222)
    } else {
      console.log(11111111111)
      this.stateVisible = true
      this.addForm = this.$route.query.form
      console.log(this.addForm)
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handlerAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          if(this.addForm.id){
            new Promise((resolve, reject) => {
              updatePerson(this.addForm.id, this.addForm.name, this.addForm.password, this.addForm.sex, this.addForm.phone, this.addForm.permission, this.addForm.state)
              .then(Response => {
                Message.success('编辑成功')
                this.turnTo(this.addForm.permission)
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          } else {
              new Promise((resolve, reject) => {
              addPerson(this.addForm.name, this.addForm.password, this.addForm.sex, this.addForm.phone, this.addForm.permission).then(Response => {
                Message.success('添加成功')
                this.turnTo(this.addForm.permission)
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    turnTo(permissonPage) {
      console.log("permissonPage" +permissonPage)
      if(permissonPage === '1') {
        this.$router.push('/manager')
        console.log("permissonPage" +permissonPage)
      } else {
        this.$router.push('/user')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 70%;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-radio-group{
    height: 47px;
    width: 70%;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    label {
      line-height: 47px;
      padding-left: 5px;
      text-align: center;
    }
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .register-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 20px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<template>
  <div class="app-container">
    <el-row style="display: flex; justify-content: center;">
      <el-col>
        <el-card style="max-width: 730px; width: 100%">
          <div class="title">TẠO TÀI KHOẢN</div>
          <div class="sub-title">Thông tin đăng nhập: </div>
          <el-form label-position="left" label-width="150px" style="margin:0 50px;">
            <el-form-item label="Tên đăng nhập: ">
              <el-input placeholder="Tên đăng nhập" type="text" />
            </el-form-item>
            <el-form-item label="Mật khẩu: ">
              <el-input placeholder="Nhập mật khẩu" type="text" />
            </el-form-item>
          </el-form>
          <div class="sub-title">Thông tin cá nhân: </div>
          <el-form label-position="left" label-width="150px" style="margin:0 50px;">
            <el-form-item label="Họ tên: ">
              <el-input placeholder="Họ tên khách hàng" type="text" />
            </el-form-item>
            <el-form-item label="Email: ">
              <el-input placeholder="Email" type="text" />
            </el-form-item>
            <el-form-item label="Số điện thoại: ">
              <el-input placeholder="Số điện thoại" type="password" />
            </el-form-item>
          </el-form>
          <div class="sub-title">Tài khoản thanh toán: </div>
          <el-form label-position="left" label-width="150px" style="margin:0 50px;">
            <el-form-item label="Số tài khoản: ">
              <el-input placeholder="Số tài khoản thanh toán" type="number" disabled />
            </el-form-item>
            <el-form-item class="test" style="display: flex; justify-content: center; margin-bottom: 0">
              <el-button type="primary" @click="submit">Tạo</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      activeTab: 'createAccount',
      oldPass: '',
      newPass: '',
      confirmPass: ''
    }
  },
  methods: {
    async submit() {
      this.$notify({
        title: 'Tạo tài khoản thành công!',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss">
.el-form-item__content {
  display: flex;
  margin-left: 0 !important;
}
.title {
  font-weight: bold;
  justify-content: center;
  display: flex;
  font-size: 20px;
  color: #0089ff;
}
.sub-title {
  font-weight:bold;
  margin-top: 35px;
  margin-bottom:12px;
  color: #1890ff;
  font-size: 18px
}
.el-card__body {
  padding: 40px;
}

.el-col-24 {
  width: 100%;
  justify-content: center;
  display: flex;
}
.el-button {
  width: 150px;
  font-size: 16px;
  margin-top: 22px;
}
</style>

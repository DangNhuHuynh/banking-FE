<template>
  <div class="app-container">
    <el-row style="display: flex; justify-content: center;">
      <el-col>
        <el-card style="max-width: 730px; width: 100%">
          <div class="title">TẠO TÀI KHOẢN</div>
          <div class="sub-title">Thông tin đăng nhập: </div>
          <el-form :model="info_customer" label-position="left" label-width="150px" style="margin:0 50px;">
            <el-form-item label="Tên đăng nhập: ">
              <el-input v-model="info_customer.username" placeholder="Tên đăng nhập" type="text" />
            </el-form-item>
            <el-form-item label="Mật khẩu: ">
              <el-input v-model="info_customer.password" placeholder="Nhập mật khẩu" type="text" />
            </el-form-item>
          </el-form>
          <div class="sub-title">Thông tin cá nhân: </div>
          <el-form label-position="left" label-width="150px" style="margin:0 50px;">
            <el-form-item label="Họ tên: ">
              <el-input v-model="info_customer.name" placeholder="Họ tên khách hàng" type="text" />
            </el-form-item>
            <el-form-item label="Email: ">
              <el-input v-model="info_customer.email" placeholder="Email" type="text" />
            </el-form-item>
            <el-form-item label="Số điện thoại: ">
              <el-input v-model="info_customer.phone" placeholder="Số điện thoại" />
            </el-form-item>
            <el-form-item class="test" style="display: flex; justify-content: center; margin-bottom: 0">
              <el-button type="primary" @click="createData">Tạo</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="Thông tin tài khoản" :model="createCustomer" :visible.sync="dialogFormVisible">
      <el-form label-position="left" label-width="150px" style="font-weight:bold;width: 500px; margin-left:50px;">
        <el-form-item label="Số tài khoản: ">
          <el-input v-model="createCustomer.paymentAccount.account_number" placeholder="Số tài khoản thanh toán" type="number" disabled />
        </el-form-item>
        <el-form-item label="Tên đăng nhập: ">
          <el-input v-model="createCustomer.username" type="text" placeholder="Tên đăng nhập" />
        </el-form-item>
        <el-form-item label="Họ tên: ">
          <el-input v-model="createCustomer.name" type="password" placeholder="Mật khẩu" />
        </el-form-item>
        <el-form-item label="Email: ">
          <el-input v-model="createCustomer.email" type="text" placeholder="Email" />
        </el-form-item>
        <el-form-item label="Số điện thoại: ">
          <el-input v-model="createCustomer.phone" placeholder="Số điện thoại" />
        </el-form-item>
        <el-form-item class="test" style="display: flex; justify-content: center; margin-bottom: 10px">
          <el-button type="primary" @click="resetForm">OK</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      activeTab: 'createAccount',
      dialogFormVisible: false,
      createCustomer: {
        paymentAccount: {}
      },
      info_customer: {
        username: '',
        password: '',
        name: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    async createData() {
      this.dialogFormVisible = true
      this.createCustomer = await this.$store.dispatch('employee/addCustomer', this.info_customer)
      this.$notify({
        title: 'Success',
        message: 'Created Successfully',
        type: 'success',
        duration: 2000
      })
    },
    resetForm() {
      this.dialogFormVisible = false
      this.info_customer = {
        username: '',
        password: '',
        name: '',
        email: '',
        phone: ''
      }
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

.el-dialog {
  max-width: 620px;
  width: 100%;
}

.el-dialog__header {
  background-color: #cae6ff;
  font-weight: bold;
}
</style>

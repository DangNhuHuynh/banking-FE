<template>
  <div class="app-container">
    <el-row style="display: flex; justify-content: center;">
      <el-col>
        <el-card style="max-width: 730px; width: 100%">
          <div class="title">NẠP TIỀN VÀO TÀI KHOẢN</div>
          <el-form label-position="left" label-width="150px" style="margin:0 50px;">
            <el-form-item label="Tên đăng nhập: ">
              <el-input placeholder="Tên đăng nhập" type="text" />
            </el-form-item>
            <el-form-item label="Số tài khoản: ">
              <el-input placeholder="Nhập số tài khoản" type="text" />
            </el-form-item>
            <el-form-item label="Số tiền nạp (VNĐ): ">
              <el-input placeholder="Nhập số tiền nạp" type="text" />
            </el-form-item>
            <el-form-item style="display: flex; justify-content: center; margin-bottom: 0">
              <el-button>
                Hủy bỏ
              </el-button>
              <el-button type="primary" @click="submit">Xác nhận nạp</el-button>
            </el-form-item>
            <!-- <div slot="
            </div> -->
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
  margin-bottom: 35px ;
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

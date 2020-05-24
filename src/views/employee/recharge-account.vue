<template>
  <div class="app-container">
    <el-row style="display: flex; justify-content: center;">
      <el-col>
        <el-card style="max-width: 730px; width: 100%">
          <div class="title">NẠP TIỀN VÀO TÀI KHOẢN</div>
          <el-form ref="form" :rules="rules" :model="info_recharge" label-position="left" label-width="150px" style="margin:0 50px;">
            <el-form-item label="Số tài khoản: " prop="account_number">
              <el-input v-model="info_recharge.account_number" name="account_number" placeholder="Nhập số tài khoản" type="text" clearable />
            </el-form-item>
            <el-form-item label="Số tiền nạp (VNĐ): " prop="money">
              <el-input v-model="info_recharge.money" name="money" placeholder="Nhập số tiền nạp" type="number" clearable />
            </el-form-item>
            <el-form-item style="display: flex; justify-content: center; margin-bottom: 0">
              <el-button @click="reset">
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
  name: 'RechargeAccount',
  data() {
    return {
      info_recharge: {
        account_number: '',
        money: ''
      },
      rules: {
        account_number: [{ required: true, message: 'Vui lòng nhập số tài khoản cần nạp tiền', trigger: 'blur' }],
        money: [{ required: true, message: 'Vui lòng nhập số tiền cần nhập', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async submit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return

        try {
          await this.$store.dispatch('employee/transferMoney', this.info_recharge)
          this.$notify({
            title: 'Nạp thành công!',
            type: 'success'
          })
          this.reset()
        } catch (e) {
          this.$notify({
            title: 'Có lỗi xảy ra, vui lòng thử lại!',
            type: 'error'
          })
        }
      })
    },
    reset() {
      this.info_recharge.account_number = ''
      this.info_recharge.money = ''
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

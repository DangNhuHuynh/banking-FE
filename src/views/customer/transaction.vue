<template>
  <div class="app-container">
    <el-row style="display: flex; justify-content: center;">
      <el-col>
        <el-card style="max-width: 730px; width: 100%">
          <div class="title">CHUYỂN KHOẢN NỘI BỘ</div>
          <div class="sub-title">Thông tin người chuyển </div>
          <el-form :model="info_transaction" label-position="left" label-width="200px" style="margin:0 50px;">
            <el-form-item label="Tài khoản nguồn: ">
              <el-select :value="paymentAccount.account_number" placeholder="Số tài khoản" readonly>
                <el-option v-for="item in accounts" :key="item.account_number" :label="item.account_number" :value="item.account_number" />
              </el-select>
            </el-form-item>
            <el-form-item label="Số dư khả dụng: ">
              <template>
                <span>{{ paymentAccount.balance | toThousandFilter }} VND</span>
              </template>
            </el-form-item>
          </el-form>
          <div class="sub-title">Thông tin người hưởng: </div>
          <el-form label-position="left" label-width="200px" style="margin:0 50px;">
            <el-form-item label="Tìm kiếm: ">
              <el-select v-model="info_transaction.name_saved" placeholder="Nhập tên, tên gợi nhớ đã lưu" clearable class="filter-item">
                <el-option />
              </el-select>
            </el-form-item>
            <el-form-item label="Số tài khoản: ">
              <el-input v-model="info_transaction.receiver_account_number" placeholder="Nhập số tài khoản" type="text" />
            </el-form-item>
            <el-form-item label="Tên người hưởng: ">
              <el-input v-model="info_transaction.receiver_name" placeholder="Tên người hưởng" type="text" disabled />
            </el-form-item>
            <el-form-item label="Lưu thông tin người hưởng ">
              <el-checkbox v-model="saveInfoReceiver" />
            </el-form-item>
          </el-form>
          <div class="sub-title">Thông tin giao dịch: </div>
          <el-form label-position="left" label-width="200px" style="margin:0 50px;">
            <el-form-item label="Số tiền chuyển (VND): ">
              <el-input v-model="info_transaction.transfer_amount" placeholder="Nhập số tiền chuyển" type="text" />
            </el-form-item>
            <el-form-item label="Nội dung chuyển tiền: ">
              <el-input v-model="info_transaction.description" placeholder="Nhập nội dung chuyển tiền" type="textarea" :autosize="{ minRows: 3 }" />
            </el-form-item>
            <el-form-item label="Phí chuyển tiền: ">
              <el-input v-model="info_transaction.billing_cost" placeholder="Nhập nội dung chuyển tiền" disabled type="textarea" :autosize="{ minRows: 3 }" />
            </el-form-item>
            <el-form-item label="Người chịu phí: ">
              <el-select v-model="info_transaction.payer_selected" placeholder="Người chuyển trả" clearable class="filter-item">
                <el-option
                  v-for="([key, text]) in Object.entries(fee_payer)"
                  :key="key"
                  :label="text"
                  :value="key"
                />
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="OTP: ">
              <el-input placeholder="Nhập số tiền chuyển" type="text" />
            </el-form-item> -->
            <el-form-item class="test" style="display: flex; justify-content: center; margin-bottom: 0">
              <el-button type="primary" @click="confirm">Xác nhận</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      saveInfoReceiver: false,
      fee_payer: {
        '0': 'Người chuyển trả',
        '1': 'Người nhận trả'
      },
      info_transaction: {
        receiver_account_number: '',
        receiver_name: '',
        name_saved: '',
        transfer_amount: '',
        description: '',
        billing_cost: '1.100 vnđ',
        payer_selected: '0'
      }
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.bankAccount.list
    }),
    paymentAccount() {
      if (!this.accounts.length) {
        return {}
      }

      return this.accounts[0]
    }
  },
  mounted() {
    this.$store.dispatch('bankAccount/getList', { type: 1 }) // only get payment account
  },
  methods: {
    async fetchReceiverInfo() {

    },
    async confirm() {
      this.$notify({
        title: 'Success',
        message: 'Created Successfully',
        type: 'success',
        duration: 2000
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

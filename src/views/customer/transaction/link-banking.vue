<template>
  <div class="app-container">
    <el-row style="display: flex; justify-content: center;">
      <el-col>
        <el-card style="max-width: 730px; width: 100%">
          <div class="title">CHUYỂN KHOẢN LIÊN NGÂN HÀNG</div>
          <div class="sub-title">Thông tin người chuyển </div>
          <el-form label-position="left" label-width="200px" style="margin:0 50px;" :disabled="!isCreatingNewRequest">
            <el-form-item label="Tài khoản nguồn: ">
              <el-select v-model="info_transaction.remitter_account_number" placeholder="Số tài khoản" name="account_number" readonly>
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
          <el-form ref="receiverForm" :rules="receiverRules" :model="info_transaction" label-position="left" label-width="200px" style="margin:0 50px;" :disabled="!isCreatingNewRequest">
            <el-form-item label="Tìm kiếm: ">
              <el-select v-model="saved_receiver_account_number" placeholder="Chọn người nhận đã lưu" clearable class="filter-item">
                <el-option
                  v-for="item in filteredListReceiver"
                  :key="item.account_number"
                  :label="item.nickname"
                  :value="item.account_number"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Số tài khoản: " prop="receiver_account_number">
              <el-input v-model="info_transaction.receiver_account_number" name="receiver_account_number" placeholder="Nhập số tài khoản" type="text" @blur="fetchReceiverInfo" />
            </el-form-item>
            <el-form-item label="Ngân hàng: ">
              <el-select v-model="info_transaction.bank_receiver" placeholder="Chọn tên ngân hàng" clearable class="filter-item">
                <el-option
                  v-for="(item, index) in listLinkBanking"
                  :key="index"
                  :label="item.name"
                  :value="item._id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Tên người hưởng: ">
              <el-input v-model="info_transaction.receiver_name" placeholder="Tên người hưởng" type="text" disabled />
            </el-form-item>
            <el-form-item label="Lưu người hưởng: ">
              <el-checkbox v-model="saveInfoReceiver" />
            </el-form-item>
            <el-form-item v-if="saveInfoReceiver" label="Tên gợi nhớ: ">
              <el-input v-model="receiver_nickname" placeholder="Nhập tên gợi nhớ" type="text" />
            </el-form-item>
          </el-form>
          <div class="sub-title">Thông tin giao dịch: </div>
          <el-form ref="transactionForm" :rules="transactionRules" :model="info_transaction" label-position="left" label-width="200px" style="margin:0 50px;" :disabled="!isCreatingNewRequest">
            <el-form-item label="Số tiền chuyển (VND): " prop="deposit_money">
              <el-input v-model="info_transaction.deposit_money" name="deposit_money" placeholder="Nhập số tiền chuyển" type="number" />
            </el-form-item>
            <el-form-item label="Nội dung chuyển tiền: " prop="description">
              <el-input v-model="info_transaction.description" name="description" placeholder="Nhập nội dung chuyển tiền" type="textarea" :autosize="{ minRows: 3 }" />
            </el-form-item>
            <el-form-item label="Phí chuyển tiền: ">
              <el-input :value="info_transaction.billing_cost | toThousandFilter" placeholder="Nhập nội dung chuyển tiền" disabled type="text" />
            </el-form-item>
            <el-form-item label="Người chịu phí: ">
              <el-select v-model="info_transaction.type_settle" placeholder="Người chuyển trả" class="filter-item">
                <el-option
                  v-for="([key, text]) in Object.entries(fee_payer)"
                  :key="key"
                  :label="text"
                  :value="key"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="isCreatingNewRequest" class="test" style="display: flex; justify-content: center; margin-bottom: 0">
              <el-button type="primary" :loading="submitNewRequestLoading" @click="confirm">Xác nhận</el-button>
            </el-form-item>
          </el-form>
          <el-form v-if="isWaitingForConfirmOTP" class="otp-form" label-position="left" label-width="200px">
            <el-form-item label="Mã xác thực: ">
              <el-input v-model="otp" placeholder="Nhập mã OTP" type="text" />
            </el-form-item>
            <el-form-item class="test" style="display: flex; justify-content: center; margin-bottom: 0">
              <el-button type="primary" :loading="submitOTPLoading" @click="confirmOTP">Xác nhận</el-button>
            </el-form-item>
          </el-form>
          <div v-if="isSuccess" class="success-msg">
            Giao dịch chuyển tiền thành công.
          </div>
          <div v-if="isFailure" class="fail-msg">
            Xác thực không thành công.
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LinkBanking',
  data() {
    const validateMinDepositMoney = (rule, value, callback) => {
      if (value < 10000) {
        callback(new Error('Số tiền chuyển tối thiểu là 10000'))
        return
      }

      callback()
    }

    return {
      saved_receiver_account_number: '',
      saveInfoReceiver: false,
      receiver_nickname: '',
      fee_payer: {
        '0': 'Người chuyển trả',
        '1': 'Người nhận trả'
      },
      info_transaction: {
        remitter_account_number: '',
        receiver_account_number: '',
        receiver_name: '',
        bank_receiver: '',
        deposit_money: '',
        description: '',
        billing_cost: 2200,
        type_settle: '0'
      },
      otp: '',
      submitNewRequestLoading: false,
      submitOTPLoading: false,
      // Below is 4 states of transfer request
      isCreatingNewRequest: true,
      isWaitingForConfirmOTP: false,
      isSuccess: false,
      isFailure: false,
      receiverRules: {
        receiver_account_number: [{ required: true, message: 'Vui lòng nhập số tài khoản người nhận', trigger: 'blur' }]
      },
      transactionRules: {
        deposit_money: [
          { required: true, message: 'Vui lòng nhập số tiền', trigger: 'blur' },
          { validator: validateMinDepositMoney, trigger: 'blur' }
        ],
        description: [{ required: true, message: 'Vui lòng nhập nội dung chuyển tiền', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.bankAccount.list,
      listReceiver: state => state.bankAccount.listReceiver,
      targetAccount: state => state.bankAccount.targetAccount,
      listLinkBanking: state => state.linkBanking.list,
      curTransaction: state => state.transfer.curTransaction
    }),
    filteredListReceiver() {
      return this.listReceiver.filter(item => item.bank !== 'HPK')
    },
    paymentAccount() {
      if (!this.info_transaction.remitter_account_number) {
        return {}
      }

      return this.accounts.find(account => account.account_number === this.info_transaction.remitter_account_number)
    }
  },
  watch: {
    accounts() {
      if (this.accounts.length) {
        this.info_transaction.remitter_account_number = this.accounts[0].account_number
      }
    },
    targetAccount() {
      if (this.targetAccount) {
        this.info_transaction.receiver_account_number = this.targetAccount.account_number
        this.info_transaction.receiver_name = this.targetAccount.customer_name
        // this.info_transaction.bank_receiver = this.targetAccount.bank

        this.$refs.receiverForm.clearValidate('receiver_account_number')
        return
      }

      this.clearReceiverForm()
    },
    saved_receiver_account_number() {
      const receiver = this.listReceiver.find(cur => cur.account_number === this.saved_receiver_account_number)

      if (receiver) {
        this.info_transaction.receiver_account_number = receiver.account_number
        this.info_transaction.receiver_name = receiver.name
        this.info_transaction.bank_receiver = receiver.bank
        this.receiver_nickname = receiver.nickname

        this.$refs.receiverForm.clearValidate('receiver_account_number')
        this.fetchReceiverInfo()
        return
      }

      this.clearReceiverForm()
    }
  },
  mounted() {
    this.$store.dispatch('bankAccount/getList', { type: 1 }) // only get payment account
    this.$store.dispatch('linkBanking/getList')
    this.$store.dispatch('bankAccount/getListReceiver')
  },
  methods: {
    clearReceiverForm() {
      this.info_transaction.receiver_account_number = ''
      this.info_transaction.receiver_name = ''
      this.receiver_nickname = ''

      this.$refs.receiverForm.clearValidate('receiver_account_number')
    },
    async fetchReceiverInfo() {
      if (this.info_transaction.receiver_account_number) {
        this.$store.dispatch('bankAccount/getLinkTargetPaymentAccount', {
          account_number: this.info_transaction.receiver_account_number,
          bank_id: this.info_transaction.bank_receiver
        })
      }
    },
    async confirm() {
      this.$refs.receiverForm.validate(valid => {
        if (!valid) return

        this.$refs.transactionForm.validate(valid2 => {
          if (!valid2) return

          this.sendNewTransferRequest()
        })
      })
    },
    async sendNewTransferRequest() {
      this.submitNewRequestLoading = true
      try {
        await this.$store.dispatch('transfer/newTransferRequest', this.info_transaction)

        this.$notify({
          title: 'Success',
          message: 'Tạo lệnh chuyển tiền thành công, mã xác thực OTP đã được gửi vào email của bạn.',
          type: 'success',
          duration: 4000
        })

        this.isCreatingNewRequest = false
        this.isWaitingForConfirmOTP = true
      } catch (e) {
        this.$notify({
          title: 'Fail',
          message: e.message,
          type: 'error',
          duration: 4000
        })
        this.submitNewRequestLoading = false
      }
    },
    async confirmOTP() {
      this.submitOTPLoading = true
      if (!this.curTransaction) {
        this.$notify({
          title: 'Fail',
          message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
          type: 'error',
          duration: 4000
        })
        return
      }

      try {
        await this.$store.dispatch('transfer/verificationTransferRequest', {
          transaction_id: this.curTransaction._id,
          otp: this.otp
        })

        this.$notify({
          title: 'Success',
          message: 'Chuyển tiền thành công.',
          type: 'success',
          duration: 4000
        })

        this.isSuccess = true

        // Save new receiver
        if (this.receiver_nickname && !this.saved_receiver_account_number) {
          this.$store.dispatch('bankAccount/saveNewReceiver', {
            account_number: this.info_transaction.receiver_account_number,
            bank_id: this.info_transaction.bank_receiver,
            nickname: this.receiver_nickname
          })
        }
        // Update new balance
        await this.$store.dispatch('bankAccount/getList', { type: 1 }) // only get payment account
      } catch (e) {
        this.isFailure = true
      } finally {
        this.isWaitingForConfirmOTP = false
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
.otp-form {
  margin: 20px 50px 0;
  margin-top: 30px;
}
.success-msg {
  font-weight: bold;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: #4ebf8d;
  margin: 40px 50px 0;
}
.fail-msg {
  font-weight: bold;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: #f56c6c;
  margin: 40px 50px 0;
}

</style>

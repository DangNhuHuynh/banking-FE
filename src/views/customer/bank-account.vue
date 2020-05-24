<template>
  <div class="app-container">
    <div class="title">
      THÔNG TIN TÀI KHOẢN
    </div>

    <el-table :data="formattedAccounts" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="account_number" label="Số tài khoản" />
      <el-table-column prop="balance" label="Số dư" />
      <el-table-column prop="type" label="Loại" />
      <el-table-column
        align="center"
        width="80"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="OK"
            cancel-button-text="Cancel"
            icon="el-icon-info"
            icon-color="red"
            title="Xoá tài khoản thanh toán?"
            @onConfirm="onDeleteAccount(scope)"
          >
            <el-button
              id="delete"
              slot="reference"
              width="60"
              :disabled="scope.row.rawType === 1 && totalPaymentAccount <= 1"
              :loading="removingIndex === scope.$index"
            >
              <i class="el-icon-delete" />
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Xoá tài khoản thanh toán" :visible.sync="dialogVisibleTransferMoney">
      <el-form label-width="120px" label-position="left">
        <p>Vui lòng chọn tài khoản thanh toán khác để chuyển phần tiền còn lại trong tài khoản cần xoá.</p>
        <el-form-item label="Tài khoản đích: " style="margin-top: 40px;">
          <el-select v-model="transfer_form.account_number" placeholder="Số tài khoản" name="account_number" readonly>
            <el-option v-for="item in paymentAccounts" :key="item.account_number" :label="item.account_number" :value="item.account_number" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="onCancelDeleteAccount">Hủy</el-button>
        <el-button type="primary" :loading="isDeleting" @click="onConfirmDeleteAccount">Xác nhận</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const ACCOUNT_TYPES = {
  1: 'Tài khoản thanh toán',
  2: 'Tài khoản tiết kiệm'
}

export default {
  data() {
    return {
      removingIndex: null,
      removingAccount: null,
      isDeleting: false,
      dialogVisibleTransferMoney: false,
      transfer_form: {
        account_number: ''
      }
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.bankAccount.list
    }),
    paymentAccounts() {
      return this.accounts.reduce((arr, acc) => {
        if (this.removingAccount && this.removingAccount.id === acc.id) {
          return arr
        }

        if (acc.type === 1) {
          arr.push(acc)
        }

        return arr
      }, [])
    },
    totalPaymentAccount() {
      return this.paymentAccounts.length
    },
    formattedAccounts() {
      return this.accounts.map(account => {
        return Object.assign({}, account, {
          balance: this.numberWithDots(account.balance) + ' VND',
          rawBalance: account.balance,
          type: ACCOUNT_TYPES[account.type],
          rawType: account.type
        })
      })
    }
  },
  mounted() {
    this.$store.dispatch('bankAccount/getList')
  },
  methods: {
    numberWithDots(number) {
      if (!number) {
        return 0
      }
      const arr = number.toString().split('.')
      if (arr.length === 2) {
        return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + arr[1]
      }
      return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async onDeleteAccount(scope) {
      const account = scope.row
      this.removingAccount = account
      this.removingIndex = scope.$index

      if (account.rawType === 1 && account.rawBalance > 0) {
        this.dialogVisibleTransferMoney = true
        return
      }
      this.handleDelete()
    },
    onCancelDeleteAccount() {
      this.dialogVisibleTransferMoney = false
      this.removingAccount = null
      this.removingIndex = null
    },
    async onConfirmDeleteAccount() {
      const removingAccount = this.removingAccount
      try {
        await this.$store.dispatch('bankAccount/transferAndRemoveAccount', {
          account_number: removingAccount.account_number,
          target_account_number: this.transfer_form.account_number
        })
        this.$notify({
          title: 'Success',
          message: 'Đóng tài khoản thành công.',
          type: 'success',
          duration: 4000
        })
      } catch (e) {
        console.error(e.message)
        this.$notify({
          title: 'Fail',
          message: 'Đóng tài khoản không thành công, vui lòng thử lại sau.',
          type: 'error',
          duration: 4000
        })
      } finally {
        this.dialogVisibleTransferMoney = false
        this.removingAccount = null
        this.removingIndex = null
      }
    },
    async handleDelete() {
      const removingAccount = this.removingAccount

      try {
        await this.$store.dispatch('bankAccount/deleteAccount', removingAccount)
        this.$notify({
          title: 'Success',
          message: 'Đóng tài khoản thành công.',
          type: 'success',
          duration: 4000
        })
      } catch (e) {
        console.error(e.message)
        this.$notify({
          title: 'Fail',
          message: 'Đóng tài khoản không thành công, vui lòng thử lại sau.',
          type: 'error',
          duration: 4000
        })
      } finally {
        this.removingIndex = null
        this.removingAccount = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  color: #0488c5;
  line-height: 40px;
  font-weight: bold;
  margin-bottom: 15px;
}
/deep/ .el-dialog__header {
  background-color: #cae6ff;
  font-weight: bold;
}
</style>

<template>
  <div class="app-container">
    <el-select
      id="select"
      v-model="status"
      placeholder="Chọn tình trạng"
      clearable
      default-first-option
      style="width: 30%; margin-top: 30px"
    >
      <el-option
        v-for="([key, text]) in Object.entries(debt_status)"
        :key="key"
        :label="text"
        :value="key"
        style="font-size: 17px"
      />
    </el-select>
    <div
      class="tab-container"
      style="background-color: #EEF1F6; border-radius:5px; padding-bottom:20px"
    >
      <h2 style="color:#666; padding: 20px 0 0 26px;">Danh sách nợ</h2>
      <el-table
        :data="filteredDebtList"
        empty-text="Chưa có dữ liệu"
        border
        fit
        highlight-current-row
        style="width: auto; margin: auto 22px;"
      >
        <el-table-column
          label="STT"
          align="center"
          width="80"
          empty-text="Chưa có giao dịch"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số tài khoản" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.account_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tên người gửi nhắc nợ" min-width="115px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.customer_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số tiền nợ" min-width="140px" align="center">
          <template slot-scope="{row}">
            <span>{{ numberWithDots(row.money) }}</span> VND
          </template>
        </el-table-column>
        <el-table-column label="Nội dung" min-width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tình trạng" class-name="status-col" min-width="100" align="center">
          <template slot-scope="{row}">
            <el-tag :type="tag_types[row.status]">
              {{ debt_status[row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="status=='0'"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button type="success" @click="handlePayment(scope.row._id)">Thanh toán</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="60"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button id="delete" @click="handleDelete(scope)"><i class="el-icon-delete" /></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogVisiblePayment">
        <el-form label-width="120px" label-position="left">
          <el-form-item label="OTP: ">
            <el-input v-model="otp" placeholder="Nhập mã OTP" />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisiblePayment=false">Hủy</el-button>
          <el-button type="primary" @click="confirmOTP">Xác nhận</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogVisibleDelete">
        <el-form label-width="120px" label-position="left">
          <el-form-item label="Nội dung">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="Nội dung"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisibleDelete=false">Hủy</el-button>
          <el-button type="primary">Xác nhận xóa</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { deepClone } from '@/utils'

export default {
  data() {
    return {
      debtInfo: {
        debit_account_number: '',
        name: '',
        bank_name: '',
        amount_owned: '',
        description: ''
      },
      info_debt: {
        status: '1'
      },
      otp: '',
      updatingReminderId: '',
      submitOTPLoading: false,
      // Below is 4 states of transfer request
      isWaitingForConfirmOTP: false,
      isSuccess: false,
      isFailure: false,
      status: '0',
      dialogVisibleDelete: false,
      dialogVisiblePayment: false,
      checkStrictly: false,
      target: {},
      editingDebtInfo: {},
      debt_status: {
        '0': 'Chưa thanh toán',
        '1': 'Đã thanh toán'
      },
      tag_types: {
        '0': 'danger',
        '1': 'success',
        '2': 'info'
      }
    }
  },
  computed: {
    ...mapState({
      listDebt: state => state.debt_reminder.debtList,
      // account: state => state.debt.infoAccount,
      curTransaction: state => state.debt_reminder.curTransaction
    }),
    filteredDebtList() {
      const status = parseInt(this.status)
      if (status === null) {
        return this.listDebt
      }
      return this.listDebt.filter(debt => debt.status === status)
    },
    distintListDebt() {
      return [...new Set(this.listDebt.map(item => item.account_number))]
    }
  },
  mounted() {
    this.$store.dispatch('debt_reminder/getList', { type: '1' })
    this.$store.dispatch('bankAccount/getListReceiver')
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
    async handlePayment(id) {
      this.dialogVisiblePayment = true
      this.updatingReminderId = id

      await this.$store.dispatch('debt_reminder/requestPaymentDebt', { _id: id })

      this.$notify({
        title: 'Success',
        message: 'Vui lòng kiểm tra mã xác thực OTP đã được gửi vào email của bạn.',
        type: 'success',
        duration: 4000
      })

      this.isWaitingForConfirmOTP = true
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
        console.log(this.curTransaction._id)
        await this.$store.dispatch('debt_reminder/verificationPayment', {
          transaction_id: this.curTransaction._id,
          otp: this.otp,
          _id: this.updatingReminderId
        })

        this.$notify({
          title: 'Success',
          message: 'Thanh toán thành công.',
          type: 'success',
          duration: 4000
        })

        this.isSuccess = true

        // Update status nợ
        await this.$store.dispatch('debt_reminder/getList', { type: 1 })

        // Update new balance
        await this.$store.dispatch('bankAccount/getList', { type: 1 }) // only get payment account
      } catch (e) {
        this.isFailure = true
      } finally {
        this.isWaitingForConfirmOTP = false
      }
    },
    handleDelete(scope) {
      this.dialogVisibleDelete = true
    }
  }
}
</script>

<style scoped lang="scss">
.arrow-down {
  width: 0;
  height: 0;
  margin-left: 5px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #666;
  transition: all 0.4s ease-in-out;
}
.arrow-up {
  width: 0;
  height: 0;
  margin-left: 5px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 7px solid #666;
  transition: all 0.4s ease-in-out;
}
.collapse-btn {
  border: 1px;
  width: 100%;
  padding: 1px 20px;
  position: relative;
  .arrow {
    position: absolute;
    right: 15px;
    top: 30px;
  }
}
.collapse-wrapper {
  padding: 0 20px;
}
.pos-abs {
  position: absolute;
}
.el-input--medium .el-input__inner {
  padding: 20px 0 0px 26px;
}
#edit,#delete{
  border: none;
  background-color: transparent;
  outline: none;
  padding: 5px;
  font-size: 18px;
}
/deep/ .el-table thead {
  color: #666666;
  font-size: 16px;
  line-height: 40px;
}
/deep/ .el-input--medium.el-input--suffix #select {
  font-size: 18px;
  height: 50px;
}
</style>

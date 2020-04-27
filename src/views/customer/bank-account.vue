<template>
  <div class="app-container">
    <div class="title">
      THÔNG TIN TÀI KHOẢN
    </div>

    <el-table :data="formattedAccounts" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="account_number" label="Số tài khoản" />
      <el-table-column prop="balance" label="Số dư" />
      <el-table-column prop="type" label="Loại" />
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const ACCOUNT_TYPES = {
  1: 'Tài khoản thanh toán',
  2: 'Tài khoản tiết kiệm'
}

export default {
  computed: {
    ...mapState({
      accounts: state => state.bankAccount.list
    }),
    formattedAccounts() {
      return this.accounts.map(account => {
        console.log(account.type)
        return Object.assign({}, account, {
          balance: this.numberWithDots(account.balance) + ' VND',
          type: ACCOUNT_TYPES[account.type]
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

</style>

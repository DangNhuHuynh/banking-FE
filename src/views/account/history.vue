<template>
  <div class="app-container">
    <aside style="color:#1874CD"><b>LỊCH SỬ GIAO DỊCH</b></aside>
    <div style="padding: 10px 0">
      <span style="margin-right:15px">Chọn tài khoản</span>
      <el-select v-model="accountNumber" placeholder="Số tài khoản" clearable class="filter-item">
        <el-option v-for="item in accounts" :key="item.account_number" :label="item.account_number" :value="item.account_number" />
      </el-select>
    </div>
    <div class="tab-container">
      <el-tabs v-model="activeTab" style="margin-top:15px;" type="border-card">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
          <keep-alive>
            <tab-pane :data="filteredTransactions" />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import tabPane from './components/TabPane'

export default {
  components: { tabPane },
  data() {
    return {
      accountNumber: null,
      activeTab: 'recieve',
      tabMapOptions: [
        { label: 'Nhận tiền', key: 'recieve', type: 1 },
        { label: 'Chuyển tiền', key: 'tranfer', type: 0 },
        { label: 'Thanh toán nhắc nợ', key: 'payment', type: 2 }
      ]
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.bankAccount.list,
      transactions: state => state.account.transactions
    }),
    filteredTransactions() {
      const tab = this.tabMapOptions.find(item => item.key === this.activeTab)
      if (!tab) {
        return []
      }

      return this.transactions.filter(trans => trans.type_settle === tab.type)
    }
  },
  watch: {
    accountNumber() {
      this.$store.dispatch('account/getTransactions', this.accountNumber)
    },
    accounts: {
      immediate: true,
      handler() {
        if (this.accounts[0]) {
          this.accountNumber = this.accounts[0].account_number
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('bankAccount/getList')
  }
}
</script>

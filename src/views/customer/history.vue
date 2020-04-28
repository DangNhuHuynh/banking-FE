<template>
  <div class="app-container">
    <aside style="color:#1874CD"><b>LỊCH SỬ GIAO DỊCH</b></aside>
    <div style="padding: 10px 0">
      <span style="margin-right:15px">Chọn tài khoản</span>
      <el-select v-model="account.accountNumber" placeholder="Số tài khoản" clearable class="filter-item">
        <el-option v-for="item in accounts" :key="item.account_number" :label="item.account_number" :value="item.account_number" />
      </el-select>
    </div>
    <div class="tab-container">
      <el-tabs v-model="activeTab" style="margin-top:15px;" type="border-card">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
          <keep-alive>
            <tab-pane :data="filtered" />
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
      account: {
        accountNumber: {}
      },
      activeTab: 'receive',
      tabMapOptions: [
        { label: 'Nhận tiền', key: 'receive', type: 1 },
        { label: 'Chuyển tiền', key: 'remit', type: 0 },
        { label: 'Thanh toán nhắc nợ', key: 'debt', type: 2 }
      ]
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.bankAccount.list,
      historyList: state => state.customer.historyList
    }),
    filtered() {
      return this.historyList.filter(trans => trans.account_number === this.account.account_number)
    }
  },
  watch: {
    accounts: {
      immediate: true,
      handler() {
        console.log(this.account.accountNumber)
        console.log(this.activeTab)

        if (this.accounts[0]) {
          this.account.accountNumber = this.accounts[0].account_number
        }
      }
    },
    activeTab: {
      immediate: true,
      handler() {
        this.fetchHistory()
      }
    },
    account: {
      immediate: true,
      handler() {
        this.fetchHistory()
      }
    }
  },
  mounted() {
    this.$store.dispatch('bankAccount/getList')
  },
  methods: {
    fetchHistory() {
      if (this.activeTab === 'receive') {
        this.$store.dispatch('customer/getReceiveTransaction', { account_number: this.account.accountNumber })
      } else if (this.activeTab === 'remit') {
        this.$store.dispatch('customer/getRemitTransaction', { account_number: this.account.accountNumber })
      } else {
        this.$store.dispatch('customer/getDebtTransaction', { account_number: this.account.accountNumber })
      }
    }
  }
}
</script>

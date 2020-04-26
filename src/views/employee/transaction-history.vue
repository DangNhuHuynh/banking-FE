<template>
  <div class="app-container">
    <el-form :rules="rules" :model="account" label-position="left" label-width="150px" style="display:flex">
      <el-form-item label="Số tài khoản: " prop="accountNumber">
        <el-input ref="accountNumber" name="accountNumber" v-model="account.accountNumber" placeholder="Nhập số tài khoản" style="width: 300px;" class="filter-item"/>
      </el-form-item>
    </el-form>
    <aside style="color:#1874CD"><b>LỊCH SỬ GIAO DỊCH</b></aside>
    <div class="tab-container">
      <el-tabs v-model="activeTab" style="margin-top:15px;" type="border-card">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
          <keep-alive>
            <tab-pane :data="historyList" />
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
        accountNumber: ''
      },
      activeTab: 'receive',
      tabMapOptions: [
        { label: 'Nhận tiền', key: 'receive', type: 1 },
        { label: 'Chuyển tiền', key: 'remit', type: 0 },
        { label: 'Thanh toán nhắc nợ', key: 'payment', type: 2 }
      ],
      rules: {
        accountNumber: [{ required: true, message: 'Vui lòng nhập số tài khoản để xem lịch sửa giao dịch', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      historyList: state => state.employee.historyList
    })
  },
  watch: {
    activeTab: {
      immediate: true,
      handler() {
        if (this.activeTab === 'recieve') {
          if (!this.account.accountNumber) {
            return
          }
          this.$store.dispatch('employee/getReceiveTransaction', { account_number: this.account.accountNumber })
        }
      }
    }
  }
}
</script>

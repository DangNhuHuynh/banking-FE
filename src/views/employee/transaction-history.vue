<template>
  <div class="app-container">
    <!-- <div class="filter-container"> -->
      <el-form :rules="rules" :model="account" label-position="left" label-width="150px" style="display:flex">
        <el-form-item label="Số tài khoản: " prop="accountNumber">
          <el-input ref="accountNumber" v-model="account.account_number" placeholder="Nhập số tài khoản" style="width: 300px;" class="filter-item" @keyup.enter.prevent="handleFilter" />
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleFilter" style="height: fit-content; margin: 0px 20px">
          Xem
        </el-button>
      </el-form>
    <!-- </div> -->
    <aside style="color:#1874CD"><b>LỊCH SỬ GIAO DỊCH</b></aside>
    <div class="tab-container">
      <el-tabs v-model="activeTab" style="margin-top:15px;" type="border-card">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
          <keep-alive>
            <tab-pane />
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
        account_number: ''
      },
      activeTab: 'recieve',
      tabMapOptions: [
        { label: 'Nhận tiền', key: 'recieve', type: 1 },
        { label: 'Chuyển tiền', key: 'tranfer', type: 0 },
        { label: 'Thanh toán nhắc nợ', key: 'payment', type: 2 }
      ],
      rules: {
        accountNumber: [{ required: true, message: 'Vui lòng nhập số tài khoản để xem lịch sửa giao dịch', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleFilter() {
      console.log(123)
    }
  }
}
</script>

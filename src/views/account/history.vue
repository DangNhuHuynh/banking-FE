<template>
  <div class="app-container">
    <div class="title">LỊCH SỬ GIAO DỊCH</div>
    <div class="filter-container">
      <span>Chọn tài khoản</span>
      <el-select v-model="listAccount.name" placeholder="Số tài khoản" clearable class="filter-item">
        <el-option v-for="item in listAccount" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
    </div>
    <div class="tab-container">
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
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

import tabPane from './components/TabPane'

export default {
  components: { tabPane },
  data() {
    return {
      listAccount: [
        {
          name: '190011',
          balance: '20.000.000 VND',
          type: 'Tài khoản thanh toán'
        },
        {
          name: '26171997',
          balance: '100.000.000 VND',
          type: 'Tài khoản tiết kiệm'
        }
      ],
      tabMapOptions: [
        { label: 'Nhận tiền', key: 'recive' },
        { label: 'Chuyển khoản', key: 'tranfer' },
        { label: 'Thanh toán nhắc nợ', key: 'payment' }
      ]
    }
  }
}
</script>

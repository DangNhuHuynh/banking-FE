<template>
  <div class="app-container">
    <div class="title">
      THÔNG TIN TÀI KHOẢN
    </div>

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="Số tài khoản" />
      <el-table-column prop="balance" label="Số dư" />
      <el-table-column prop="type" label="Loại" />
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [
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
      ]
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

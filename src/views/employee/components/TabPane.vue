<template>
  <el-table empty-text="Chưa có giao dịch" :data="data" border fit highlight-current-row style="width: 100%">
    <el-table-column
      align="center"
      label="STT"
      width="65"
    >
      <template slot-scope="scope">
        <span>{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>

    <el-table-column width="100px" align="center" label="Ngày">
      <template slot-scope="scope">
        <span>{{ scope.row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="Tài khoản trích tiền">
      <template slot-scope="{row}">
        <span>{{ row.remitter_account_number }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="Ngân hàng chuyển">
      <template slot-scope="{row}">
        <span>{{ row.bank_remitter }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="Tài khoản nhận">
      <template slot-scope="scope">
        <span>{{ scope.row.receiver_account_number }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" align="center" label="Ngân hàng nhận">
      <template slot-scope="{row}">
        <span>{{ row.bank_receiver }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="Số tiền" width="100">
      <template slot-scope="scope">
        <span>{{ scope.row.deposit_money }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="Nội dung" width="200">
      <template slot-scope="scope">
        <span>{{ scope.row.description }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="Trạng thái" width="100">
      <template slot-scope="{row}">
        <el-tag :type="tag_types[row.status]">
          {{ transaction_status[row.status] }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      transaction_status: {
        '-1': 'Không chấp nhận',
        '0': 'Đang xử lý',
        '1': 'Thành công'
      },
      tag_types: {
        '-1': 'danger',
        '0': '',
        '1': 'success'
      }
    }
  }
}
</script>


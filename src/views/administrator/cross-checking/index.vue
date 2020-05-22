<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;">
      <el-select v-model="bank_id" placeholder="Chọn ngân hàng" clearable style="width: 240px; margin-right: 20px;" class="filter-item">
        <el-option
          v-for="(item, index) in listLinkBanking"
          :key="index"
          :label="item.name"
          :value="item._id"
        />
      </el-select>
      <el-date-picker
        v-model="date"
        type="daterange"
        align="right"
        start-placeholder="Start Date"
        end-placeholder="End Date"
      />
    </div>
    <el-table
      :data="transactions"
      empty-text="Không có dữ liệu"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Mã GD" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tên NHLK" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.link_banking_name || '_' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tài khoản chuyển" min-width="110px" align="center" class-name="fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.remitter_account_number || '_' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tài khoản nhận" min-width="100px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.receiver_account_number || '_' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ngày GD" min-width="100px" align="center" class-name="fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.createdAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="Phí (VND)" align="center" class-name="small-padding fixed-width">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span>{{ row.billing_cost || '_' }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="Số tiền (VND)" min-width="100px" align="center" class-name="fixed-width">
        <template slot-scope="{row}">
          <span>{{ row.deposit_money || '_' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-tag :type="tag_types[row.status]">
            {{ status[row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Chữ ký" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <dot :title="row.sign || '_'" :msg="row.sign || '_'" :line="4" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dot from 'vue-text-dot'

export default {
  components: {
    dot
  },
  data() {
    const now = new Date()
    const sevenDays = 24 * 60 * 60 * 1000 * 7
    return {
      date: [new Date(now.getTime() - sevenDays), new Date()],
      bank_id: null,
      status: {
        '0': 'Chưa thanh toán',
        '1': 'Đã thanh toán',
        '2': 'Đã hủy'
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
      transactions: state => state.crossChecking.transactions,
      listLinkBanking: state => state.linkBanking.list
    })
  },
  watch: {
    date() {
      this.getData()
    },
    bank_id() {
      this.getData()
    }
  },
  mounted() {
    this.getData()
    this.$store.dispatch('linkBanking/getList')
  },
  methods: {
    getData() {
      this.$store.dispatch('crossChecking/getList', {
        start: this.date[0].getTime(),
        end: this.date[1].getTime(),
        bank_id: this.bank_id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-table tr {
    color: rgb(34, 32, 32);
  }
</style>

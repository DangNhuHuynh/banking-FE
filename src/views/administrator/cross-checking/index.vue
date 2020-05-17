<template>
  <div class="app-container">
    <div class="filter-container" style="display: flex;">
      <el-select placeholder="Chọn ngân hàng" clearable style="width: 240px; margin-right: 20px;" class="filter-item">
        <el-option />
      </el-select>
      <el-date-picker
        v-model="date"
        type="daterange"
        align="right"
        start-placeholder="Start Date"
        end-placeholder="End Date"
      >
      </el-date-picker>
    </div>
    <el-table
      :data="listData"
      empty-text="Không có dữ liệu"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Mã GD" align="center" min-width="60px">
        <template>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column label="Tên NHLK" align="center" class-name="small-padding fixed-width">
        <template>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column label="Tài khoản chuyển" min-width="110px" align="center" class-name="fixed-width">
        <template>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column label="Tài khoản nhận" min-width="100px" align="center" class-name="small-padding fixed-width">
        <template>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column label="Ngày GD" min-width="100px" align="center" class-name="fixed-width">
        <template>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column label="Loại GD" align="center" class-name="small-padding fixed-width">
        <template>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column label="Phí (VND)" align="center" class-name="small-padding fixed-width">
        <template>
          <!-- <span></span> -->
        </template>
      </el-table-column>
      <el-table-column label="Số tiền (VND)" min-width="100px" align="center" class-name="fixed-width">
        <template>
          <!-- <span></span> -->
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
        <template>
          <!-- <span></span> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: [new Date(), new Date()],
      value1: new Date(),
      listData: [
        {
          status: '1'
        }
      ],
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
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-table tr {
    color: rgb(34, 32, 32);
  }
</style>

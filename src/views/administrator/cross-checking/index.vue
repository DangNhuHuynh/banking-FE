<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input placeholder="Tìm theo tài khoản" style="width: 240px;" class="filter-item" /> -->
      <el-select placeholder="Chọn ngân hàng" clearable style="width: 240px" class="filter-item">
        <el-option />
      </el-select>
    </div>
    <el-table
      empty-text="Không có dữ liệu"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Tài khoản" align="center" min-width="60px">
        <template >
          <span></span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="250px" class-name="small-padding fixed-width">
        <template >
          <el-button type="primary" size="mini" >
            <i class="el-icon-edit" />
          </el-button>
          <el-button size="mini" type="danger" >
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<template>
  <div class="app-container">
    <aside style="color:#1874CD">DANH SÁCH NGƯỜI NHẬN</aside>
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Tên người nhận" style="width: 400px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>

      <el-button v-waves :loading="downloadLoading" class="filter-item" style="float:right; background-color:#00AA00" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="Số tài khoản" min-width="150px" align="center" prop="customerId" />
      <el-table-column label="Tên người nhận" min-width="150px" align="center" prop="name" />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

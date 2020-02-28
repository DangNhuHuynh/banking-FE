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

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ReceiverTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      tableData: [
        {
          customerId: 2358265,
          name: 'Dang Thi Nhu Huynh'
        },
        {
          customerId: 9385645,
          name: 'Cho Hung'
        }
      ],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      downloadLoading: false
    }
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

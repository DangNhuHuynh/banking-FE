<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Tìm theo CMND" style="width: 240px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-download">
        Export
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="listEmployee"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="Mã NV" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span> {{ `NV_`+ row.ma_nv }} </span>
        </template>
      </el-table-column>
      <el-table-column label="Họ tên" min-width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Số điện thoại" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Số CMND" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id_card }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Vị trí công việc" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Phòng ban" align="center" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.department }}</span>
          <!-- <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="90px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            <i class="el-icon-edit" />
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="infoEdit" label-position="left" label-width="150px" style="font-weight:bold;width: 500px; margin-left:50px;">
        <el-form-item v-if="dialogStatus!='create'" label="Mã NV">
          <el-input v-model="infoEdit.ma_nv" type="text" disabled />
        </el-form-item>
        <el-form-item label="Họ tên" prop="name">
          <el-input v-model="infoEdit.name" type="text" placeholder="Họ tên" />
        </el-form-item>
        <el-form-item label="Số điện thoại" prop="phone">
          <el-input v-model="infoEdit.phone" placeholder="Số điện thoại" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="infoEdit.email" placeholder="Email" />
        </el-form-item>
        <el-form-item label="Số CMND" prop="id_card">
          <el-input v-model="infoEdit.id_card" placeholder="Số CMND" />
        </el-form-item>
        <el-form-item label="Vị trí công việc">
          <el-input v-model="infoEdit.position" type="text" placeholder="Vị trí công việc" />
        </el-form-item>
        <el-form-item label="Phòng ban">
          <el-select v-model="infoEdit.department" class="filter-item" placeholder="Phòng ban">
            <el-option v-for="([key, text]) in Object.entries(departmentOptions)" :key="key" :label="text" :value="key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Hủy
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Xác nhận
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime, deepClone } from '@/utils'
// import Pagination from '@/components/Pagination'

export default {
  name: 'ComplexTable',
  // components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      ma_nv: '',
      name: '',
      phone_num: '',
      id_card: '',
      email: '',
      position: '',
      departmentSelected: '',
      listEmployee: [{
        ma_nv: '01',
        name: 'Bánh Bèo',
        phone: '098765431',
        id_card: '89076512',
        email: 'huynh@gmail.com',
        position: 'Giám đốc',
        department: 'Kỹ thuật'
      }],
      departmentOptions: {
        '0': 'Nhân sự',
        '1': 'Kỹ thuật',
        '2': 'Giao dịch',
        '3': 'Kế toán',
        '4': 'Điều hành'
      },
      rules: {
        phone: [{ required: true, message: 'Vui lòng nhập SDT', trigger: 'change' }],
        id_card: [{ required: true, message: 'Vui lòng nhập số CMND', trigger: 'change' }],
        name: [{ required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' }]
      },
      // total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        // importance: undefined
        title: undefined,
        // type: undefined
      },
      statusOptions: ['published', 'draft', 'deleted'],
      infoEdit: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Chi tiết',
        create: 'Tạo nhân viên'
      },
      dialogPvVisible: false,
      pvData: []
      // downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        // this.list = response.data.items
        // this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      console.log('filter')
      // this.listQuery.page = 1
      // this.getList()
    },
    resetTemp() {
      this.infoEdit = {
        name: '',
        phone_num: '',
        id_card: '',
        email: '',
        position: '',
        departmentSelected: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    createData() {
      this.dialogFormVisible = false
      this.$notify({
        title: 'Success',
        message: 'Created Successfully',
        type: 'success',
        duration: 2000
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.infoEdit = deepClone(row)
    },
    updateData() {
      this.dialogFormVisible = false
      this.$notify({
        title: 'Success',
        message: 'Update Successfully',
        type: 'success',
        duration: 2000
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
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

<style lang="scss" scoped>
/deep/ .el-dialog {
  max-width: 620px;
  width: 100%;
}

/deep/ .el-dialog__header {
  background-color: #cae6ff;
  font-weight: bold;
}

</style>

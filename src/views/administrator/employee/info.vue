<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="id_card" placeholder="Tìm theo CMND" style="width: 240px;" class="filter-item" />
      <!-- <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Tạo nhân viên
      </el-button>
    </div>
    <el-table
      :data="filteredEmployeeList"
      empty-text="Không có dữ liệu"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="Mã NV" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span> {{ row.ma_nv }} </span>
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
          <span>{{ departmentOptions[row.department] }}</span>
          <!-- <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span> -->
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="90px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            <i class="el-icon-edit" />
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="infoEdit" label-position="left" label-width="150px" style="font-weight:bold;width: 500px; margin-left:50px;">
        <el-form-item label="Mã NV" prop="manv">
          <el-input v-model="infoEdit.ma_nv" type="text" />
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
          Hủy bỏ
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Xác nhận
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogDelVisible" title="Xóa nhân viên" align="center" class="del-dialog">
      <p style="font-size: 16px">Bạn chắc chắn xóa?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">
          Hủy bỏ
        </el-button>
        <el-button type="primary" @click="deleteData">Xác nhận</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
// import Pagination from '@/components/Pagination'
import { mapState } from 'vuex'
// import employee from '../../../store/modules/employee'

export default {
  // components: { Pagination },
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
      departmentOptions: {
        '0': 'Nhân sự',
        '1': 'Kỹ thuật',
        '2': 'Giao dịch',
        '3': 'Kế toán',
        '4': 'Điều hành'
      },
      rules: {
        manv: [{ required: true, message: 'Vui lòng nhập mã nhân viên', trigger: 'blur' }],
        phone: [{ required: true, message: 'Vui lòng nhập SDT', trigger: 'blur' }],
        id_card: [{ required: true, message: 'Vui lòng nhập số CMND', trigger: 'blur' }],
        name: [{ required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' }]
      },
      statusOptions: ['published', 'draft', 'deleted'],
      infoEdit: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Chi tiết',
        create: 'Tạo nhân viên'
      },
      dialogDelVisible: false
    }
  },
  computed: {
    ...mapState({
      listEmployee: state => state.employee.employeeList
    }),
    filteredEmployeeList() {
      if (this.id_card === null) {
        return this.listEmployee
      }
      return this.listEmployee.filter(employee => employee.id_card.includes(this.id_card))
    }
  },
  mounted() {
    this.$store.dispatch('employee/getList')
  },
  methods: {
    resetTemp() {
      this.infoEdit = {
        ma_nv: '',
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
    },
    async createData() {
      this.dialogFormVisible = false
      await this.$store.dispatch('employee/create', this.infoEdit)
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
    async updateData() {
      await this.$store.dispatch('employee/update', this.infoEdit)
      this.dialogFormVisible = false
      this.$notify({
        title: 'Success',
        message: 'Update Successfully',
        type: 'success',
        duration: 2000
      })
    },
    async handleDelete(row) {
      this.dialogDelVisible = true
      this.infoEdit = deepClone(row)
    },
    async deleteData() {
      await this.$store.dispatch('employee/delete', this.infoEdit)
      this.dialogDelVisible = false
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
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

/deep/ .del-dialog > .el-dialog {
  width: 25%;
}
/deep/ .del-dialog > .el-dialog__body {
  padding: 10px 20px;
}
</style>

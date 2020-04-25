<template>
  <div class="app-container">
    <div style="color:#0089ff; margin: 20px 0">
      <b> DANH SÁCH TÀI KHOẢN </b>
    </div>
    <el-table
      :data="listAccount"
      empty-text="Không có dữ liệu"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="Tài khoản" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="250px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            <i class="el-icon-edit" />
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <el-dialog title="Cập nhật tài khoản" :model="accountEmployee" :visible.sync="dialogFormVisible">
      <el-form label-position="left" label-width="150px" style="font-weight:bold;width: 500px; margin-left:50px;">
        <el-form-item label="Tên tài khoản: ">
          <el-input v-model="accountEmployee.username" type="text" placeholder="Tên tài khoản" />
        </el-form-item>
        <el-form-item label="Mật khẩu: ">
          <el-input v-model="accountEmployee.password" type="password" placeholder="Mật khẩu" />
        </el-form-item>
        <el-form-item label="Email: ">
          <el-input v-model="accountEmployee.email" type="text" placeholder="Email" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Hủy bỏ
        </el-button>
        <el-button type="primary" @click="updateData">
          Xác nhận
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogDelVisible" title="Xóa tài khoản" align="center" class="del-dialog">
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
import { mapState } from 'vuex'
import { deepClone } from '@/utils'

export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogDelVisible: false,
      username: '',
      password: '',
      email: '',
      account_type: '2',
      accountEmployee: {}
    }
  },
  computed: {
    ...mapState({
      listAccount: state => state.admin_employee.accountList
    })
  },
  mounted() {
    this.$store.dispatch('admin_employee/getAccountList')
  },
  methods: {
    resetTemp() {
      this.accountEmployee = {
        username: '',
        password: '',
        email: ''
      }
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.accountEmployee = deepClone(row)
    },
    async updateData() {
      this.dialogFormVisible = false
      await this.$store.dispatch('admin_employee/updateAccount', this.accountEmployee)
      this.$notify({
        title: 'Success',
        message: 'Update Successfully',
        type: 'success',
        duration: 2000
      })
    },
    handleDelete(row) {
      this.dialogDelVisible = true
      this.accountEmployee = deepClone(row)
    },
    async deleteData() {
      this.dialogFormVisible = false
      await this.$store.dispatch('admin_employee/deleteAccount', this.accountEmployee)
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.dialogDelVisible = false
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

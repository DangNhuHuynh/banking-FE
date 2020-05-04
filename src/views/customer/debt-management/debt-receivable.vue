<template>
  <div class="app-container">
    <div style="background-color: #EEF1F6; border-radius:5px">
      <CollapseButton class="collapse-btn" :target="'#collapse'">
        <h2 style="color:#666">Tạo nhắc nợ</h2>
        <span slot="inactive" class="arrow arrow-down" />
        <span slot="active" class="arrow arrow-up" />
      </CollapseButton>
      <CollapseWrapper :id="'collapse'" class="collapse-wrapper">
        <el-form :model="debtInfo" class="postInfo-container" style="margin-top: 15px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label-width="100px"
                label="Số tài khoản"
                class="postInfo-container-item"
              >
                <el-select
                  v-model="debtInfo.debit_account_number"
                  placeholder="Nhập số tài khoản nợ"
                  allow-create
                  filterable
                >
                  <el-option
                    v-for="item in distintListDebt"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label-width="70px" label="Họ tên" class="postInfo-container-item">
                <el-input v-model="debtInfo.name" placeholder="Họ tên người nợ" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label-width="120px" label="Ngân hàng" class="postInfo-container-item">
                <el-input v-model="debtInfo.bank_name" placeholder="Tên ngân hàng" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                label-width="130px"
                label="Số tiền (VNĐ)"
                class="postInfo-container-item"
              >
                <el-input v-model="debtInfo.amount_owned" type="number" placeholder="Nhập số tiền nợ" />
              </el-form-item>
            </el-col>

            <el-col>
              <el-form-item label="Nội dung" class="postInfo-container-item">
                <el-input
                  v-model="debtInfo.description"
                  :autosize="{ minRows: 3 }"
                  type="textarea"
                  placeholder="Nhập nội dung nhắc nợ"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-center">
          <el-button style="width:100px" type="primary" @click="createNewDebt">Gửi</el-button>
        </div>
      </CollapseWrapper>
    </div>
    <el-select
      id="select"
      v-model="status"
      placeholder="Chọn tình trạng"
      clearable
      default-first-option
      style="width: 30%; margin-top: 30px"
    >
      <el-option
        v-for="([key, text]) in Object.entries(debt_status)"
        :key="key"
        :label="text"
        :value="key"
        style="font-size: 17px"
      />
    </el-select>
    <div
      class="tab-container"
      style="background-color: #EEF1F6; border-radius:5px; padding-bottom:20px"
    >
      <h2 style="color:#666; padding: 20px 0 0 26px;">Danh sách nợ</h2>
      <el-table
        :data="filteredDebtList"
        empty-text="Chưa có dữ liệu"
        border
        fit
        highlight-current-row
        style="width: auto; margin: auto 22px;"
      >
        <el-table-column
          label="STT"
          align="center"
          width="80"
          empty-text="Chưa có giao dịch"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số tài khoản nợ" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.debt_account_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tên người nợ" min-width="115px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.debt_reminder_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số tiền chuyển" min-width="140px" align="center">
          <template slot-scope="{row}">
            <span>{{ numberWithDots(row.money) }}</span> VND
          </template>
        </el-table-column>
        <el-table-column label="Nội dung" min-width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tình trạng" class-name="status-col" min-width="100" align="center">
          <template slot-scope="{row}">
            <el-tag :type="tag_types[row.status]">
              {{ debt_status[row.status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="110"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button id="delete" @click="handleDelete(scope)"><i class="el-icon-delete" /></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogVisibleDelete">
        <el-form :model="editingDebtInfo" label-width="120px" label-position="left">
          <el-form-item label="Nội dung">
            <el-input
              v-model="editingDebtInfo.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="Nội dung"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisibleDelete=false">Hủy</el-button>
          <el-button type="primary" @click="confirmDelete">Xác nhận xóa</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import CollapseButton from '../../../components/Collapse/CollapseButton'
import CollapseWrapper from '../../../components/Collapse/CollapseWrapper'
import { mapState } from 'vuex'
import { deepClone } from '@/utils'

export default {
  components: { CollapseButton, CollapseWrapper },
  data() {
    return {
      debtInfo: {
        debit_account_number: '',
        name: '',
        bank_name: '',
        amount_owned: '',
        description: ''
      },
      status: '0',
      dialogVisibleEdit: false,
      dialogVisibleDelete: false,
      checkStrictly: false,
      editingDebtInfo: {},
      debt_status: {
        '0': 'Chưa thanh toán',
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
      listDebt: state => state.debt_reminder.debtList,
      account: state => state.debt.infoAccount
    }),
    filteredDebtList() {
      const status = parseInt(this.status)
      if (status === null) {
        return this.listDebt
      }
      return this.listDebt.filter(debt => debt.status === status)
    },
    distintListDebt() {
      return [...new Set(this.listDebt.map(item => item.account_number))]
    }
  },
  mounted() {
    this.$store.dispatch('debt_reminder/getList', { type: '0' })
  },
  methods: {
    numberWithDots(number) {
      if (!number) {
        return 0
      }
      const arr = number.toString().split('.')
      if (arr.length === 2) {
        return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + arr[1]
      }
      return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getInfoAccount(acc_num) {
      this.$nextTick(async() => {
        await this.$store.dispatch('debt/getInfoAccount', this.acc_num)

        if (!Object.keys(this.account).length) {
          return
        }
        this.user_name = this.account.user_name
        this.bank_name = this.account.bank_name
      })
    },
    createNewDebt() {
      console.log(123)
    },
    async confirmDelete() {
      this.editingDebtInfo.status = '2'
      this.$store.dispatch('debt_reminder/updateDebt', this.editingDebtInfo)
      console.log(this.editingDebtInfo.description)
      console.log(this.editingDebtInfo._id)
      console.log(this.editingDebtInfo.status)
      this.dialogVisibleDelete = false
      this.$notify({
        title: 'Hủy nhắc nợ thành công!',
        type: 'success'
      })
    },
    handleDelete(scope) {
      this.dialogVisibleDelete = true
      this.editingDebtInfo = deepClone(scope.row)
      this.editingDebtInfo.description = ''
    }
  }
}
</script>

<style scoped lang="scss">
.arrow-down {
  width: 0;
  height: 0;
  margin-left: 5px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #666;
  transition: all 0.4s ease-in-out;
}
.arrow-up {
  width: 0;
  height: 0;
  margin-left: 5px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 7px solid #666;
  transition: all 0.4s ease-in-out;
}
.collapse-btn {
  border: 1px;
  width: 100%;
  padding: 1px 20px;
  position: relative;
  .arrow {
    position: absolute;
    right: 15px;
    top: 30px;
  }
}
.collapse-wrapper {
  padding: 0 20px;
}
.pos-abs {
  position: absolute;
}
.el-input--medium .el-input__inner {
  padding: 20px 0 0px 26px;
}
#edit,#delete{
  border: none;
  background-color: transparent;
  outline: none;
  padding: 5px;
  font-size: 18px;
}
/deep/ .el-table thead {
  color: #666666;
  font-size: 16px;
  line-height: 40px;
}
/deep/ .el-input--medium.el-input--suffix #select {
  font-size: 18px;
  height: 50px;
}
</style>

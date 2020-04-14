<template>
  <div class="app-container">
    <div style="background-color: #EEF1F6; border-radius:5px">
      <CollapseButton class="collapse-btn" :target="'#collapse'">
        <h2 style="color:#666">Tạo nhắc nợ</h2>
        <span slot="inactive" class="arrow arrow-down" />
        <span slot="active" class="arrow arrow-up" />
      </CollapseButton>
      <CollapseWrapper :id="'collapse'" class="collapse-wrapper">
        <el-form class="postInfo-container" style="margin-top: 15px">
          <el-row>
            <el-col :span="6">
              <el-form-item
                label-width="100px"
                label="Số tài khoản"
                class="postInfo-container-item"
              >
                <el-select
                  v-model="value"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="Nhập số tài khoản nợ"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label-width="70px" label="Họ tên" class="postInfo-container-item">
                <el-input v-model="postForm.user_name" placeholder="Họ tên người nợ" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label-width="120px" label="Ngân hàng" class="postInfo-container-item">
                <el-input v-model="postForm.bank_name" placeholder="Tên ngân hàng" />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                label-width="130px"
                label="Số tiền (VNĐ)"
                class="postInfo-container-item"
              >
                <el-input v-model="postForm.amount" type="number" placeholder="Nhập số tiền nợ" />
              </el-form-item>
            </el-col>

            <el-col>
              <el-form-item label="Nội dung" class="postInfo-container-item">
                <el-input
                  v-model="postForm.content"
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
        style="width: 95%; margin: auto 22px;"
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
        <el-table-column label="Số tài khoản" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.account_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tên người nợ" min-width="115px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.user_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số tiền chuyển" min-width="140px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.amount }}</span> VND
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
          label="Lựa chọn"
          align="center"
          width="140"
          class-name="small-padding fixed-width"
        >
          <template>
            <el-button id="edit"><i class="el-icon-edit" /></el-button>
            <el-button id="delete"><i class="el-icon-delete" /></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import CollapseButton from '../../components/Collapse/CollapseButton'
import CollapseWrapper from '../../components/Collapse/CollapseWrapper'
import { mapState } from 'vuex'

const defaultForm = {
  account_number: '',
  user_name: '',
  bank_name: '',
  amount: '',
  content: ''
}

export default {
  components: { CollapseButton, CollapseWrapper },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      status: '0',
      options: [
        {
          value: '1900011',
          label: '1900011'
        },
        {
          value: '1900012',
          label: '1900012'
        },
        {
          value: '1900013',
          label: '1900013'
        }
      ],
      value: [],
      debt_status: {
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
      listDebt: state => state.debt.debtList
    }),
    filteredDebtList() {
      const status = parseInt(this.status)
      if (status === null) {
        return this.listDebt
      }
      return this.listDebt.filter(debt => debt.status === status)
    }
  },
  mounted() {
    this.$store.dispatch('debt/getListDebt')
  },
  methods: {
    createNewDebt() {
      console.log(123)
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

<template>
  <div class="app-container">
    <div style="background-color: #EEF1F6; border-radius:5px">
      <CollapseButton class="collapse-btn" :target="'#collapse'">
        <h2 style="color:#666">Thêm người nhận</h2>
        <span slot="inactive" class="arrow arrow-down" />
        <span slot="active" class="arrow arrow-up" />
      </CollapseButton>
      <CollapseWrapper :id="'collapse'" class="collapse-wrapper">
        <el-form class="postInfo-container" style="margin-top: 15px">
          <el-row>
            <el-col :span="9">
              <el-form-item
                label-width="130px"
                label="Số tài khoản:"
                class="postInfo-container-item"
              >
                <el-input placeholder="Nhập số tài khoản" @blur="getInfoAccount" />
              </el-form-item>
            </el-col>

            <el-col :span="9">
              <el-form-item label-width="180px" label="Tên gợi nhớ: " class="postInfo-container-item">
                <el-input placeholder="Nhập tên gợi nhớ" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="100px" class="postInfo-container-item">
                <el-button style="width:100px" type="primary" @click="createNewDebt">Thêm</el-button>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </CollapseWrapper>
    </div>
    <h2 style="color:#666; margin-top: 30px;">Danh sách người nhận</h2>
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
      <el-table-column label="Tên gợi nhớ" min-width="150px" align="center" prop="name" />
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import CollapseWrapper from '../../components/Collapse/CollapseWrapper'
import CollapseButton from '../../components/Collapse/CollapseButton'

export default {
  components: { CollapseButton, CollapseWrapper },
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

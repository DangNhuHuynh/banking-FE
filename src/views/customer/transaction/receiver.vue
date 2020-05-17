<template>
  <div class="app-container">
    <div style="background-color: #EEF1F6; border-radius:5px">
      <CollapseButton class="collapse-btn" :target="'#collapse'">
        <h2 style="color:#666">Thêm người nhận</h2>
        <span slot="inactive" class="arrow arrow-down" />
        <span slot="active" class="arrow arrow-up" />
      </CollapseButton>
      <CollapseWrapper :id="'collapse'" class="collapse-wrapper">
        <el-form ref="receiverForm" :rules="rules" :model="receiver_form" class="postInfo-container" style="margin-top: 15px">
          <el-row>
            <el-col :span="7">
              <el-form-item
                label-width="130px"
                label="Số tài khoản:"
                class="postInfo-container-item"
                prop="account_number"
              >
                <el-input v-model="receiver_form.account_number" name="account_number" placeholder="Nhập số tài khoản" />
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label-width="180px" label="Tên gợi nhớ: " class="postInfo-container-item" prop="nickname">
                <el-input v-model="receiver_form.nickname" placeholder="Nhập tên gợi nhớ" name="nickname" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="180px" label="Ngân hàng: ">
                <el-select v-model="receiver_form.bank_receiver" placeholder="Chọn tên ngân hàng" clearable class="filter-item">
                  <el-option
                    v-for="(item, index) in listLinkBanking"
                    :key="index"
                    :label="item.name"
                    :value="item._id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="text-center">
            <el-button style="width:100px;margin-left:0" type="primary" @click="createReceiver">Thêm</el-button>
          </div>
        </el-form>
      </CollapseWrapper>
    </div>
    <h2 style="color:#666; margin-top: 30px;">Danh sách người nhận</h2>
    <el-table
      v-loading="isLoading"
      :data="listReceiver"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="Số tài khoản" min-width="150px" align="center" prop="account_number" />
      <el-table-column label="Ngân hàng" min-width="150px" align="center" prop="bank" />
      <el-table-column label="Tên người nhận" min-width="150px" align="center" prop="name" />
      <el-table-column label="Tên gợi nhớ" min-width="150px" align="center" prop="nickname" />
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import waves from '@/directive/waves'
import CollapseWrapper from '../../../components/Collapse/CollapseWrapper'
import CollapseButton from '../../../components/Collapse/CollapseButton'

export default {
  components: { CollapseButton, CollapseWrapper },
  directives: { waves },
  data() {
    return {
      receiver_form: {
        account_number: '',
        nickname: '',
        bank_receiver: ''
      },
      rules: {
        account_number: [{ required: true, message: 'Vui lòng nhập số tài khoản', trigger: 'blur' }],
        nickname: [{ required: true, message: 'Vui lòng nhập tên gợi nhớ', trigger: 'blur' }]
      },
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      listReceiver: state => state.bankAccount.listReceiver,
      listLinkBanking: state => state.linkBanking.list
    })
  },
  async mounted() {
    this.isLoading = true
    await this.$store.dispatch('bankAccount/getListReceiver')
    this.isLoading = false
    this.$store.dispatch('linkBanking/getList')
  },
  methods: {
    async createReceiver() {
      this.$refs.receiverForm.validate(async valid => {
        if (!valid) {
          return
        }

        try {
          await this.$store.dispatch('bankAccount/saveNewReceiver', {
            account_number: this.receiver_form.account_number,
            bank_id: 'HPK',
            nickname: this.receiver_form.nickname
          })

          this.$notify({
            title: 'Success',
            message: 'Tạo người nhận thành công.',
            type: 'success',
            duration: 2000
          })
          this.receiver_form.account_number = ''
          this.receiver_form.nickname = ''
        } catch (e) {
          this.$notify({
            title: 'Fail',
            message: e.message,
            type: 'error',
            duration: 4000
          })
        }
      })
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

.create-button {
  display: flex;
  align-items: center;
}
</style>

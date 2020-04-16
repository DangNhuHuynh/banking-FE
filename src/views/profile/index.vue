<template>
  <div class="app-container">
    <div v-if="user">
      <el-row style="display: flex; justify-content: center;">
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Đổi mật khẩu" name="changePass">
                <!-- <account :user="user" /> -->
                <el-form>
                  <el-form-item label="Mật khẩu cũ">
                    <el-input v-model="oldPass" placeholder="Nhập mật khẩu cũ" type="password" />
                  </el-form-item>
                  <el-form-item label="Mật khẩu mới">
                    <el-input v-model="newPass" placeholder="Nhập mật khẩu mới" type="password" />
                  </el-form-item>
                  <el-form-item label="Nhập lại mật khẩu mới">
                    <el-input v-model="confirmPass" placeholder="Nhập lại mật khẩu mới" type="password" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submit">Update</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      activeTab: 'changePass',
      oldPass: '',
      newPass: '',
      confirmPass: ''
    }
  },
  methods: {
    async submit() {
      if (this.newPass === this.confirmPass) {
        await this.$store.dispatch('user/updatePassword', { password: this.oldPass, new_password: this.newPass })
        this.$notify({
          title: 'Cập nhật thành công!',
          message: 'Vui lòng đăng nhập lại!',
          type: 'success'
        })
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login`)
        return
      }
      this.$notify({
        title: 'Cập nhật thất bại!',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="scss">
.el-input--mini .el-input__inner {
  height: 39px;
  line-height: 31px;
  font-size: 13px;
}
.el-button--mini {
    height: 35px;
    width: 80px;
    padding: 7px 15px;
    font-size: 13px;
    border-radius: 3px;
}
</style>

<template>
  <div class="app-container">
    <aside style="color:#1874CD">CHUYỂN TIỀN</aside>

    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="6">
        <el-card class="box-card">
          <div class="component-item" height="30px">
            <pan-thumb width="100px" height="100px" style="float:left" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"></pan-thumb>
            <span style="float:left; margin-left:40px; margin-bottom:10px; margin-top:10px">Name: Dang Huynh</span>
            <span style="float:left; margin-left:40px; margin-bottom:10px">Customer ID: 237567825627</span>
            <el-button v-waves type="primary" style="float:right; margin-bottom:20px; margin-top:10px" @click="handleCreate">Chuyển tiền</el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div class="component-item" height="30px">
            <pan-thumb width="100px" height="100px" style="float:left" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"></pan-thumb>
            <span style="float:left; margin-left:40px; margin-bottom:10px; margin-top:10px">Name: Dang Huynh</span>
            <span style="float:left; margin-left:40px; margin-bottom:10px">Customer ID: 237567825627</span>
            <el-button v-waves type="primary" style="float:right; margin-bottom:20px; margin-top:10px">Chuyển tiền</el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div class="component-item" height="30px">
            <pan-thumb width="100px" height="100px" style="float:left" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"></pan-thumb>
            <span style="float:left; margin-left:40px; margin-bottom:10px; margin-top:10px">Name: Dang Huynh</span>
            <span style="float:left; margin-left:40px; margin-bottom:10px">Customer ID: 237567825627</span>
            <el-button v-waves type="primary" style="float:right; margin-bottom:20px; margin-top:10px">Chuyển tiền</el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div class="component-item" height="30px">
            <pan-thumb width="100px" height="100px" style="float:left" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"></pan-thumb>
            <span style="float:left; margin-left:40px; margin-bottom:10px; margin-top:10px">Name: Dang Huynh</span>
            <span style="float:left; margin-left:40px; margin-bottom:10px">Customer ID: 237567825627</span>
            <el-button v-waves type="primary" style="float:right; margin-bottom:20px; margin-top:10px">Chuyển tiền</el-button>
          </div>
        </el-card>
      </el-col>

    </el-row>
  </div>

</template>
<script>
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'
import waves from '@/directive/waves/index.js'

export default {
  name: 'ComponentMixinDemo',
  components: {
    PanThumb,
    Mallki
  },
  directives: {
    waves
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
</style>

<template>
  <div>

    <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">添加</el-button>

    <!-- 
      data是要展示的动态数据，必须是一个数组
      table展示数据时都暗含了一个v-for
      每个列内部都有展示数据的功能，展示的是数据的某个属性，通过prop去告知 
      每个列表展示时都会留有作用域插槽，如果需要修改展示时候的结构，就得去完善作用域插槽
    -->
    <el-table :data="trademarkList" border style="width:100%;margin:20px 0px">
      <el-table-column prop="prop" label="序号" align="center" type="index" width="80">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo" width="width">
        <!-- 只要有结构改变，就得自己写作用域插槽 -->
        <template slot-scope="{row,$index}">
          <!-- row,$index对应的就是当前遍历的某个品牌对象，及这个品牌对象在数组中的下标 -->
          <img :src="row.logoUrl" style="width: 80px;height: 60px;">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="showUpdataDialog(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTrademark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="text-align:center" @size-change="handleSizeChange" @current-change="getTrademarkList"
      :current-page="page" :page-sizes="[3, 5, 7]" :page-size="limit" layout="prev,pager,next,jumper,->,sizes,total"
      :total="total">

    </el-pagination>
    <!-- 添加和修改的对话框 -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form：专门用来收集数据，数据是最后发请求携带的参数
        都会有一个属性 :model="tmForm" 指定收集的数据最后收集在那里，是一个对象 -->
      <!-- show-file-list指定上传的是不是照片墙（照片墙即一次上传多个） 
        -->
      <el-form :model="tmForm" :rules="rules" ref="tmFrom" style="width:80%">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="90px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Trademark',
  data() {
    let validateTmName = (rule, value, callback) => {
      // value：要校验的数据
      // callback：校验成功还是失败的回调
      // 如果传递一个错误对象验证失败，没有传递任何参数验证成功
      if (value.length < 2 || value.length > 10) {
        callback(new Error('长度必须在2到10之间'))
      } else {
        callback()
      }
    }
    return {
      page: 1,
      limit: 3,
      trademarkList: [],
      total: 0,

      dialogFormVisible: false, //控制对话框显示与隐藏
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      // 表单验证规则对象
      rules: {
        // 每个字段都是一个数组，里面放着验证的规则对象
        // 每个规则对象都可以规定规则名称，消息名称和触发时机
        // 触发时机有三种：失去焦点时，输入框改变时，整体校验时
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change ' }
          // 自定义校验规则
          { validate: validateTmName, trigger: 'change' },
        ],
        logoUrl: [
          { required: true, message: '请选择上传图片', trigger: 'change' }
        ],
      }
    }
  },
  mounted() {
    this.getTrademarkList();
  },
  methods: {
    // 发请求获取品牌列表及分页器翻页的回调
    async getTrademarkList(page = 1) {
      this.page = page
      const result = await this.$API.trademark.getPageList(this.page, this.limit)
      if (result.code === 200) {
        this.trademarkList = result.data.records
        this.total = result.data.total
      }
    },
    // 处理修改每页数量的回调函数
    handleSizeChange(size) {
      this.limit = size
      this.getTrademarkList()
    },
    // 上传成功的回调
    handleAvatarSuccess(res, file) {
      // 上传成功后收集返回的真实的图片路径
      this.tmForm.logoUrl = res.data
    },
    // 上传前的回调，在上传前时限定图片的大小和格式
    beforeAvatarUpload(file) {
      const typeArr = ["image/jpeg", "image/png"]
      const isJPGOrPNG = typeArr.indexOf(file.type) !== -1
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGOrPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPGOrPNG && isLt2M;
    },
    // 点击添加按钮弹出dialog
    showAddDialog() {
      this.dialogFormVisible = true
      // 点击添加后清空之前的数据
      //添加的数据里没有id
      this.tmForm = {
        tmName: '',
        logoUrl: ''
      }
    },
    // 点击修改按钮，弹出dialog，需要带上要修改的这个品牌的数据进行展示
    showUpdataDialog(row) {
      this.dialogFormVisible = true
      // 如果这样写，那么table展示的数据和tmForm要修改的数据就是同一个数据对象
      // this.tmForm = row
      // 浅拷贝
      this.tmForm = {
        ...row
      }
    },

    // 点击确定按钮后发请求去后台数据库添加或修改品牌
    addOrUpdate() {
      // 校验表单
      this.$refs.tmFrom.validate(async (valid) => {
        if (valid) {

          //第一步：获取收集到的参数
          let trademark = this.tmForm
          // 第二步：整理收集的参数数据
          // 不需要整理
          // 第三步：发请求
          try {
            // 第四步：成功干啥
            const result = await this.$API.trademark.addOrUpdate(trademark)
            // 1提示
            this.$message, success(trademark.id ? '修改品牌成功' : '添加品牌成功')
            // 2返回到列表页
            this.dialogFormVisible = false
            // 3重新获取数据(添加和修改，重新获取数据的页不一样)
            // 添加成功：返回到列表第一页。 修改成功返回到列表当前页
            this.getTrademarkList(trademark.id ? this.page : 1)
          } catch (error) {
            // 第五步：失败干啥
            this.$message.success(trademark.id ? '修改品牌失败' : '添加品牌失败')
          }

        } else {
          console.log('校验失败');
          return false;
        }
      });
    },

    // 点击删除按钮后删除某个mark
    deleteTrademark(row) {
      this.$confirm(`你确定要删除${row.tmName}吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 处理点击确定按钮的逻辑
        .then(async () => {
          // 发请求
          await this.$API.trademark.delete(row.id)
          try {
            // 成功
            // 1提示
            // this.$message.success('删除成功!')
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 2重新获取了数据
            // 如果当前页只有一条数据则回到上一页，否则在当前页
            this.getTrademarkList(this.trademarkList.length > 1 ? this.page : this.page - 1)
          } catch (error) {
            // 失败
            this.$message.error('删除品牌失败')
          }

        })
        // 处理点击取消按钮的逻辑
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }

  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
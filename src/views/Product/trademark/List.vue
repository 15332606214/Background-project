<template>
  <div>

    <el-button type="primary" icon="el-icon-plus">添加</el-button>

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
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="text-align:center" @size-change="handleSizeChange" @current-change="getTrademarkList"
      :current-page="page" :page-sizes="[3, 5, 7]" :page-size="limit" layout="prev,pager,next,jumper,->,sizes,total"
      :total="total">

    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Trademark',
  data() {
    return {
      page: 1,
      limit: 3,
      trademarkList: [],
      total: 0
    }
  },
  mounted() {
    this.getTrademarkList()
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
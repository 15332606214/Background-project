<template>
  <div>
    <el-button type="primary" icon="el-icon-plus">添加</el-button>

    <el-table border style="width:100%;margin:20px 0px">
      <el-table-column prop="prop" label="序号" align="center" type="index" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌logo" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
      </el-table-column>
    </el-table>

    <el-pagination style="text-align:center" :current-page="1" :page-sizes="[10, 20, 50]" :page-size="3"
      layout="prev,pager,next,jumper,->,sizes,total" :total="0">

    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'trademark'
}
</script>

<style lang="scss" scoped>

</style>
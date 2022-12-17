<template>
  <div>
    <el-card>
      <!-- 三级联动 -->
      <CategorySelector @changeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px">
      <!-- 属性列表相关 -->
    </el-card>
  </div>

</template>

<script>
export default {
  name: 'attr',
  data() {
    return {
      //保存子组件传递过来的id，一会发请求用
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList:[]
    }
  },
  methods: {
    changeCategory({categoryId, level}) {
      if (level === 1) {
        this.category1Id = categoryId
        // 一级被选中，清空二三数据
        this.category2Id=''
        this.category3Id=''
        this.attrList=[]
      } else if (level === 2) {
        this.category2Id = categoryId
        // 二级被选中，清空三数据
        this.category3Id=''
        this.attrList=[]
      } else {
        this.category3Id = categoryId
        // 三级列表被选中，发请求获取属性列表
        this.getAttrList()
      }
    },
    async getAttrList() {
      let { category1Id, category2Id, category3Id } = this
      const result = await this.$API.attr.getList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrList = result.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<template>
    <el-form :inline="true" :model="cForm" class="demo-form-inline">
        <el-form-item label="一级分类">
            <!-- 选中那个项，最终手机的是选中的分类id -->
            <el-select v-model="cForm.category1Id" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <!-- 选中那个项，最终手机的是选中的分类id -->
            <el-select v-model="cForm.category2Id" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <!-- 选中那个项，最终手机的是选中的分类id -->
            <el-select v-model="cForm.category3Id" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
        </el-form-item>
    </el-form>

</template>

<script>
export default {
    name: 'CategorySelector',
    data() {
        return {
            cForm: {
                category1Id:'',
                category2Id:'',
                category3Id:''
            }
        }
    }
}
</script>

<style>

</style>
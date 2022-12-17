import request from "@/utils/request";
export default {
    // 获取所有的一级分类列表数据
    // /admin/product/getCategory1
    getCategory1(){
        return request.get('/admin/product/getCategory1')
    },

    // 根据一级分类获取某个一级分类下的二级分类列表
    // GET /admin/product/getCategory2/{category1Id}
    getCategory2(category1Id){
        return request.get(`/admin/product/getCategory2/${category1Id}`)
    },

    // 根据二级分类获取某个二级分类下的三级分类列表
    // GET /admin/product/getCategory3/{category2Id}  
    getCategory3(category2Id){
        return request.get(`/admin/product/getCategory3/${category2Id}`)
    }
}   



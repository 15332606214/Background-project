import request from "@/utils/request";

export default {
    //每个接口请求函数就是这个对象当中的一个方法 
    // DELETE /admin/product/baseTrademark/remove/{id}
    // 删除BaseTrademark
    delete(id) {
        return request.get(`/admin/product/baseTrademark/remove/${id}`)
    },

    // POST /admin/product/baseTrademark/save
    // 新增BaseTrademark（添加新品牌）
    // PUT /admin/product/baseTrademark/update
    // 修改BaseTrademark（修改品牌）
    // 增加品牌和修改品牌，最终都需要传递这样一个对象 请求体参数
    // {
    //     "id":1,  // 以后增加新的品牌不需要id，修改一个品牌需要id
    //     "logoUrl":"string",
    //     "tmName":"string"
    // }
    addOrUpdate(trademark) {
        // 根据id来决定这个请求函数是添加还是修改
        if (trademark.id) {
            return request.put('/admin/product/baseTrademark/update', trademark)
        } else {
            return request.post('/admin/product/baseTrademark/save', trademark)
        }
    },

    // GET /admin/product/baseTrademark/{page}/{limit} 
    // 分页列表
    getPageList(page, limit) {
        return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
    }
}
// 引入并暴露
// 相当于引入并把这个对象赋值给trademark，然后暴露trademark
export { default as trademark } from './product/trademark'


// 最终从index.js暴露出去的就是
// {
//     trademark
// }
// main里面就可以import * as $API from "@/api";拿到暴露出去的整个对象
    // $API={
    //     trademark
    // }
// index.js其实就是把不同的模块当中接口请求函数整合到同一个文件进行一次性暴露，
// 这样我们就可以直接获取到所有的接口请求函数，进行统一处理
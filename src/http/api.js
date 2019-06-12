import request from '@/utils/request'
import qs from 'qs'
import axios from "axios";
import Mock from "mockjs";
import data from "@/utils/tableList.json";

// import MockAdapter from 'axios-mock-adapter';
// // 设置模拟调试器实例
// var mock = new MockAdapter(axios);
// // 模拟任意GET请求到 /users
// //reply的参数为 (status, data, headers)
// mock.onGet('http://localhost:3001/user/list?pageIndex=1&pageSize=10').reply(200, {
//     data
// });

Mock.mock('/user/list', 'get', data);
export function getUserList(query) {
    // //
    // // return request({
    // //     url: '/user/list',
    // //     method: 'get',
    // //     params: query
    // // })
    // axios.get('/user/list')
    //     .then(function(response) {
    //         return data;
    //     });
    console.log(query);
    return {'data': data};
}


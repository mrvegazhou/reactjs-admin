import request from '@/utils/request'
import qs from 'qs'

export function getUserList(query) {
    return request({
        url: '/user/list',
        method: 'get',
        params: query
    })
}
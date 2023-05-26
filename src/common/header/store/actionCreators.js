import * as actionTypes from './constants'
import axios from 'axios'
import { fromJS } from 'immutable'

const changeList = (data) => ({
    type: actionTypes.CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})

// 返回一个对象
export const searchFocus = () => ({
    type: actionTypes.SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: actionTypes.SEARCH_BLUR
})

export const mouseEnter = () => ({
    type: actionTypes.MOUSE_ENTER
})

export const mouseLeave = () => ({
    type: actionTypes.MOUSE_LEAVE
})

export const changePage = (page) => ({
    type: actionTypes.CHANGE_PAGE,
    page
})

// thunk -- 返回一个函数
export const getList = () => {
    return (dispatch) => {
        // console.log(123);
        // 请求接口 -- 成功走 then 这个方法，否则走 catch 这个方法
        axios.get('/api/headerList.json').then((res) => {
            const data = res.data
            // console.log(data) 
            const a = changeList(data.data)   
            dispatch(a) 
        }).catch(() => {
            console.log('error');
        })
    }
}


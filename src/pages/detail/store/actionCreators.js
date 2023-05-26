import axios from "axios"
import * as constants from './constants'

//返回对象形式的参数
const changeDetail = (title, content) => ({
    type: constants.CHANGE_DETAIL,
    title,
    content
})

export const getDetail = () => {
    return (dispatch) => {
        axios.get('/api/detail.json').then((res) => {
            // console.log(res.data.data)
            const result = res.data.data
            //派发action 并传递result.title，result.content 这两个参数
            dispatch(changeDetail(result.title, result.content)) 
        })
    }
}
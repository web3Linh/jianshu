import axios from "axios"
import * as constants from './constants'

const changeLogin = () => ({
    type: constants.CHANGE_LOGIN,
    value: true
})

export const logout = () => ({
    type: constants.LOGOUT,
    value: false
})

export const login = (account, password) => {
    return (dispatch) => {
        axios.get('/api/login.json?account=' + account + '&password=' + password).then((res) => {
            // console.log(res)
            const result = res.data.data
            if(result){
                // 调用/修改store里的值并发送给reducer
                dispatch(changeLogin())
            } else {
                alert('登录失败')
            }
        })
    }
}
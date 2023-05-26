import axios from "axios"
import * as constants from './constants'
import { fromJS } from "immutable"

const changeHomeData = (result) => ({
    type: constants.CHANGE_HOME_DATA,
    articleList: result.articleList,
    recommendList: result.recommendList,
    topicList: result.topicList,
})

const addHomeList = (list, nextPage) => ({
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage
})

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const result = res.data.data
            // console.log(result)
            const action = changeHomeData(result)
            // {
            //     // type: 'change_home_data',
            //     // articleList: result.articleList,
            //     // recommendList: result.recommendList,
            //     // topicList: result.topicList,
            // }
            // // 将action传递给 changeHomeData 方法
            // this.props.changeHomeData(action)
            dispatch(action)
        })
    }
}

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/homeList.json?page=' + page).then((res) => {
            const result = res.data.data
            // console.log(result)
            dispatch(addHomeList(result, page + 1))
        })
    }
}

export const toggleTopShow = (show) =>({
    type: constants.TOGGLE_SCROLL_TOP,
    show
})
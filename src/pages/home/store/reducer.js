import { fromJS } from 'immutable';
import * as constants from './constants'

// 仓库管理
// 将state immutable为一个不可更改的对象
const defaultState = fromJS ({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage: 1,
    showScroll: false,
});

const changeHomeData = (state, action) => {
    return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
    });
}

const articleList = (state, action) => {
    return state.merge({
        'articleList': state.get('articleList').concat(action.list),
        'articlePage': action.nextPage
    });
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.CHANGE_HOME_DATA:
            // console.log(action)
            return changeHomeData(state, action);
        case constants.ADD_ARTICLE_LIST: 
            // console.log(action)
            return articleList(state, action);
        case constants.TOGGLE_SCROLL_TOP: 
            // console.log(action)
            return state.set('showScroll', action.show);
        default:
            return state;
    }
}

import * as actionTypes from './constants'
import { fromJS } from 'immutable';

// 仓库管理
// 将state immutable为一个不可更改的对象
const defaultState = fromJS ({
    focused: false,
    mouseIn: false,
    list:[],
    page: 1,
    totalPage: 1
});

export default function Redux(state = defaultState, action){
    switch(action.type) {
        case actionTypes.SEARCH_FOCUS:
            return state.set('focused', true);
        case actionTypes.SEARCH_BLUR:
            return state.set('focused', false);
        case actionTypes.CHANGE_LIST:
            return state.merge ({
                list: action.data,
                totalPage: action.totalPage
            })
            // return state.set('list', action.data).set('totalPage', action.totalPage);
        case actionTypes.MOUSE_ENTER:
            return state.set('mouseIn', true);
        case actionTypes.MOUSE_LEAVE:
            return state.set('mouseIn', false);
        case actionTypes.CHANGE_PAGE:
            return state.set('page', action.page);
        default:
            return state; 
    }
}
//     if (action.type === actionTypes.SEARCH_FOCUS){
//         // immutable对象的set方法，会结合之前immutable对象的值和设置的值返回一个全新的对象
//         return state.set('focused', true);
//     }
//     if (action.type === actionTypes.SEARCH_BLUR){
//         return state.set('focused', false)
//     }
//     if (action.type === actionTypes.CHANGE_LIST){
//         // console.log('test');
//         // console.log(action);
//         return state.set('list', action.data)
//     }
//     return state;
// }
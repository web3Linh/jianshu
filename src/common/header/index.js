import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators }  from './store'
import { actionCreators as loginActionCreators} from '../../pages/login/store'
import { 
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  SearchWrapper,
 } from './style'
import { Link } from 'react-router-dom'

class Header extends Component {

  getListArea() {
    const { focused, list, page, totalPage, handleMouseEnter, handleMouseLeave, mouseIn, handleChangePage } = this.props
    const newList = list.toJS()
    const pageList = []

    if(newList.length){
      for(let i = (page - 1) * 10; i < page * 10; i++){
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }
    
    if(focused || mouseIn){
      return (
        <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage)}>换一批</SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {/* {
                list.map((item) => {
                // console.log(item);
                return <SearchInfoItem key={item}>{item}</SearchInfoItem>
              })
            } */}
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null
    }
  }

  render() {
    const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props
    return (
      <>
        <HeaderWrapper>
            <Logo/>
          <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          {
            login ? <NavItem onClick={logout} className='right'>退出</NavItem> : <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
          }
          <NavItem className='right'>Aa</NavItem>
          {/* in -- 控制出入场动画 true or false  动画时长 -- timeout=200毫秒 */}
          <CSSTransition in={focused} timeout={200} classNames='slide'>
            <SearchWrapper>
              <NavSearch className={focused ? 'focused' : ''} onFocus={() => handleInputFocus(list)} onBlur={handleInputBlur}></NavSearch>
              <div className='iconfont'></div>
              {/* 调用刚写的方法 */}
              {this.getListArea()}
            </SearchWrapper>
          </CSSTransition>
        </Nav>
        <Addition>
          <Link to='/write'>
            <Button className='writing'>写文章</Button>
          </Link>
          <Button className='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    </>
    )
  }
}


// const getListArea = (show) => {
//   if(show){
//     return (
//       <SearchInfo>
//         <SearchInfoTitle>
//           热门搜索
//           <SearchInfoSwitch>换一批</SearchInfoSwitch>
//         </SearchInfoTitle>
//         <SearchInfoList>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//           <SearchInfoItem>教育</SearchInfoItem>
//         </SearchInfoList>
//       </SearchInfo>
//     )
//   } else {
//     return null
//   }
// }

//  const Header = (props) => {
//     return (
//       <HeaderWrapper>
//         <Logo/>
//         <Nav>
//           <NavItem className='left active'>首页</NavItem>
//           <NavItem className='left'>下载App</NavItem>
//           <NavItem className='right'>登录</NavItem>
//           <NavItem className='right'>Aa</NavItem>
//           {/* in -- 控制出入场动画 true or false  动画时长 -- timeout=200毫秒 */}
//           <CSSTransition in={props.focused} timeout={200} classNames='slide'>
//             <SearchWrapper>
//               <NavSearch className={props.focused ? 'focused' : ''} onClick={props.handleInputFocus} onBlur={props.handleInputBlur}></NavSearch>
//               <div className='iconfont'></div>
//               {/* 调用刚写的方法 */}
//               {getListArea(props.focused)}
//             </SearchWrapper>
//           </CSSTransition>
//         </Nav>
//         <Addition>
//           <Button className='writing'>写文章</Button>
//           <Button className='reg'>注册</Button>
//         </Addition>
//       </HeaderWrapper>
//     )
//  }

// 接收store里所有的数据
const mapStateToProps = (state) => {
  return {
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login'])
  }
}

// 组件要改变store里的内容，就调用Dispatch方法
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list){
      // console.log(list)
      // 避免无意义的ajax发送
      (list.size === 0) && dispatch(actionCreators.getList())
      // 获取异步数据
      // dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },

    handleInputBlur(){
      dispatch(actionCreators.searchBlur())
    },

    handleMouseEnter(){
      dispatch(actionCreators.mouseEnter())
    },

    handleMouseLeave(){
      dispatch(actionCreators.mouseLeave())
    },

    handleChangePage(page, totalPage){
      if (page < totalPage){
        dispatch(actionCreators.changePage(page + 1))
      } else {
        dispatch(actionCreators.changePage(1))
      }
    },
    logout(){
      // 创建action并派发出去
      dispatch(loginActionCreators.logout())
    }
  }
}

// 建立链接
export default connect(mapStateToProps, mapDispatchToProps)(Header)